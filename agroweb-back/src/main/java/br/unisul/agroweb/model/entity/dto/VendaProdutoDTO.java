package br.unisul.agroweb.model.entity.dto;

import br.unisul.agroweb.model.entity.VendaProduto;

import java.math.BigDecimal;

public class VendaProdutoDTO {

    private ProdutoDTO produto;
    private Integer quantidade;
    private BigDecimal valorUnitario;

    public VendaProdutoDTO() {
    }

    public VendaProdutoDTO(VendaProduto vendaProduto) {
        this.produto = new ProdutoDTO(vendaProduto.getVendaProdutoPK().getProduto());
        this.quantidade = vendaProduto.getQuantidade();
        this.valorUnitario = vendaProduto.getValorUnitario();
    }

    public ProdutoDTO getProduto() {
        return produto;
    }

    public void setProduto(ProdutoDTO produto) {
        this.produto = produto;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public BigDecimal getValorUnitario() {
        return valorUnitario;
    }

    public void setValorUnitario(BigDecimal valorUnitario) {
        this.valorUnitario = valorUnitario;
    }

    public BigDecimal calcularValorTotal() {
        return valorUnitario.multiply(BigDecimal.valueOf(quantidade));
    }
}
