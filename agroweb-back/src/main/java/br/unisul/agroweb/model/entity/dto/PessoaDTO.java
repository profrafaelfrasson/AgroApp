package br.unisul.agroweb.model.entity.dto;

import br.unisul.agroweb.model.entity.Pessoa;
import br.unisul.agroweb.util.CollectionUtils;
import br.unisul.agroweb.util.DateUtils;
import br.unisul.agroweb.util.StringUtils;

import java.io.Serializable;

public class PessoaDTO implements Serializable {

    private Integer idPessoa;
    private String nome;
    private String cpf;
    private String telefone;
    private String dataNascimento;
    private EnderecoDto endereco;

    private boolean ativo;

    private UsuarioDTO usuario;

    public PessoaDTO(Pessoa pessoa) {
        this.idPessoa = pessoa.getIdPessoa();
        this.nome = pessoa.getNome();
        this.cpf = StringUtils.maskCpf(pessoa.getCpf());
        this.telefone = pessoa.getTelefone();
        this.dataNascimento = DateUtils.format(pessoa.getDataNascimento());
        this.endereco = new EnderecoDto(pessoa.getEndereco());
        this.ativo = pessoa.isAtivo();
        this.usuario = CollectionUtils.isEmpty(pessoa.getUsuarios()) ? null : new UsuarioDTO(pessoa.getUsuarios().get(0));
    }

    public Integer getIdPessoa() {
        return idPessoa;
    }

    public void setIdPessoa(Integer idPessoa) {
        this.idPessoa = idPessoa;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public EnderecoDto getEndereco() {
        return endereco;
    }

    public void setEndereco(EnderecoDto endereco) {
        this.endereco = endereco;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public UsuarioDTO getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioDTO usuario) {
        this.usuario = usuario;
    }
}
