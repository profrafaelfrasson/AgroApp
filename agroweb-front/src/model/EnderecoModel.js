export class EnderecoModel {
    constructor(dados) {
        this.pais = dados["pais"];
        this.uf = dados["uf"];
        this.cidade = dados["cidade"];
        this.bairro = dados["bairro"];
        this.cep = dados["cep"];
        this.numero = dados["numero"];
        this.complemento = dados["complemento"];
    }
}