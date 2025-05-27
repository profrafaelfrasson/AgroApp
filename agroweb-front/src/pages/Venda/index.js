import { Flex, Grid, GridItem, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import ClienteService from '../../services/clienteService';
import SelectList from '../../components/SelectList';
import ProdutoService from '../../services/produtoService';
import { situacoesPagamentoType } from '../../model/types/SituacaoPagamentoType';
import Botao from '../../components/Botao';
import BotaoIcone from '../../components/BotaoIcone';
import { faCartPlus, faSearch, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import VendaService from '../../services/vendaService';
import { VendaModel } from '../../model/VendaModel';
import NumberUtils from '../../util/numberUtil';
import DateUtils from '../../util/dateUtils';
import CadastroVenda from './modal/CadastroVenda';
import AtualizarPagamento from './modal/AtualizarPagamento';

const Venda = () => {
    const [vendas, setVendas] = useState([]);   
    const [modalAtualizarPagamentoAberto, setModalAtualizarPagamentoAberto] = useState(false);
    const [vendaSelecionada, setVendaSelecionada] = useState(false);

    return (
        <>
            <Flex flexDirection='column' margin='30px'>
                <FormularioConsulta setVendas={setVendas} vendaSelecionada={vendaSelecionada} modalAtualizarPagamentoAberto={modalAtualizarPagamentoAberto} setModalAtualizarPagamentoAberto={setModalAtualizarPagamentoAberto} />
                <ListagemVendas vendas={vendas} setVendas={setVendas} setVendaSelecionada={setVendaSelecionada} setModalAtualizarPagamentoAberto={setModalAtualizarPagamentoAberto}/>
            </Flex>
        </>
    );
}

const FormularioConsulta = ({setVendas, vendaSelecionada, modalAtualizarPagamentoAberto, setModalAtualizarPagamentoAberto}) => {
    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [idClienteSelecionado, setIdClienteSelecionado] = useState();
    const [idProdutoSelecionado, setIdProdutoSelecionado] = useState();
    const [situacaoPagamento, setSituacaoPagamento] = useState('TODOS');
    const [modalCadastroAberto, setModalCadastroAberto] = useState(false);

    useEffect(() => {
        consultarClientes();
        consultarProdutos();
        consultarVendas();
    }, []);

    function consultarClientes() {
        ClienteService.consultarClientes().then((response) => {
            setClientes(response);
        }).catch((err) => {
            console.log(err);
        });
    }

    function consultarProdutos() {
        ProdutoService.consultarProdutos().then((response) => {
            setProdutos(response);
        }).catch((err) => {
            console.log(err);
        })
    }

    function mapearClientesParaSelectItem() {
        return clientes.map((cliente) => {
            return {
                label: cliente.nome,
                valor: cliente.idPessoa
            };
        })
    }

    function mapearProdutosParaSelectItem() {
        return produtos.map((produto) => {
            return {
                label: produto.nome,
                valor: produto.idProduto
            };
        })
    }

    function consultarVendas() {
        VendaService.consultarVendas({idCliente: idClienteSelecionado, idProduto: idProdutoSelecionado, situacaoPagamento: situacaoPagamento}).then((response) => {
            var retorno = response.data.map((item) => new VendaModel(item));

            setVendas(retorno);
        }).catch((err) => {
            console.log(err);
        })
    }

    function abrirModalCadastro() {
        setModalCadastroAberto(true);
    }

    function fecharModalCadastro() {
        consultarVendas();
        setModalCadastroAberto(false);
    }

    function fecharModalAtualizarPagamento() {
        setModalAtualizarPagamentoAberto(false);
        consultarVendas();
    }

    return (
        <>
            <AtualizarPagamento modalAberto={modalAtualizarPagamentoAberto} venda={vendaSelecionada} fecharModal={fecharModalAtualizarPagamento}/>
            <CadastroVenda modalAberto={modalCadastroAberto} fecharModal={fecharModalCadastro} />

            <Grid templateColumns='repeat(12, 1fr)' gap={6}>
                <GridItem colSpan={4}>
                    <SelectList label='Cliente' 
                                valores={mapearClientesParaSelectItem()}
                                value={idClienteSelecionado} 
                                change={(e) => {setIdClienteSelecionado(e.target.value)}} />
                </GridItem>

                <GridItem colSpan={4}>
                    <SelectList label='Produto' 
                                valores={mapearProdutosParaSelectItem()}
                                value={idProdutoSelecionado} 
                                change={(e) => {setIdProdutoSelecionado(e.target.value)}} />
                </GridItem>

                <GridItem colSpan={4}>
                    <SelectList label='Pagamento' 
                                valores={situacoesPagamentoType}
                                value={situacaoPagamento} 
                                change={(e) => {setSituacaoPagamento(e.target.value)}} />
                </GridItem>

                <GridItem colSpan={3}>
                    <Botao texto='Buscar' icone={faSearch} acao={consultarVendas} />
                </GridItem>

                <GridItem colSpan={3}>
                    <Botao texto='Cadastrar venda' icone={faCartPlus} acao={abrirModalCadastro} />
                </GridItem>
            </Grid>
        </>
    )
}

const ListagemVendas = ({vendas, setVendas, setVendaSelecionada, setModalAtualizarPagamentoAberto}) => {

    function abrirModalAtualizarPagamento(venda) {
        setVendaSelecionada(venda);
        setModalAtualizarPagamentoAberto(true);
    }

    return (
        <>
            <TableContainer bg={'white'} padding='10px' marginTop={2}>
                <Table variant='simple' size='lg'>
                    <Thead>
                        <Tr>
                            <Th width="10%">Ação</Th>
                            <Th width="10%">Código</Th>
                            <Th width="10%">Data</Th>
                            <Th width="50%">Cliente</Th>
                            <Th width="10%">Valor total</Th>
                            <Th width="10%">Data de pagamento</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {vendas.length === 0 ? 
                            <Tr>
                                <Td>Nenhum registro encontrado</Td>
                            </Tr>
                        : null} 

                        {vendas.map((venda, index) => (
                            <Tr key={index}>
                                <Td>
                                    <Flex>
                                        <BotaoIcone titulo="Atualizar data de pagamento" icone={faClockRotateLeft} acao={() => abrirModalAtualizarPagamento(venda)}/>
                                    </Flex>
                                </Td>
                                <Td>{venda.idVenda}</Td>
                                <Td>{DateUtils.formatarData(venda.data)}</Td>
                                <Td>{venda.cliente.nome}</Td>
                                <Td>{NumberUtils.converterParaReal(venda.valorTotal)}</Td>
                                <Td>{DateUtils.formatarData(venda.dataPagamento)}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Venda;