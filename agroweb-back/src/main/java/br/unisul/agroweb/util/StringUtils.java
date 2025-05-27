package br.unisul.agroweb.util;

public class StringUtils {
    public static String maskCpf(String cpf) {
        return cpf.replaceAll("(\\d{3})(\\d{3})(\\d{3})(\\d{2})", "$1.$2.$3-$4");
    }

    public static boolean isBlank(String valor) {
        return valor == null || valor.isBlank();
    }

}
