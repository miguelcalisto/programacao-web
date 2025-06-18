import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
import { Contato } from '../model/contato.model';
import { Status } from '../model/status.model';

export const STATUS_LIST: Status[] = [
  { id: 1, nome: 'Ativo' },
  { id: 2, nome: 'Inativo' }
 
];




const DB_NAME = 'agenda-contatos-db';
const STORE_NAME = 'contatos';
const DB_VERSION = 1;


@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private dbPromise: Promise<IDBPDatabase>;

  constructor() {
    this.dbPromise = this.initDB();
  }

  private async initDB(): Promise<IDBPDatabase> {
    return await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
      }
    });
  }

  // async adicionar(contato: Contato): Promise<number> {
  //   const db = await this.dbPromise;

  //   return await db.add(STORE_NAME, contato) as number;
  // }
//   async adicionar(contato: Contato): Promise<number> {
//   const db = await this.dbPromise;
//   const id = await db.add(STORE_NAME, contato) as number;
//   contato.id = id;  // <- Atualiza o objeto na memória com o id gerado
//   return id;
// }
async adicionar(contato: Contato): Promise<number> {
  const db = await this.dbPromise;

  // Remover qualquer id manual antes de adicionar
  const contatoSemId = { ...contato };
  delete contatoSemId.id;

  const id = await db.add(STORE_NAME, contatoSemId) as number;
  contato.id = id;  // Agora o id correto
  return id;
}

  async listarTodos(): Promise<Contato[]> {
    const db = await this.dbPromise;
    return await db.getAll(STORE_NAME);
  }

  async buscarPorId(id: number): Promise<Contato | undefined> {
    const db = await this.dbPromise;
    return await db.get(STORE_NAME, id);
  }

  async atualizar(contato: Contato): Promise<void> {
    const db = await this.dbPromise;
    await db.put(STORE_NAME, contato);
  }

  async excluir(id: number): Promise<void> {
    const db = await this.dbPromise;
    await db.delete(STORE_NAME, id);
  }
}

