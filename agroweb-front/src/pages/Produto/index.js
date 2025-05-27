import { Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import ProdutoService from '../../services/produtoService';
import Botao from '../../components/Botao';
import CadastroProduto from './modal/CadastroProduto';
import { ProdutoModel } from '../../model/ProdutoModel';
import { converterUnidadeMedida } from '../../model/types/UnidadeMedidaType';
import NumberUtils from '../../util/numberUtil';
import BotaoEditar from '../../components/BotaoEditar';
import BotaoRemover from '../../components/BotaoRemover';
import InativarProduto from './modal/InativarProduto';

const listaProdutos = await ProdutoService.consultarProdutos();

const Produto = () => {
    const [produto, setProduto] = useState();
    const [produtos, setProdutos] = useState(listaProdutos);
    const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
    const [modalInativarProdutoAberto, setModalInativarProdutoAberto] = useState(false);

    useEffect(() => {consultarProdutos()}, [])

    const consultarProdutos = async () => {
        ProdutoService.consultarProdutos().then((response) => {
            setProdutos(response);
        }).catch((err) => console.log(err));
    }

    function fecharModal() {
        setModalInativarProdutoAberto(false);
        setModalCadastroAberto(false);
        consultarProdutos();
    }

    function abrirModal() {
        setProduto();
        setModalCadastroAberto(true);
    }

    function editarProduto(idProduto) {
        ProdutoService.consultarProduto(idProduto).then((response) => {
            setProduto(new ProdutoModel(response.data));
            setModalCadastroAberto(true);
        }).catch((err) => {
            console.log(err);
        })
    }

    function confirmarInativarProduto(produto) {
        setProduto(produto);
        setModalInativarProdutoAberto(true);
    }

    return (
        <Flex flexDirection='column' margin='30px'>
            <CadastroProduto modalAberto={modalCadastroAberto} fecharModal={fecharModal} dadosEdicao={produto}/>
            <InativarProduto modalAberto={modalInativarProdutoAberto} fecharModal={fecharModal} produto={produto}/>

            <Botao texto="Adicionar produto" width='20vw' margin='0 0 15px 0' icone={faFileCirclePlus} acao={abrirModal}/>
            
            <TableContainer bg={'white'} padding='10px'>
                <Table variant='simple' size='lg'>
                    <Thead>
                        <Tr>
                            <Th>Ação</Th>
                            <Th>Código</Th>
                            <Th>Nome</Th>
                            <Th>Estoque</Th>
                            <Th>Valor</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {produtos.length === 0 ? 
                            <Tr>
                                <Td>Nenhum registro encontrado</Td>
                            </Tr>
                        : null} 

                        {produtos.map((produto, index) => (
                            <Tr key={index}>
                                <Td>
                                    <Flex>
                                        <BotaoEditar titulo="Editar produto" acao={() => editarProduto(produto.idProduto)} />
                                        <BotaoRemover titulo="Inativar produto" acao={() => confirmarInativarProduto(produto)}/>
                                    </Flex>
                                </Td>
                                <Td>{produto.idProduto}</Td>
                                <Td>{produto.nome}</Td>
                                <Td>{produto.quantidadeEstoque + " " + converterUnidadeMedida(produto.unidadeMedida).sigla}</Td>
                                <Td>{NumberUtils.converterParaReal(produto.valor)}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
}

export default Produto;