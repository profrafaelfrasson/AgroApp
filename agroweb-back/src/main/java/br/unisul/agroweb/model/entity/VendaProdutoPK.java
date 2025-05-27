package br.unisul.agroweb.model.entity;

import java.io.Serial;
import java.io.Serializable;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Embeddable
public class VendaProdutoPK implements Serializable {

    @Serial
    private static final long serialVersionUID = 793609426054145812L;

    @ManyToOne
    @JoinColumn(name = "id_venda", insertable = false, updatable = false)
    private Venda venda;

    @ManyToOne
    @JoinColumn(name = "id_produto", insertable = false, updatable = false)
    private Produto produto;

    public VendaProdutoPK() {

    }

    public VendaProdutoPK(Venda venda, Produto produto) {
        this.venda = venda;
        this.produto = produto;
    }

    public Venda getVenda() {
        return venda;
    }

    public void setVenda(Venda venda) {
        this.venda = venda;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }
    
}