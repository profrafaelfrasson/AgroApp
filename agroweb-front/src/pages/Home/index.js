import React from 'react'
import { Box, Flex } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import patinho from "../../assets/patinho.png";

const Home = () => {
  return (
    <Flex w={"100%"}>
        <Box position='absolute' right='10' bottom='10'>
          <Image src={patinho} alt='Patinho' />
        </Box>
    </Flex>
      
  )
}

export default Home;