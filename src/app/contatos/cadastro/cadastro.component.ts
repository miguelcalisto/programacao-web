import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Contato } from '../../app-core/model/contato.model';
import { ContatoService } from '../../app-core/services/contato.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CadastroComponent implements OnInit {
  contato: Contato = new Contato();

  constructor(
    private contatoService: ContatoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      const contatoExistente = await this.contatoService.buscarPorId(id);
      if (contatoExistente) {
        this.contato = contatoExistente;
      } else {
        alert('Contato não encontrado!');
        this.router.navigate(['/contatos']);
      }
    }
  }

  async salvar() {
    if (this.contato.id) {
      await this.contatoService.atualizar(this.contato);
    } else {
      await this.contatoService.adicionar(this.contato);
    }
    this.router.navigate(['/contatos']);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.contato.foto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}

