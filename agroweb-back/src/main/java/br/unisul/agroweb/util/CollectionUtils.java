package br.unisul.agroweb.util;

import java.util.Collection;

public class CollectionUtils {

    public static <T> boolean isEmpty(Collection<T> lista) {
        return lista == null || lista.isEmpty();
    }
}
