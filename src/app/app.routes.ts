

import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { ListaComponent } from './contatos/lista/lista.component';
import { CadastroComponent } from './contatos/cadastro/cadastro.component';
import { DetalhesComponent } from './contatos/detalhes/detalhes.component';

export const routes: Routes = [
  { path: '', component: PaginaInicialComponent },

  { path: 'contatos', component: ListaComponent },

  { path: 'contatos/novo', component: CadastroComponent },

  { path: 'contatos/editar/:id', component: CadastroComponent },

  { path: 'contatos/detalhes/:id', component: DetalhesComponent },

  { path: '**', redirectTo: '' }
];
