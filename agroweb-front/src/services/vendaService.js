import api from "./api"

const VendaService = {
    consultarVendas: async function({idCliente, idProduto, situacaoPagamento}) {
        return api.get("/venda", {
            params: {
                idCliente: idCliente,
                idProduto: idProduto, 
                situacaoPagamento: situacaoPagamento
            }
        });
    },

    consultarPossuiPagamentoEmAberto: async function (idCliente) {
        return api.get("/venda/cliente/" + idCliente + "/pagamento/em-aberto");
    },

    atualizarDataPagamento: async function (idVenda, dataPagamento) {
        return api.put("/venda/"+idVenda+"/pagamento", {dataPagamento: dataPagamento});
    },

    salvar: async function(dados) {
        return api.post("/venda", dados);
    }

}

export default VendaService;