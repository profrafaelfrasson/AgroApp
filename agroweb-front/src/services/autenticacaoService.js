import api from './api';
import { inserirToken, removerToken } from './armazenamentoLocalService';

const AutenticacaoService = {
    login: async function(nomeUsuario, senha) {
        return new Promise((resolve) => {
            setTimeout(() => {
                api.post("/auth", {login: nomeUsuario, senha: senha})
                .then((response) => {
                    var token = response.data["accessToken"];
                    
                    inserirToken(token);

                    resolve();
                }).catch((err) => {alert(err)});
            }, 3000);
        })
    },
    
    logoff: function() {
        removerToken();
    }
};

export default AutenticacaoService;