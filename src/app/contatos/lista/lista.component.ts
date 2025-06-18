import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

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
    const resultado = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você deseja realmente excluir este contato? Essa ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) {
      await this.contatoService.excluir(id);
      this.contatos = await this.contatoService.listarTodos();

      Swal.fire(
        'Excluído!',
        'O contato foi removido com sucesso.',
        'success'
      );
    }
  }
}
