import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { ProduitService } from '../services/produit.service';
import { UpdateCategorieComponent } from "../update-categorie/update-categorie.component";

@Component({
  selector: 'app-liste-categories',
  standalone: true,
  imports: [UpdateCategorieComponent],
  templateUrl: './liste-categories.component.html',
  styles: ``
})
export class ListeCategoriesComponent implements OnInit {

  categories! : Categorie[];
  updatedCat : Categorie = {"idCat" : null, "nomCat" : ""};
  ajout : boolean = true;

  constructor(private produitService : ProduitService) {}

  ngOnInit(): void {
      this.chargerCategories();
  }

  categorieUpdated(cat : Categorie) {
    console.log("categorie reçue du composant updatedcategorie ", cat);
    this.produitService.ajouterCategorie(cat).subscribe(() => this.chargerCategories());
  }

  chargerCategories() {
    this.produitService.listeCategories().subscribe(cats => {
      this.categories = cats._embedded.categories;
      console.log(cats);
    });
  }

  updateCat(cat : Categorie) {
    this.updatedCat = cat;
    this.ajout = false;
  }

}
