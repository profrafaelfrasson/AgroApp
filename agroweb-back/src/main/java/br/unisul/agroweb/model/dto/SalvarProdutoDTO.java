package br.unisul.agroweb.model.dto;

import br.unisul.agroweb.deserializer.UnidadeMedidaEnumDeserializer;
import br.unisul.agroweb.model.enumered.UnidadeMedidaEnum;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.io.Serializable;
import java.math.BigDecimal;

public class SalvarProdutoDTO implements Serializable {

    private Integer idProduto;

    @NotBlank(message = "O nome do produto é obrigatório")
    private String nome;

    @NotNull(message = "Unidade de medida inválida")
    @JsonDeserialize(using = UnidadeMedidaEnumDeserializer.class)
    private UnidadeMedidaEnum unidadeMedida;

    @PositiveOrZero(message = "A quantidade de estoque deve ser no mínimo 0 (zero)")
    private Integer quantidadeEstoque;

    @Positive(message = "O valor é obrigatório")
    private BigDecimal valor;

    private String descricao;

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

    public UnidadeMedidaEnum getUnidadeMedida() {
        return unidadeMedida;
    }

    public void setUnidadeMedida(UnidadeMedidaEnum unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

    public Integer getQuantidadeEstoque() {
        return quantidadeEstoque;
    }

    public void setQuantidadeEstoque(Integer quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
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
