// Serviço principal responsável por interagir com o banco de dados IndexedDB
import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
import { Contato } from '../model/contato.model';
import { Status } from '../model/status.model';

// Lista de status disponíveis no sistema com nome, descrição e cor
// A cor será usada para estilização visual (ex: badge colorida)
export const STATUS_LIST: Status[] = [
  { id: 1, nome: 'Ativo', descricao: 'Contato ativo', cor: 'success' },
  { id: 2, nome: 'Inativo', descricao: 'Contato inativo', cor: 'danger' }
];

// Definições do banco
const DB_NAME = 'agenda-contatos-db';
const STORE_NAME = 'contatos';
const DB_VERSION = 1;

// Decorador que indica que o serviço será injetável em toda a aplicação
@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private dbPromise: Promise<IDBPDatabase>;

  constructor() {
    // Inicializa o banco de dados ao instanciar o serviço
    this.dbPromise = this.initDB();
  }

  // Método responsável por criar o banco e a store (tabela) se não existirem
  private async initDB(): Promise<IDBPDatabase> {
    return await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Verifica se a store "contatos" já existe
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
      }
    });
  }

  // Adiciona um novo contato ao banco de dados
  async adicionar(contato: Contato): Promise<number> {
    const db = await this.dbPromise;

    // Remove o ID manual caso tenha sido preenchido
    const contatoSemId = { ...contato };
    delete contatoSemId.id;

    // Adiciona e retorna o novo ID gerado automaticamente
    const id = await db.add(STORE_NAME, contatoSemId) as number;
    contato.id = id;
    return id;
  }

  // Retorna todos os contatos cadastrados
  async listarTodos(): Promise<Contato[]> {
    const db = await this.dbPromise;
    return await db.getAll(STORE_NAME);
  }

  // Busca um contato pelo ID
  async buscarPorId(id: number): Promise<Contato | undefined> {
    const db = await this.dbPromise;
    return await db.get(STORE_NAME, id);
  }

  // Atualiza um contato existente
  async atualizar(contato: Contato): Promise<void> {
    const db = await this.dbPromise;
    await db.put(STORE_NAME, contato);
  }

  // Exclui um contato pelo ID
  async excluir(id: number): Promise<void> {
    const db = await this.dbPromise;
    await db.delete(STORE_NAME, id);
  }
}
