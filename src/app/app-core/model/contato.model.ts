
export class Contato {
  id?: number;
  nome!: string;
  email!: string;
  telefone!: string;
  endereco?: string;
  foto?: string; // base64 da imagem
}
