import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorComponent } from './autor/autor.component';
import { LivroComponent } from './livro/livro.component';
import { LoginComponent } from './shared/login/login.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path: 'livro', component: LivroComponent},
  {path: 'autor', component: AutorComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/livro', pathMatch: 'full'},
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
