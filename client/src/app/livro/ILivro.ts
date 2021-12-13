export interface ILivro {
    _id: string;
    position: number;
    nome: String;
    autor: {
        _id: string;
        nome: String | undefined;
    };
    editora: String;
    ano: Number;
}
