package br.unisul.agroweb.model.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "historico_entrada_produto")
public class HistoricoEntradaProduto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_historico_entrada_produto")
    private Integer idHistoricoEntradaProduto;

    @Column(nullable = false)
    private Integer quantidade;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_produto")
    private Produto produto;

    @Column(columnDefinition = "DATE", nullable = false)
    private LocalDate data;

    public HistoricoEntradaProduto() {

    }

    public HistoricoEntradaProduto(Produto produto, Integer quantidade, LocalDate data) {
        this.produto = produto;
        this.quantidade = quantidade;
        this.data = data;
    }

    public Integer getIdHistoricoEntradaProduto() {
        return idHistoricoEntradaProduto;
    }

    public void setIdHistoricoEntradaProduto(Integer idHistoricoEntradaProduto) {
        this.idHistoricoEntradaProduto = idHistoricoEntradaProduto;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

}
