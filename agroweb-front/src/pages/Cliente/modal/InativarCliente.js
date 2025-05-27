import { Grid, GridItem, Text, useToast } from "@chakra-ui/react";
import ModalPadrao from "../../../components/ModalPadrao";
import BotaoConfirmar from "../../../components/BotaoConfirmar";
import BotaoCancelar from "../../../components/BotaoCancelar";
import ClienteService from "../../../services/clienteService";
import DetalhesMensagem from "../../../components/DetalhesMensagem";

function InativarCliente({
    modalAberto,
    fecharModal,
    cliente
}) {
    return <ModalPadrao cabecalho="Inativar cliente" 
                        aberto={modalAberto} 
                        acaoFechar={fecharModal} 
                        width="30vw"
                        children={<Conteudo cliente={cliente} fecharModal={fecharModal} />}/>;
}

function Conteudo({cliente, fecharModal}) {
    const toast = useToast();

    const mensagemErro = (descricao) => {
        toast({
            title: "Ocorreu um erro ao inativar o cliente",
            description: <DetalhesMensagem detalhes={descricao} />,
            status: "error",
            position: "top",
            duration: 5000,
            isClosable: true
        })
    }

    const mensagemSucesso = () => {
        toast({
            title: "Cliente inativado com sucesso",
            status: "success",
            position: "top",
            duration: 1000,
            isClosable: true
        })
    }
    
    const inativarCliente = async (e) => {
        e.preventDefault();

        ClienteService.inativarCliente(cliente.idPessoa)
        .then(() => {
            fecharModal();
            mensagemSucesso();
        }).catch((err) => {
            mensagemErro(err.response.data.details);
        })
    }

    return(
        <>
            <Grid templateColumns='repeat(12, 1fr)' gap={6}>
                <GridItem colSpan={12}>
                    <Text>
                        Deseja realmente inativar o cliente <strong>{cliente.nome}</strong>? A ação não poderá ser desfeita.
                    </Text>
                </GridItem>

                <GridItem colSpan={6}>
                    <BotaoConfirmar acao={inativarCliente} />
                </GridItem>

                <GridItem colSpan={6}>
                    <BotaoCancelar acao={fecharModal}/>
                </GridItem>
            </Grid>
        </>
    )
}

export default InativarCliente;