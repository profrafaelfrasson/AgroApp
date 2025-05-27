package br.unisul.agroweb.util;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.*;

class StringUtilsTest {

    @ParameterizedTest
    @ValueSource(strings = {"03177535094", "031.775.350-94"})
    void deveFormatarCpfCorretamente(String cpf) {
        assertEquals("031.775.350-94", StringUtils.maskCpf(cpf));
    }

}