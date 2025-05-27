import React, { useState } from 'react';
import ModalPadrao from "../../../components/ModalPadrao";
import { Box, Divider, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import InputPadrao from '../../../components/InputPadrao';
import BotaoSalvar from '../../../components/BotaoSalvar';
import DetalhesMensagem from '../../../components/DetalhesMensagem';
import ClienteService from '../../../services/clienteService';
import { useToast } from '@chakra-ui/react';

function CadastroCliente({
    modalAberto,
    fecharModal,
    dadosEdicao
}) {
    const isEdicao = dadosEdicao != null;

    return (
        <ModalPadrao 
            cabecalho="Cadastro de cliente" 
            aberto={modalAberto} 
            acaoFechar={fecharModal} 
            children={<FormularioCadastro isEdicao={isEdicao} dadosEdicao={dadosEdicao} acaoFechar={fecharModal}/>}
        />
    );
}

function FormularioCadastro({isEdicao, dadosEdicao, acaoFechar}) {

    const toast = useToast();
    
    const mensagemAlteradoSucesso = () => {
        toast({
            title: "Cliente alterado com sucesso.", 
            status: "success",
            position: "top",
            duration: 1000,
            isClosable: true
        })
    }

    const mensagemSucesso = () => {
        toast({
            title: "Cliente cadastrado com sucesso.", 
            status: "success",
            position: "top",
            duration: 1000,
            isClosable: true
        })
    }

    const mensagemErro = (response) => {
        toast({
            title: "Ocorreu um erro ao salvar o cliente:",
            description: <DetalhesMensagem mensagem={response.data.message} detalhes={response.data.details} />,
            status: "error",
            position: "top",
            duration: 5000,
            isClosable: true
        })
    }
    
    const idCliente = isEdicao ? dadosEdicao.idPessoa : null;
    const [nome, setNome] = useState(isEdicao ? dadosEdicao.nome : null);
    const [cpf, setCpf] = useState(isEdicao ? dadosEdicao.cpf : null);
    const [dataNascimento, setDataNascimento] = useState(isEdicao ? dadosEdicao.dataNascimento : null);
    const [telefone, setTelefone] = useState(isEdicao ? dadosEdicao.telefone : null);
    const [pais, setPais] = useState(isEdicao ? dadosEdicao.endereco.pais : null);
    const [uf, setUf] = useState(isEdicao ? dadosEdicao.endereco.uf : null);
    const [cidade, setCidade] = useState(isEdicao ? dadosEdicao.endereco.cidade : null);
    const [bairro, setBairro] = useState(isEdicao ? dadosEdicao.endereco.bairro : null);
    const [cep, setCep] = useState(isEdicao ? dadosEdicao.endereco.cep : null);
    const [numero, setNumero] = useState(isEdicao ? dadosEdicao.endereco.numero : null);
    const [complemento, setComplemento] = useState(isEdicao ? dadosEdicao.endereco.complemento : null);

    const salvarCliente = async (e) => {
        e.preventDefault();
        try {
            var dadosSalvarCliente = {
                nome: nome,
                cpf: cpf,
                dataNascimento: dataNascimento,
                telefone: telefone,
                endereco: {
                    pais: pais,
                    uf: uf,
                    cidade: cidade,
                    cep: cep,
                    bairro: bairro,
                    numero: numero,
                    complemento: complemento
                }
            }
            
            if (isEdicao) {
                ClienteService.atualizarCliente(idCliente, dadosSalvarCliente).then(() => {
                    mensagemAlteradoSucesso();
                    acaoFechar();
                }).catch((err) => {
                    console.log(err);
                    mensagemErro(err.response);
                });
            } else {
                ClienteService.salvarCliente(dadosSalvarCliente).then(() => {
                    mensagemSucesso();
                    acaoFechar();
                }).catch((err) => {
                    console.log(err);
                    mensagemErro(err.response);
                });
            }
            
        } catch (error) {
            
        }
    }
    
    return (
        <>
            <Grid templateColumns='repeat(12, 1fr)' gap={6}>
                <GridItem colSpan={3}>
                    <InputPadrao label="Código" disabled={true} value={idCliente}/>
                </GridItem>

                <GridItem colSpan={9}>
                    <InputPadrao label="Nome" required={true} value={nome} change={(e) => {setNome(e.target.value)}}/>
                </GridItem>

                <GridItem colSpan={4}>
                    <InputPadrao label="CPF" required={true} value={cpf} change={(e) => {setCpf(e.target.value)}} mask="999.999.999-99" />
                </GridItem>

                <GridItem colSpan={4}>
                    <InputPadrao label="Data de nascimento" required={true} value={dataNascimento} change={(e) => {setDataNascimento(e.target.value)}} mask="99/99/9999" />
                </GridItem>

                <GridItem colSpan={4}>
                    <InputPadrao label="Telefone" required={true} value={telefone} change={(e) => {setTelefone(e.target.value)}} mask="(99) 99999-9999" />
                </GridItem>

                <GridItem colSpan={12}>
                    <Divider />
                </GridItem>

                <GridItem colSpan={12}>
                    <Heading as='h4' size='md'>Endereço</Heading>
                </GridItem>

                <GridItem colSpan={4}>
                    <InputPadrao label="País" required={true} value={pais} change={(e) => setPais(e.target.value)} />
                </GridItem>

                <GridItem colSpan={4}>
                    <InputPadrao label="UF" required={true} value={uf} change={(e) => setUf(e.target.value)}  />
                </GridItem>

                <GridItem colSpan={4}>
                    <InputPadrao label="Cidade" required={true} value={cidade} change={(e) => setCidade(e.target.value)}  />
                </GridItem>

                <GridItem colSpan={6}>
                    <InputPadrao label="Bairro" required={true} value={bairro} change={(e) => setBairro(e.target.value)}  />
                </GridItem>

                <GridItem colSpan={3}>
                    <InputPadrao label="CEP" required={true} mask="99999-999" value={cep} change={(e) => setCep(e.target.value)}  />
                </GridItem>
                
                <GridItem colSpan={3}>
                    <InputPadrao label="Número" value={numero} change={(e) => setNumero(e.target.value)} />
                </GridItem>

                <GridItem colSpan={12}>
                    <InputPadrao label="Complemento" value={complemento} change={(e) => setComplemento(e.target.value)}  />
                </GridItem>
            </Grid>

            <Flex gap={15} paddingTop={5}>
                <Box width="15%">
                    <BotaoSalvar acao={salvarCliente} />
                </Box>
            </Flex>
        </>
    );
}

export default CadastroCliente;