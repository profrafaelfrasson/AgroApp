const DateUtils = {
    formatarData: function (valor) {
        if (valor == null) {
            return "";
        }
        
        var data = valor instanceof Date ? valor : new Date(valor);
        
        return data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    }
}

export default DateUtils;