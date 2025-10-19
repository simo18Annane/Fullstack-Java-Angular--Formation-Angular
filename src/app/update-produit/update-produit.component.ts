import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../model/produit.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Categorie } from '../model/categorie.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-produit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-produit.component.html',
  styles: ``
})
export class UpdateProduitComponent implements OnInit{

  currentProduit = new Produit();
  categories! : Categorie[];
  updatedCatId! : number;
  myImage! :string;
  uploadedImage! : File;
  isImageUpdated : Boolean = false;

  constructor(private activatedRoute : ActivatedRoute, private router : Router, private produitService : ProduitService) {

  }

  ngOnInit(): void {
    this.produitService.listeCategories().subscribe(cats => {
      this.categories = cats._embedded.categories;
    });

    this.produitService.consulterProduit(this.activatedRoute.snapshot.params['id']).subscribe(prod => {
      this.currentProduit = prod;
      this.updatedCatId = prod.categorie.idCat!;
    })
  }

  //gérer une seule image
  /* updateProduit() {
    this.currentProduit.categorie = this.categories.find(cat => cat.idCat == this.updatedCatId)!;
    //tester si l'image du produit a été modifiée
    if (this.isImageUpdated) {
      this.produitService.uploadImage(this.uploadedImage, this.uploadedImage.name).subscribe((img : Image) => {
        this.currentProduit.image = img;
        this.produitService.updateProduit(this.currentProduit).subscribe((prod) => {
          this.router.navigate(['produits']);
        });
      });
    } else {
      this.produitService.updateProduit(this.currentProduit).subscribe((prod) => {
        this.router.navigate(['produits']);
      });
    }
  } */

    //gérer plusieurs images
  updateProduit() {
    this.currentProduit.categorie = this.categories.find(cat => cat.idCat == this.updatedCatId)!;
    this.produitService.updateProduit(this.currentProduit).subscribe((prod) => {
      this.router.navigate(['produits']);
    });
  }

  onImageUpload(event : any){
    if(event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
    }
  }

  onAddImageProduit() {
    this.produitService.uploadImageProd(this.uploadedImage, this.uploadedImage.name, this.currentProduit.idProduit).subscribe((img : Image) => {
      this.currentProduit.images.push(img);
    })
  }

  supprimerImage(img : Image) {
    let conf = confirm("Etes-vous sûr ?");
    if(conf) {
      this.produitService.supprimerImage(img.idImage).subscribe(() => {
        //supprimer image du tableau currentProduit.images
        const index = this.currentProduit.images.indexOf(img, 0);
        if (index > -1) {
          this.currentProduit.images.splice(index, 1);
        }
      });
    }
  }

}
