package br.unisul.agroweb.model.entity.dto;

import br.unisul.agroweb.model.entity.HistoricoEntradaProduto;

import java.io.Serializable;
import java.time.LocalDate;

public class HistoricoEntradaProdutoDTO implements Serializable {

    private Integer idHistoricoEntradaProduto;
    private Integer idProduto;
    private LocalDate data;
    private Integer quantidade;

    public HistoricoEntradaProdutoDTO(HistoricoEntradaProduto historicoEntradaProduto) {
        this.idHistoricoEntradaProduto = historicoEntradaProduto.getIdHistoricoEntradaProduto();
        this.idProduto = historicoEntradaProduto.getProduto().getIdProduto();
        this.data = historicoEntradaProduto.getData();
        this.quantidade = historicoEntradaProduto.getQuantidade();
    }

    public Integer getIdHistoricoEntradaProduto() {
        return idHistoricoEntradaProduto;
    }

    public void setIdHistoricoEntradaProduto(Integer idHistoricoEntradaProduto) {
        this.idHistoricoEntradaProduto = idHistoricoEntradaProduto;
    }

    public Integer getIdProduto() {
        return idProduto;
    }

    public void setIdProduto(Integer idProduto) {
        this.idProduto = idProduto;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
}
