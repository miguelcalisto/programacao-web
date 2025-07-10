import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';

import { Contato } from '../../app-core/model/contato.model';

import { ContatoService, STATUS_LIST } from '../../app-core/services/contato.service';
import { Status } from '../../app-core/model/status.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CadastroComponent implements OnInit {

  contato: Contato = new Contato();

  statusList: Status[] = STATUS_LIST;

  constructor(
    private contatoService: ContatoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // ngOnInit
  async ngOnInit() {
    // Verifica se existe um "id" na rota
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);

      // Busca o contato correspondente no IndexedDB
      const contatoExistente = await this.contatoService.buscarPorId(id);

      // Se o contato existe, ele é carregado no formulário
      if (contatoExistente) {
        this.contato = contatoExistente;
      } else {
        // Caso o ID não seja válido, exibe erro e redireciona
        Swal.fire('Erro', 'Contato não encontrado!', 'error');
        this.router.navigate(['/contatos']);
      }
    }
  }

  async salvar() {
    // Validações básicas nos campos antes de salvar
    if (!this.contato.nome) {
      Swal.fire('Erro', 'O campo Nome é obrigatório!', 'error');
      return;
    }

    if (!this.contato.email || !this.contato.email.includes('@')) {
      Swal.fire('Erro', 'Informe um Email válido!', 'error');
      return;
    }

    if (!this.contato.telefone) {
      Swal.fire('Erro', 'O campo Telefone é obrigatório!', 'error');
      return;
    }

    if (!this.contato.statusId) {
      Swal.fire('Erro', 'Selecione um Status!', 'error');
      return;
    }

    try {
      if (this.contato.id) {
        await this.contatoService.atualizar(this.contato);
        Swal.fire('Sucesso', 'Contato atualizado com sucesso!', 'success');
      } else {
        await this.contatoService.adicionar(this.contato);
        Swal.fire('Sucesso', 'Contato salvo com sucesso!', 'success');
      }

      this.router.navigate(['/contatos']);

    } catch (error) {
      Swal.fire('Erro', 'Ocorreu um problema ao salvar o contato.', 'error');
    }
  }

  // imagem
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.contato.foto = reader.result as string; // Salva a imagem como string base64
      };
      reader.readAsDataURL(file); // Inicia leitura do arquivo como DataURL
    }
  }
}
