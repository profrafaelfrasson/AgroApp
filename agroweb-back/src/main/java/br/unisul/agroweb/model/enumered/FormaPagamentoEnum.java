package br.unisul.agroweb.model.enumered;

public enum FormaPagamentoEnum {

    DINHEIRO("Dinheiro"),
    PIX("Pix"),
    CARTAO_DEBITO("Cartão de débito"),
    CARTAO_CREDITO("Cartão de crédito");

    private final String valor;

    FormaPagamentoEnum(String valor) {
        this.valor = valor;
    }

    public static FormaPagamentoEnum parse(String name) {
        for (var formaPagamento: values()) {
            if (formaPagamento.name().equalsIgnoreCase(name)) {
                return formaPagamento;
            }
        }

        return null;
    }

    public String getValor() {
        return valor;
    }
}
