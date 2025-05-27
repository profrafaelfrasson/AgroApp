const NumberUtils = {
    converterParaReal: function(valor) {
        if (valor == null) {
            return "";
        }
    
        return valor.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    }
}

export default NumberUtils;