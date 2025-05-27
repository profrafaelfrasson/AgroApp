import { Grid, GridItem, useToast } from "@chakra-ui/react";
import ModalPadrao from "../../../components/ModalPadrao";
import DatePicker from "../../../components/DatePicker";
import { useState } from "react";
import BotaoSalvar from "../../../components/BotaoSalvar";
import VendaService from "../../../services/vendaService";
import DetalhesMensagem from "../../../components/DetalhesMensagem";
import { VendaModel } from "../../../model/VendaModel";

function AtualizarPagamento({
    venda,
    atualizarVenda,
    modalAberto,
    fecharModal
}) {
    return <ModalPadrao cabecalho="Atualizar data de pagamento" 
                        width="300px" 
                        aberto={modalAberto} 
                        acaoFechar={fecharModal} 
                        children={<Conteudo venda={venda} 
                                            acaoFechar={fecharModal}/>}
            />;
}

function Conteudo({venda, acaoFechar}) {

    const [dataPagamento, setDataPagamento] = useState();
    const toast = useToast();
    
    const mensagemSucesso = () => {
        toast({
            title: "Data de pagamento atualizada com sucesso.", 
            status: "success",
            position: "top",
            duration: 1000,
            isClosable: true
        })
    }

    const mensagemErro = (response) => {
        toast({
            title: "Ocorreu um erro ao atualizar a data de pagamento",
            description: <DetalhesMensagem mensagem={response.data.message} detalhes={response.data.details} />,
            status: "error",
            position: "top",
            duration: 5000,
            isClosable: true
        })
    }

    const salvarDataPagamento = async (e) => {
        e.preventDefault();

        try {
            VendaService.atualizarDataPagamento(venda.idVenda, dataPagamento).then((response) => {
                mensagemSucesso();
                acaoFechar();
            }).catch((err) => {
                console.log(err.response);
                mensagemErro(err.response);
                acaoFechar();
            });   
        } catch (error) {
            
        }
    }

    return (
        <>
            <Grid templateColumns='repeat(12, 1fr)' gap={6}>
                <GridItem colSpan={12}>
                    <DatePicker label="Data de pagamento" value={dataPagamento} required change={setDataPagamento}/>
                </GridItem>
                <GridItem>
                    <BotaoSalvar acao={salvarDataPagamento} />
                </GridItem>
            </Grid>
        </>
    );
}

export default AtualizarPagamento;