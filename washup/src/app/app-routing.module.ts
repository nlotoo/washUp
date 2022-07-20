import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { HomePageComponent } from './home-page/home-page.component'
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { EditCommentPageComponent } from './edit-comment-page/edit-comment-page.component';
import { CommentsPageComponent } from './comments-page/comments-page.component';
import { IsAuthGuard } from './guards/is-auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'register', component: RegisterComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'catalog', component: CatalogPageComponent },
  { path: 'item/:id', component: ItemPageComponent },
  { path: 'add-item', component: AddItemComponent ,canActivate:[IsAuthGuard]},
  { path: 'edit-page/:id', component: EditPageComponent,canActivate:[IsAuthGuard]},
  { path: 'edit-comment-page/:id', component: EditCommentPageComponent },
  { path: 'liked/:id', component: CommentsPageComponent },
  { path: 'dislike/:id', component: CommentsPageComponent }
];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
