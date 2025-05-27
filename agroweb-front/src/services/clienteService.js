import { ClienteModel } from '../model/ClienteModel';
import api from './api';

const ClienteService = {
    consultarClientes: async function() {
        return new Promise((resolve) => {
            api.get("/pessoa").then((response) => {
                var clientes = response.data.map((item) => new ClienteModel(item));

                resolve(clientes);
            }).catch((err) => {
                console.log(err);

                resolve([]);
            });
        });
    },

    consultarCliente: async function(idCliente) {
        return new Promise((resolve) => {
            api.get("/pessoa/" + idCliente).then((response) => {
                var cliente = new ClienteModel(response.data);

                resolve(cliente);
            }).catch((err) => {
                console.log(err);

                resolve();
            })
        });
    },

    salvarCliente: async function (dadosSalvarCliente) {
        return await api.post("/pessoa", dadosSalvarCliente);
    },

    atualizarCliente: async function (idCliente, dadosSalvarCliente) {
        return await api.put("/pessoa/"+idCliente, dadosSalvarCliente);
    },

    inativarCliente: async function(idCliente) {
        await api.delete("/pessoa/"+idCliente);
    }

}

export default ClienteService;