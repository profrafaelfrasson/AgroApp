import React, { useState, useEffect } from 'react';

import Botao from '../../components/Botao';
import BotaoEditar from '../../components/BotaoEditar';
import BotaoRemover from '../../components/BotaoRemover';
import CadastroCliente from './modal/CadastroCliente';
import InativarCliente from './modal/InativarCliente';
import ClienteService from '../../services/clienteService';

import { Flex } from '@chakra-ui/layout';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';


const Cliente = () => {
    const [cliente, setCliente] = useState();
    const [clientes, setClientes] = useState([]);
    const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
    const [modalInativarClienteAberto, setModalInativarClienteAberto] = useState(false);

    useEffect(() => {consultarClientes()}, []);

    const consultarClientes = async () => {
        ClienteService.consultarClientes().then((response) => {
            setClientes(response);
        }).catch((err) => console.log(err));
    }

    function fecharModal() {
        console.log("Fechando modal");
        setModalCadastroAberto(false);
        setModalInativarClienteAberto(false);
        consultarClientes();
    }

    function abrirModal() {
        setCliente();
        setModalCadastroAberto(true);
    }

    function editarCliente(idCliente) {
        ClienteService.consultarCliente(idCliente).then((dadosCliente) => {
            setCliente(dadosCliente);
            setModalCadastroAberto(true);
        }).catch((err) => console.log(err));
    }

    function confirmarInativarCliente(cliente) {
        setCliente(cliente);
        setModalInativarClienteAberto(true);
    }

    return (
        <Flex flexDirection='column' margin='30px'>
            <CadastroCliente modalAberto={modalCadastroAberto} dadosEdicao={cliente} fecharModal={fecharModal}/>
            <InativarCliente modalAberto={modalInativarClienteAberto} cliente={cliente} fecharModal={fecharModal}/>

            <Botao texto="Adicionar cliente" width='20vw' margin='0 0 15px 0' icone={faUserPlus} acao={abrirModal}/>
            
            <TableContainer bg={'white'} padding='10px'>
                <Table variant='simple' size='lg'>
                    <Thead>
                        <Tr>
                            <Th>Ação</Th>
                            <Th>Código</Th>
                            <Th>Nome</Th>
                            <Th>CPF</Th>
                            <Th>Telefone</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {clientes.length === 0 ? 
                            <Tr>
                                <Td>Nenhum registro encontrado</Td>
                            </Tr>
                        : null} 
                        {clientes.map((cliente, index) => (
                            <Tr key={index}>
                                <Td>
                                    <BotaoEditar titulo="Editar cliente" acao={() => editarCliente(cliente.idPessoa)} />
                                    <BotaoRemover titulo="Inativar cliente" acao={() => confirmarInativarCliente(cliente)}/>
                                </Td>
                                <Td>{cliente.idPessoa}</Td>
                                <Td>{cliente.nome}</Td>
                                <Td>{cliente.cpf}</Td>
                                <Td>{cliente.telefone}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
}

export default Cliente;