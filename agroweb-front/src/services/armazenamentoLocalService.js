export const CHAVE_TOKEN = "@agroweb-token";

export const verificarUsuarioLogado = () => localStorage.getItem(CHAVE_TOKEN) !== null;

export const obterToken = () => localStorage.getItem(CHAVE_TOKEN);

export const inserirToken = token => {
    localStorage.setItem(CHAVE_TOKEN, token);
}

export const removerToken = () => {
    localStorage.removeItem(CHAVE_TOKEN);
};