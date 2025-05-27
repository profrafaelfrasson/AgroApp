package br.unisul.agroweb.model.dto;

import br.unisul.agroweb.model.entity.dto.PessoaDTO;

public class AutenticacaoRetornoDTO {

    private String accessToken;

    private String tokenType = "Bearer";

    private PessoaDTO pessoa;

    public AutenticacaoRetornoDTO(String accessToken, PessoaDTO pessoa) {
        this.accessToken = accessToken;
        this.pessoa = pessoa;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public PessoaDTO getPessoa() {
        return pessoa;
    }

    public void setPessoa(PessoaDTO pessoa) {
        this.pessoa = pessoa;
    }
}
