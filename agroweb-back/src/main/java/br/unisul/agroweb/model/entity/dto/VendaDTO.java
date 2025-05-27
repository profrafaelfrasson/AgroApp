package br.unisul.agroweb.model.entity.dto;

import br.unisul.agroweb.model.entity.Venda;
import br.unisul.agroweb.model.enumered.FormaPagamentoEnum;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class VendaDTO implements Serializable {

    private Integer idVenda;
    private PessoaDTO cliente;
    private List<VendaProdutoDTO> vendasProdutos = new ArrayList<>();
    private LocalDate data;
    private LocalDate dataPagamento;
    private BigDecimal valorTotal;
    private boolean crediario;
    private boolean cancelada;
    private FormaPagamentoEnum formaPagamento;

    public VendaDTO() {
    }

    public VendaDTO(Venda venda) {
        this.idVenda = venda.getIdVenda();
        this.cliente = new PessoaDTO(venda.getCliente());
        this.vendasProdutos = venda.getProdutos().stream().map(VendaProdutoDTO::new).collect(Collectors.toList());
        this.data = venda.getData();
        this.dataPagamento = venda.getDataPagamento();
        this.valorTotal = venda.getValorTotal();
        this.crediario = venda.isCrediario();
        this.cancelada = venda.isCancelada();
        this.formaPagamento = FormaPagamentoEnum.parse(venda.getFormaPagamento());
    }

    public Integer getIdVenda() {
        return idVenda;
    }

    public void setIdVenda(Integer idVenda) {
        this.idVenda = idVenda;
    }

    public PessoaDTO getCliente() {
        return cliente;
    }

    public void setCliente(PessoaDTO cliente) {
        this.cliente = cliente;
    }

    public List<VendaProdutoDTO> getVendasProdutos() {
        return vendasProdutos;
    }

    public void setVendasProdutos(List<VendaProdutoDTO> vendasProdutos) {
        this.vendasProdutos = vendasProdutos;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public LocalDate getDataPagamento() {
        return dataPagamento;
    }

    public void setDataPagamento(LocalDate dataPagamento) {
        this.dataPagamento = dataPagamento;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

    public boolean isCrediario() {
        return crediario;
    }

    public void setCrediario(boolean crediario) {
        this.crediario = crediario;
    }

    public boolean isCancelada() {
        return cancelada;
    }

    public void setCancelada(boolean cancelada) {
        this.cancelada = cancelada;
    }

    public FormaPagamentoEnum getFormaPagamento() {
        return formaPagamento;
    }

    public void setFormaPagamento(FormaPagamentoEnum formaPagamento) {
        this.formaPagamento = formaPagamento;
    }
}
