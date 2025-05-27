package br.unisul.agroweb.util;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;


class DateUtilsTest {

    @Test
    void deveFormatarLocalDate() {
        assertEquals("01/01/2022", DateUtils.format(LocalDate.of(2022, 1, 1), "dd/MM/yyyy"));
    }

}