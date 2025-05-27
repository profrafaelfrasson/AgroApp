import { ClienteModel } from "./ClienteModel";
import { VendaProdutoModel } from "./VendaProdutoModel";

export class VendaModel {
    constructor(dados) {
        this.idVenda = dados["idVenda"];
        this.data = dados["data"];
        this.dataPagamento = dados["dataPagamento"];
        this.valorTotal = dados["valorTotal"];
        this.crediario = dados["crediario"];
        this.cancelada = dados["cancelada"];
        this.formaPagamento = dados["formaPagamento"];
        this.cliente = new ClienteModel(dados["cliente"]);
        this.vendasProdutos = dados["vendasProdutos"].map((vendaProduto) => new VendaProdutoModel(vendaProduto));
    }
}