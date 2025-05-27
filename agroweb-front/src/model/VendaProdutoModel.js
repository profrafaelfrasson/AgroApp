import { ProdutoModel } from "./ProdutoModel";

export class VendaProdutoModel {
    constructor(dados) {
        this.quantidade = dados["quantidade"];
        this.valorUnitario = dados["valorUnitario"];
        this.produto = new ProdutoModel(dados["produto"]);
    }
}