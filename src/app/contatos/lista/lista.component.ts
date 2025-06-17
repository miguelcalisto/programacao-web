
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ContatoService } from '../../app-core/services/contato.service';
import { Contato } from '../../app-core/model/contato.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ListaComponent implements OnInit {
  contatos: Contato[] = [];

  constructor(private contatoService: ContatoService) {}

  async ngOnInit() {
    this.contatos = await this.contatoService.listarTodos();
  }

  async excluir(id: number) {
    if (confirm('Deseja realmente excluir este contato?')) {
      await this.contatoService.excluir(id);
      this.contatos = await this.contatoService.listarTodos();
    }
  }
}
