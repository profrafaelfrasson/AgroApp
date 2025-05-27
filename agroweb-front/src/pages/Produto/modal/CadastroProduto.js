import React, { useState } from 'react';
import ModalPadrao from '../../../components/ModalPadrao';
import { Box, Flex, Grid, GridItem, useToast } from '@chakra-ui/react';
import InputPadrao from '../../../components/InputPadrao';
import SelectList from '../../../components/SelectList';
import { unidadesMedidaTypes } from '../../../model/types/UnidadeMedidaType';
import InputNumero from '../../../components/InputNumero';
import BotaoSalvar from '../../../components/BotaoSalvar';
import Botao from '../../../components/Botao';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import ProdutoService from '../../../services/produtoService';
import DetalhesMensagem from '../../../components/DetalhesMensagem';
import HistoricoEntrada from './HistoricoEntrada';
import { ProdutoModel } from '../../../model/ProdutoModel';

function CadastroProduto({
    modalAberto,
    fecharModal,
    dadosEdicao
}) {
    const isEdicao = dadosEdicao != null;

    return <ModalPadrao cabecalho="Cadastro de produto" 
                        aberto={modalAberto} 
                        acaoFechar={fecharModal} 
                        children={<Formulario isEdicao={isEdicao} dadosEdicao={dadosEdicao} acaoFechar={fecharModal}/>}/>
}

function Formulario({isEdicao, dadosEdicao, acaoFechar}) {
    const idProduto = isEdicao ? dadosEdicao.idProduto : null;
    const [nome, setNome] = useState(isEdicao ? dadosEdicao.nome : null);
    const [unidadeMedida, setUnidadeMedida] = useState(isEdicao ? dadosEdicao.unidadeMedida : null);
    const [quantidadeEstoque, setQuantidadeEstoque] = useState(isEdicao ? dadosEdicao.quantidadeEstoque : 0);
    const [valor, setValor] = useState(isEdicao ? dadosEdicao.valor : 0);
    const [descricao, setDescricao] = useState(isEdicao ? dadosEdicao.descricao : null);
    const [modalHistoricoEntradaAberto, setModalHistoricoEntradaAberto] = useState(false);

    const toast = useToast();

    const mensagemAlteradoSucesso = () => {
        toast({
            title: "Produto alterado com sucesso.", 
            status: "success",
            position: "top",
            duration: 1000,
            isClosable: true
        })
    }

    const mensagemSucesso = () => {
        toast({
            title: "Produto cadastrado com sucesso.", 
            status: "success",
            position: "top",
            duration: 1000,
            isClosable: true
        })
    }

    const mensagemErro = (descricao) => {
        toast({
            title: "Ocorreu um erro ao salvar o produto",
            description: <DetalhesMensagem detalhes={descricao} />,
            status: "error",
            position: "top",
            duration: 5000,
            isClosable: true
        })
    }

    const salvarProduto = async (e) => {
        e.preventDefault();

        try {
            var dadosSalvarProduto = {
                nome: nome,
                unidadeMedida: unidadeMedida,
                quantidadeEstoque: quantidadeEstoque,
                valor: valor,
                descricao: descricao
            }

            if (isEdicao) {
                ProdutoService.atualizarProduto(idProduto, dadosSalvarProduto).then(() => {
                    mensagemAlteradoSucesso();
                    acaoFechar();
                }).catch((err) => {
                    console.log(err);
                    mensagemErro(err.response.data.details);
                });
            } else {
                ProdutoService.salvarProduto(dadosSalvarProduto).then(() => {
                    mensagemSucesso();
                    acaoFechar();
                }).catch((err) => {
                    console.log(err);
                    mensagemErro(err.response.data.details);
                })
            }
        } catch (error) {

        }
    }

    const abrirModalHistoricoEntrada = (e) => {
        e.preventDefault();
        setModalHistoricoEntradaAberto(true);
    }

    const fecharModalHistoricoEntrada = () => {
        ProdutoService.consultarProduto(idProduto).then((response) => {
            dadosEdicao = new ProdutoModel(response.data);

            setNome(dadosEdicao.nome);
            setUnidadeMedida(dadosEdicao.unidadeMedida);
            setQuantidadeEstoque(dadosEdicao.quantidadeEstoque);
            setValor(dadosEdicao.valor);
            setDescricao(dadosEdicao.descricao);
            
            setModalHistoricoEntradaAberto(false);
        }).catch((err) => {
            mensagemErro(err.response);
        })
    }

    return (<>
        {idProduto != null && modalHistoricoEntradaAberto ? <HistoricoEntrada modalAberto={modalHistoricoEntradaAberto} fecharModal={fecharModalHistoricoEntrada} idProduto={idProduto}/> : null}

        <Grid templateColumns='repeat(12, 1fr)' gap={6}>
            <GridItem colSpan={3}>
                <InputPadrao label="Código" disabled value={idProduto}/>
            </GridItem>

            <GridItem colSpan={9}>
                <InputPadrao label="Nome" required value={nome} change={(e) => {setNome(e.target.value)}}/>
            </GridItem>

            <GridItem colSpan={4}>
                <SelectList label='Unidade de medida' 
                            required
                            valores={unidadesMedidaTypes}
                            value={unidadeMedida} 
                            change={(e) => {setUnidadeMedida(e.target.value)}} />
            </GridItem>

            <GridItem colSpan={4}>
                <InputNumero label='Quantidade em estoque' 
                             required
                             disabled={idProduto != null}
                             value={quantidadeEstoque} 
                             change={(e) => {setQuantidadeEstoque(e.target.value)}}/>
            </GridItem>

            <GridItem colSpan={4}>
                <InputNumero label='Valor' required value={valor} change={(e) => {setValor(e.target.value)}} addon='R$' precision={2}/>
            </GridItem>

            <GridItem colSpan={12}>
                <InputPadrao label="Descrição" value={descricao} change={(e) => {setDescricao(e.target.value)}}/>
            </GridItem>
        </Grid> 

        <Flex gap={15} paddingTop={5}>
            <Box width="15%">
                <BotaoSalvar acao={salvarProduto} />
            </Box>

            <Box width="15%">
                <Botao icone={faCalendarDays} disabled={idProduto == null} texto='Histórico de entrada' acao={abrirModalHistoricoEntrada}/>
            </Box>
        </Flex>
    </>);
}

export default CadastroProduto;