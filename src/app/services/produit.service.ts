import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';
import { Observable } from 'rxjs'; //design pattern
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CategorieWrapper } from '../model/categorieWrapped.model';
import { AuthService } from './auth.service';
import { Image } from '../model/image.model';

const httpOptions = {
  headers : new HttpHeaders( {'Content-Type' : 'application/json'} ) //dire à angular que les données retournées seront en format Json
};

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  apiURL : string = 'http://localhost:8080/produits/api';
  apiURLCat : string = "http://localhost:8080/produits/cat";
  produits! : Produit[];
  // categories : Categorie[];

  constructor(private http : HttpClient, private authService : AuthService) {
    /* this.categories = [
      {idCat : 1, nomCat : "PC"},
      {idCat : 2, nomCat : "Imprimante"}
    ]; */
    /* this.produits = [
      {idProduit : 1, nomProduit : "PC Asus", prixProduit : 3000.600, dateCreation : new Date("01/14/2011"), categorie : {idCat : 1, nomCat : "PC"}},
      {idProduit : 2, nomProduit : "Imprimante Epson", prixProduit : 450, dateCreation : new Date("12/17/2010"), categorie : {idCat : 2, nomCat : "Imprimante"}},
      {idProduit : 3, nomProduit :"Tablette Samsung", prixProduit : 900.123, dateCreation : new Date("02/20/2020"), categorie : {idCat : 1, nomCat : "PC"}}
    ]; */
  }

  listeProduit() : Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiURL+"/all");
  }

  ajouterProduit(prod : Produit) : Observable<Produit> {
    return this.http.post<Produit>(this.apiURL+"/addprod", prod);
  }

  supprimerProduit(id : number) {
    const url = `${this.apiURL}/delprod/${id}`;
    return this.http.delete(url);
  }

  consulterProduit(id : number) : Observable<Produit> {
    const url = `${this.apiURL}/getbyid/${id}`;
    return this.http.get<Produit>(url);
  }

  updateProduit(prod : Produit) : Observable<Produit> {
    return this.http.put<Produit>(this.apiURL+"/updateprod", prod);
  }

  listeCategories() : Observable<CategorieWrapper> {
    return this.http.get<CategorieWrapper>(this.apiURLCat);
  }

  rechercherParCategorie(idCat : number) : Observable<Produit[]> {
    const url = `${this.apiURL}/prodscat/${idCat}`;
    return this.http.get<Produit[]>(url);
  }

  rechercherParNom(nom : string) : Observable<Produit[]> {
    const url = `${this.apiURL}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url);
  }

  ajouterCategorie(cat : Categorie) : Observable<Categorie> {
    return this.http.post<Categorie>(this.apiURLCat, cat, httpOptions);
  }

  uploadImage(file : File, filename : string) : Observable<any> {
    const imageFromData = new FormData();
    imageFromData.append('image', file, filename);
    const url = `${this.apiURL + '/image/upload'}`;
    return this.http.post(url, imageFromData);
  }

  loadImage(id : number) : Observable<Image> {
    const url = `${this.apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  uploadImageProd(file : File, filename : string, idProd : number) : Observable<any> {
    const imageFromData = new FormData();
    imageFromData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uploadImageProd'}/${idProd}`;
    return this.http.post(url, imageFromData);
  }

  supprimerImage(id: number) { 
    const url = `${this.apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions); 
  }

  //stockage des images dans un fichier
  uploadImageFS(file : File, filename : string, idProd : number) : Observable<any> {
    const imageFromData = new FormData();
    imageFromData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uploadFS'}/${idProd}`;
    return this.http.post(url, imageFromData);
  }

}
