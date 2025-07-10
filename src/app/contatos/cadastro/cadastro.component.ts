// Importações principais do Angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Biblioteca externa para exibir alertas personalizados
import Swal from 'sweetalert2';

// Modelo de dados do Contato
import { Contato } from '../../app-core/model/contato.model';

// Serviço que faz as operações de CRUD com IndexedDB e lista de status
import { ContatoService, STATUS_LIST } from '../../app-core/services/contato.service';
import { Status } from '../../app-core/model/status.model';

// Decorador que define esse componente como independente (standalone)
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CadastroComponent implements OnInit {

  // Objeto contato que será preenchido pelo formulário
  contato: Contato = new Contato();

  // Lista de status disponíveis (ativo/inativo) usada no dropdown
  statusList: Status[] = STATUS_LIST;

  // Injetamos o serviço de contatos e as rotas para capturar parâmetros
  constructor(
    private contatoService: ContatoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // ngOnInit roda ao iniciar o componente
  async ngOnInit() {
    // Verifica se existe um "id" na rota (para modo de edição)
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

  // Função chamada ao submeter o formulário
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
      // Verifica se o contato já existe (modo edição) ou é novo (modo criação)
      if (this.contato.id) {
        await this.contatoService.atualizar(this.contato);
        Swal.fire('Sucesso', 'Contato atualizado com sucesso!', 'success');
      } else {
        await this.contatoService.adicionar(this.contato);
        Swal.fire('Sucesso', 'Contato salvo com sucesso!', 'success');
      }

      // Após salvar, redireciona para a lista de contatos
      this.router.navigate(['/contatos']);

    } catch (error) {
      Swal.fire('Erro', 'Ocorreu um problema ao salvar o contato.', 'error');
    }
  }

  // Função que lida com o upload da imagem e converte para base64
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
