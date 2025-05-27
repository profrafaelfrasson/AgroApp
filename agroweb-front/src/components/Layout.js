import React from 'react';
import MenuLateral from './MenuLateral';
import { Box, Flex, Text } from '@chakra-ui/layout';

const Layout = ({children, titulo}) => {
    return (
        <>
        <Flex>
            <MenuLateral />
            
            <Flex flexDirection={"column"} flex='1' marginLeft='15vw'>
                <Box width="85vw" padding="30px 0 0 30px">
                    <Text fontSize={"30px"}>{titulo}</Text>
                </Box>
                
                <Box width={"85vw"} flex='1'>
                    {children}
                </Box>
            </Flex>
        </Flex>
        </>
    );
}

export default Layout;