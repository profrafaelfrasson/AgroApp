package br.unisul.agroweb.model.dto;

import br.unisul.agroweb.deserializer.SituacaoPagamentoEnumDeserializer;
import br.unisul.agroweb.model.enumered.SituacaoPagamentoEnum;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.io.Serializable;

public class ConsultaVendaDTO implements Serializable {

    private Integer idCliente;
    private Integer idProduto;
    @JsonDeserialize(using = SituacaoPagamentoEnumDeserializer.class)
    private SituacaoPagamentoEnum situacaoPagamento;

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public Integer getIdProduto() {
        return idProduto;
    }

    public void setIdProduto(Integer idProduto) {
        this.idProduto = idProduto;
    }

    public SituacaoPagamentoEnum getSituacaoPagamento() {
        return situacaoPagamento;
    }

    public void setSituacaoPagamento(SituacaoPagamentoEnum situacaoPagamento) {
        this.situacaoPagamento = situacaoPagamento;
    }
}
