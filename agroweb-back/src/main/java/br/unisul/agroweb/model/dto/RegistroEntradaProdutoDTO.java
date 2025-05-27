package br.unisul.agroweb.model.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.io.Serializable;
import java.time.LocalDate;

public class RegistroEntradaProdutoDTO implements Serializable {

    @NotNull(message = "A data de entrada é obrigatória")
    private LocalDate dataEntrada;

    @Positive(message = "A quantidade de entrada do produto é obrigatória")
    private Integer quantidade;

    public LocalDate getDataEntrada() {
        return dataEntrada;
    }

    public void setDataEntrada(LocalDate dataEntrada) {
        this.dataEntrada = dataEntrada;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
}
