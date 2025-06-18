import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Contato } from '../../app-core/model/contato.model';
import { ContatoService, STATUS_LIST } from '../../app-core/services/contato.service';
import { Status } from '../../app-core/model/status.model';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class DetalhesComponent implements OnInit {
  contato?: Contato;
  statusList: Status[] = STATUS_LIST;

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

  getStatusNome(): string {
  if (!this.contato) {
    return 'Sem status';
  }
  const statusId = Number(this.contato.statusId);  // ← CONVERTE STRING PARA NÚMERO
  const status = this.statusList.find(s => s.id === statusId);
  return status ? status.nome : 'Sem status';
}
}
