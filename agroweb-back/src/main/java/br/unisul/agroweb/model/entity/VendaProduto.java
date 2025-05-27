package br.unisul.agroweb.model.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "venda_produto")
public class VendaProduto {

    @EmbeddedId
    private VendaProdutoPK vendaProdutoPK;

    private Integer quantidade;

    @Column(name = "valor_unitario")
    private BigDecimal valorUnitario;

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

    public VendaProdutoPK getVendaProdutoPK() {
        return vendaProdutoPK;
    }

    public void setVendaProdutoPK(VendaProdutoPK vendaProdutoPK) {
        this.vendaProdutoPK = vendaProdutoPK;
    }

}
