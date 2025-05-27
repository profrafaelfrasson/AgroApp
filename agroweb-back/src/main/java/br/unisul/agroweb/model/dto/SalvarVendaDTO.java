package br.unisul.agroweb.model.dto;

import br.unisul.agroweb.model.entity.dto.VendaProdutoDTO;
import br.unisul.agroweb.model.enumered.FormaPagamentoEnum;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class SalvarVendaDTO implements Serializable {

    @NotNull
    private Integer idCliente;

    @NotNull
    private List<VendaProdutoDTO> vendasProdutos = new ArrayList<>();

    private boolean crediario;

    @NotNull
    private FormaPagamentoEnum formaPagamento;

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public List<VendaProdutoDTO> getVendasProdutos() {
        return vendasProdutos;
    }

    public void setVendasProdutos(List<VendaProdutoDTO> vendasProdutos) {
        this.vendasProdutos = vendasProdutos;
    }

    public boolean isCrediario() {
        return crediario;
    }

    public void setCrediario(boolean crediario) {
        this.crediario = crediario;
    }

    public FormaPagamentoEnum getFormaPagamento() {
        return formaPagamento;
    }

    public void setFormaPagamento(FormaPagamentoEnum formaPagamento) {
        this.formaPagamento = formaPagamento;
    }
}
