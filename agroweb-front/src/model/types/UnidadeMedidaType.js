export const unidadesMedidaTypes = [
    {label: 'Unidade', sigla: 'un', valor: 'UNIDADE'},
    {label: 'Quilograma', sigla: 'kg', valor: 'QUILOGRAMA'},
    {label: 'Grama', sigla: 'g', valor: 'GRAMA'},
    {label: 'Litro', sigla: 'l', valor: 'LITRO'},
    {label: 'Mililitro', sigla: 'ml', valor: 'MILILITRO'},
    {label: 'Metro quadrado', sigla: 'm²', valor: 'METRO_QUADRADO'},
];

export const converterUnidadeMedida = (unidadeMedida) => {
    for (const unidadeMedidaType of unidadesMedidaTypes) {
        if (unidadeMedidaType.valor === unidadeMedida) {
            return unidadeMedidaType;
        }
    }

    return {label: 'Unidade', sigla: 'un', valor: 'UNIDADE'};
}