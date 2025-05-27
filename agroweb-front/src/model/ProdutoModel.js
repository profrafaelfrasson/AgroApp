export class ProdutoModel {
    constructor(dados) {
        this.idProduto = dados["idProduto"];
        this.nome = dados["nome"];
        this.quantidadeEstoque = dados["quantidadeEstoque"];
        this.unidadeMedida = dados["unidadeMedida"];
        this.valor = dados["valor"];
        this.descricao = dados["descricao"];
    }
}