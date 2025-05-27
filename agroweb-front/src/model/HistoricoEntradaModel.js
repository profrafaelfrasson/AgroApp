export class HistoricoEntradaModel {
    constructor (dados) {
        this.idHistoricoEntradaProduto = dados["idHistoricoEntradaProduto"];
        this.idProduto = dados["idProduto"];
        this.data = dados["data"];
        this.quantidade = dados["quantidade"];
    }
}