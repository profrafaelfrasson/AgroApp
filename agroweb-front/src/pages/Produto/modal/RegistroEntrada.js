import { Grid, GridItem, useToast } from "@chakra-ui/react";
import ModalPadrao from "../../../components/ModalPadrao";
import DatePicker from "../../../components/DatePicker";
import { useState } from "react";
import InputNumero from "../../../components/InputNumero";
import BotaoCancelar from "../../../components/BotaoCancelar";
import BotaoSalvar from "../../../components/BotaoSalvar";
import HistoricoEntradaService from "../../../services/historicoEntradaService";
import DetalhesMensagem from "../../../components/DetalhesMensagem";

function RegistroEntrada({
    modalAberto, fecharModal, idProduto
}) {
    return (
        <>
            <ModalPadrao aberto={modalAberto} 
                        acaoFechar={fecharModal} 
                        cabecalho="Registro de entrada" 
                        width="40vw"
                        children={<Conteudo fecharModal={fecharModal} idProduto={idProduto}/>} />    
        </>
    );
}

function Conteudo({
    fecharModal, idProduto
}) {
    const [dataEntrada, setDataEntrada] = useState(new Date());
    const [quantidade, setQuantidade] = useState(0);

    const toast = useToast();

    const mensagemSucesso = () => {
        toast({
            title: "Entrada registrada com sucesso.", 
            status: "success",
            position: "top",
            duration: 5000,
            isClosable: true
        })
    }

    const mensagemErro = (response) => {
        toast({
            title: "Ocorreu um erro ao consultar o histórico de entrada do produto",
            description: <DetalhesMensagem mensagem={response.data.message} detalhes={response.data.details} />,
            status: "error",
            position: "top",
            duration: 5000,
            isClosable: true
        })
    }

    const registrarEntrada = (e) => {
        e.preventDefault();

        HistoricoEntradaService.registrarEntradaProduto(idProduto, quantidade, dataEntrada).then(() => {
            fecharModal();
            mensagemSucesso();
        }).catch((err) => {
            mensagemErro(err.response)
        })
    }

    return (
        <>
            <Grid templateColumns='repeat(12, 1fr)' gap={6}>
                <GridItem colSpan={6}>
                    <DatePicker label="Data de entrada" value={dataEntrada} required change={setDataEntrada}/>
                </GridItem>

                <GridItem colSpan={6}>
                    <InputNumero label="Quantidade" value={quantidade} required change={(e) => {setQuantidade(e.target.value)}} />
                </GridItem>

                <GridItem colSpan={4}>
                    <BotaoSalvar acao={registrarEntrada}/>
                </GridItem>

                <GridItem colSpan={4}>
                    <BotaoCancelar acao={fecharModal}/>
                </GridItem>
            </Grid>
        </>
    );
}

export default RegistroEntrada;