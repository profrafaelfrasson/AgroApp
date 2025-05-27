package br.unisul.agroweb.model.enumered;

public enum UnidadeMedidaEnum {

    QUILOGRAMA("Quilograma", "kg"),
    GRAMA("Grama", "g"),
    LITRO("Litro", "l"),
    MILILITRO("Mililitro", "ml"),
    METRO_QUADRADO("Metro quadrado", "m²");

    private final String descricao;
    private final String sigla;

    UnidadeMedidaEnum(String descricao, String sigla) {
        this.descricao = descricao;
        this.sigla = sigla;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getSigla() {
        return sigla;
    }

    public static UnidadeMedidaEnum parse(String nome) {
        for (var unidade: values()) {
            if (unidade.name().equalsIgnoreCase(nome)) {
                return unidade;
            }
        }

        return null;
    }
}
