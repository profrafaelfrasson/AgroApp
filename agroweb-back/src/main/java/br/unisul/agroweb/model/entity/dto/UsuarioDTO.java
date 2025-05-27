package br.unisul.agroweb.model.entity.dto;

import br.unisul.agroweb.model.entity.Usuario;

import java.io.Serializable;

public class UsuarioDTO implements Serializable {

    private Integer idUsuario;

    private String login;

    private String senha;

    public UsuarioDTO() {
    }

    public UsuarioDTO(Usuario usuario) {
        this.idUsuario = usuario.getIdUsuario();
        this.login = usuario.getLogin();
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
