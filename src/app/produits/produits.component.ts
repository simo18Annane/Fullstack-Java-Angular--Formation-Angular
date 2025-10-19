import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../services/produit.service';
import { RouterLink } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './produits.component.html'
})
export class ProduitsComponent implements OnInit{

  produits! : Produit[];
  //stockage des images dans un fichier
  apiurl : string = 'http://localhost:8080/produits/api';
  //

  constructor(private produitService : ProduitService, public authService : AuthService) {
    //this.produits = this.produitService.listeProduit();
  }

  ngOnInit(): void {
    this.chargerProduits();
  }

  //pour une seule image
  /* chargerProduits() {
    this.produitService.listeProduit().subscribe(prods => {
        console.log(prods);
        this.produits = prods;

        this.produits.forEach((prod) => {
          this.produitService.loadImage(prod.image.idImage).subscribe((img : Image) => {
            prod.imageStr = 'data:' + img.type + ';base64,' + img.image;
          });
        });
      });
  } */

  //pour gerer plusieurs images
  chargerProduits() {
    this.produitService.listeProduit().subscribe(prods =>  {
      this.produits = prods;
      this.produits.forEach((prod) => {
        prod.imageStr = 'data:' + prod.images[0].type + ';base64,' + prod.images[0].image;
      });
    });
  }

  //stcokage des images dans un fichier
  /* chargerProduits() {
    this.produitService.listeProduit().subscribe(prods => {
      this.produits = prods;
    });
  } */
  //

  supprimerProduit(p : Produit) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.produitService.supprimerProduit(p.idProduit).subscribe(() => {
        console.log("produit supprimé");
        this.chargerProduits();
      })
    }
  }
}
