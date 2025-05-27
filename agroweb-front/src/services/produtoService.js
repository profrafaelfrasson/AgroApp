import { ProdutoModel } from "../model/ProdutoModel";
import api from "./api";

const ProdutoService = {
    consultarProdutos: async function () {
        return new Promise((resolve) => {
            api.get("/produto").then((response) => {
                var produtos = response.data.map((item) => new ProdutoModel(item));

                resolve(produtos);
            }).catch((err) => {
                console.log(err);

                resolve([]);
            });
        });
    },

    consultarProduto: async function (idProduto) {
        return await api.get("/produto/" + idProduto);
    },

    salvarProduto: async function (dadosSalvarProduto) {
        return await api.post("/produto", dadosSalvarProduto);
    },

    atualizarProduto: async function (idProduto, dadosSalvarProduto) {
        return await api.put("/produto/" + idProduto, dadosSalvarProduto);
    },

    inativarProduto: async function (idProduto) {
        return await api.delete("/produto/" + idProduto);
    },

    consultarDisponibilidadeEstoque: async function (idProduto, quantidade) {
        return await api.get("/produto/" + idProduto + "/estoque/" + quantidade);
    }
}

export default ProdutoService;