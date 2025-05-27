import { EnderecoModel } from "./EnderecoModel";

export class ClienteModel {
    constructor(dados) {
        this.idPessoa = dados["idPessoa"];
        this.nome = dados["nome"];
        this.cpf = dados["cpf"];
        this.dataNascimento = dados["dataNascimento"]
        this.telefone = dados["telefone"];
        this.endereco = new EnderecoModel(dados["endereco"]);
    }
}