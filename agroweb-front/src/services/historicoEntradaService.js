import api from "./api"

const HistoricoEntradaService = {
    consultarHistoricoEntrada: async function (idProduto) {
        return await api.get("/produto/" + idProduto + "/estoque/entrada");
    },

    registrarEntradaProduto: async function (idProduto, quantidade, dataEntrada) {
        var dados = {
            dataEntrada: dataEntrada,
            quantidade: quantidade
        }
        
        return await api.put("/produto/" + idProduto + "/estoque/entrada", dados);
    }
}

export default HistoricoEntradaService;