package br.unisul.agroweb.model.entity.dto;

import br.unisul.agroweb.model.entity.Produto;

import java.io.Serializable;
import java.math.BigDecimal;

public class ProdutoDTO implements Serializable {

    private Integer idProduto;
    private String nome;
    private Integer quantidadeEstoque;
    private String unidadeMedida;
    private BigDecimal valor;
    private String descricao;

    public ProdutoDTO() {
    }

    public ProdutoDTO(Produto produto) {
        this.idProduto = produto.getIdProduto();
        this.nome = produto.getNome();
        this.quantidadeEstoque = produto.getQuantidadeEstoque();
        this.unidadeMedida = produto.getUnidadeMedida();
        this.valor = produto.getValor();
        this.descricao = produto.getDescricao();
    }

    public Integer getIdProduto() {
        return idProduto;
    }

    public void setIdProduto(Integer idProduto) {
        this.idProduto = idProduto;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getQuantidadeEstoque() {
        return quantidadeEstoque;
    }

    public void setQuantidadeEstoque(Integer quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
    }

    public String getUnidadeMedida() {
        return unidadeMedida;
    }

    public void setUnidadeMedida(String unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
