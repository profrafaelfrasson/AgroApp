import React from 'react';
import { VStack, Text } from '@chakra-ui/react';

export default function DetalhesMensagem({mensagem, detalhes}) {
    return (
        <>
            <Text as='b'>{mensagem}</Text>
            {detalhes !== undefined 
                ?  <VStack paddingTop={2} spacing={0} align="left">
                        {detalhes.map((detalhe) => (
                            <Text align="left">{detalhe}</Text>
                        ))}
                    </VStack>  
                :   null
            }
        </>
    );
}