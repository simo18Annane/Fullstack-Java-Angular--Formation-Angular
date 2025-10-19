import { Routes } from '@angular/router';
import { ProduitsComponent } from './produits/produits.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { UpdateProduitComponent } from './update-produit/update-produit.component';
import { RechercheParCategorieComponent } from './recherche-par-categorie/recherche-par-categorie.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeCategoriesComponent } from './liste-categories/liste-categories.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { produitGuard } from './produit.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

export const routes: Routes = [
    {path: "produits", component : ProduitsComponent}, //http://localhost:4200/produits on va accéder au contenu de produits.component.html
    {path: "add-produits", component : AddProduitComponent, canActivate: [produitGuard]},
    {path: "updateProduit/:id", component: UpdateProduitComponent}, //il prend id comme parametre
    {path: "rechercheParCategorie", component: RechercheParCategorieComponent},
    {path: "rechercheParNom", component: RechercheParNomComponent},
    {path: "listeCategories", component: ListeCategoriesComponent},
    {path: "login", component: LoginComponent},
    {path: "app-forbidden", component: ForbiddenComponent},
    {path: "register", component: RegisterComponent},
    {path: "verifEmail", component: VerifEmailComponent},
    {path: "", redirectTo: "produits", pathMatch: "full"}
];
