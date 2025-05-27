import React from 'react';

import '../App.css'

import { Box, Flex, Text } from '@chakra-ui/layout';
import { faCartShopping, faDolly, faHouse, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

import AutenticacaoService from '../services/autenticacaoService';

class MenuItem {
    constructor(nome, icone, rota) {
        this.nome = nome;
        this.icone = icone;
        this.rota = rota;
    }
}

const menus = [
    new MenuItem("Início", faHouse, "/"),
    new MenuItem("Clientes", faUsers, "/cliente"),
    new MenuItem("Produtos", faDolly, "/produto"),
    new MenuItem("Vendas", faCartShopping, "/venda"),
]

const Menu = ({item}) => {
    const isActive = window.location.pathname === item.rota

    return (
        <Link style={{textDecoration: 'none'}}  to={item.rota} key={item.nome} >
            <Flex className={isActive ? "active" : ""} align="center" cursor="pointer" _hover={{bg: '#00233b'}} px="8" py="4">
                <FontAwesomeIcon style={{marginRight: '12px'}} icon={item.icone} color="white"/>
                {item.nome} 
            </Flex>
        </Link>
    );
}

const MenuLateral = () => {
    const navigate = useNavigate();

    const fazerLogoff = () => {
        AutenticacaoService.logoff();
        navigate('/login');
    }

    return (
        <Box height="100vh" width="15vw" bg="#004b80" color="white" paddingTop="30px" position='fixed'>
            <Flex alignItems="center" h="20" px="8">
                <Text fontSize="20" fontWeight="bold">
                    Agroweb
                </Text>
            </Flex>
            {menus.map((menu) => (
                <Menu key={menu.nome} item={menu}>{menu.nome}</Menu>
            ))}

            <Box position='absolute' bottom='0'>
                <Button bg="#004b80" onClick={fazerLogoff} color="white" _hover={{bg: '#00233b'}} h='16' px="8" width='15vw' justifyContent="flex-start" borderRadius={0}>
                    Sair
                </Button>
            </Box>
        </Box>
    );
}

export default MenuLateral;