import React from 'react';

import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Botao({
    texto, icone, acao, cor = '#004b80', corTexto = 'white', border, width = '100%', margin = '0', disabled = false
}) {

    const iconeBotao = icone != null ? <FontAwesomeIcon icon={icone} /> : null;

    return (
        <Button isDisabled={disabled} 
                bg={cor} 
                border={border} 
                color={corTexto} 
                width={width} 
                margin={margin} 
                onClick={acao}
                _hover={{bg: '#00233b', color: 'white'}} 
                leftIcon={iconeBotao}>
            {texto}
        </Button>
    );
}