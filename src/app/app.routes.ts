// app.routes.ts
// Arquivo de configuração das rotas da aplicação Angular.
// Aqui definimos as "URLs" e quais componentes devem ser carregados quando acessadas.

import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { ListaComponent } from './contatos/lista/lista.component';
import { CadastroComponent } from './contatos/cadastro/cadastro.component';
import { DetalhesComponent } from './contatos/detalhes/detalhes.component';

export const routes: Routes = [
  // Rota raiz (quando acessamos http://localhost:4200/), carrega a página inicial
  { path: '', component: PaginaInicialComponent },

  // Lista todos os contatos
  { path: 'contatos', component: ListaComponent },

  // Formulário para criar um novo contato
  { path: 'contatos/novo', component: CadastroComponent },

  // Formulário para editar um contato existente (com base no ID passado na URL)
  { path: 'contatos/editar/:id', component: CadastroComponent },

  // Página de detalhes do contato (visualização somente leitura)
  { path: 'contatos/detalhes/:id', component: DetalhesComponent },

  // Rota coringa: se o usuário digitar uma URL que não existe, será redirecionado para a página inicial
  { path: '**', redirectTo: '' }
];
