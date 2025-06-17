import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Contato } from '../../app-core/model/contato.model';
import { ContatoService } from '../../app-core/services/contato.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class DetalhesComponent implements OnInit {
  contato?: Contato;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contatoService: ContatoService
  ) {}

  async ngOnInit(): Promise<void> {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.contato = await this.contatoService.buscarPorId(id);

      if (!this.contato) {
        alert('Contato não encontrado!');
        this.router.navigate(['/contatos']);
      }
    } else {
      alert('ID inválido!');
      this.router.navigate(['/contatos']);
    }
  }

  voltar(): void {
    this.router.navigate(['/contatos']);
  }
}

