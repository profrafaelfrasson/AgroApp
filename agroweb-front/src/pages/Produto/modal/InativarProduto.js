import { Grid, GridItem, Text, useToast } from "@chakra-ui/react";
import ModalPadrao from "../../../components/ModalPadrao";
import BotaoConfirmar from "../../../components/BotaoConfirmar";
import BotaoCancelar from "../../../components/BotaoCancelar";
import ProdutoService from "../../../services/produtoService";
import DetalhesMensagem from "../../../components/DetalhesMensagem";

function InativarProduto({
    modalAberto,
    fecharModal,
    produto
}) {
    return <ModalPadrao cabecalho="Inativar produto" 
                        aberto={modalAberto} 
                        fecharModal={fecharModal} 
                        width="30vw"
                        children={<Conteudo produto={produto} fecharModal={fecharModal}/>}/>;
}

function Conteudo({produto, fecharModal}) {
    const toast = useToast();

    const mensagemErro = (descricao) => {
        toast({
            title: "Ocorreu um erro ao inativar o produto",
            description: <DetalhesMensagem detalhes={descricao} />,
            status: "error",
            position: "top",
            duration: 5000,
            isClosable: true
        })
    }

    const mensagemSucesso = () => {
        toast({
            title: "Produto inativado com sucesso",
            status: "success",
            position: "top",
            duration: 1000,
            isClosable: true
        })
    }
    
    const inativarProduto = async (e) => {
        e.preventDefault();

        ProdutoService.inativarProduto(produto.idProduto).then(() => {
            mensagemSucesso();
            fecharModal();
        }).catch((err) => {
            mensagemErro(err.response.data.details);
        })
    }

    return(
        <>
            <Grid templateColumns='repeat(12, 1fr)' gap={6}>
                <GridItem colSpan={12}>
                    <Text>
                        Deseja realmente inativar o produto <strong>{produto.nome}</strong>? A ação não poderá ser desfeita.
                    </Text>
                </GridItem>

                <GridItem colSpan={6}>
                    <BotaoConfirmar acao={inativarProduto} />
                </GridItem>

                <GridItem colSpan={6}>
                    <BotaoCancelar acao={fecharModal}/>
                </GridItem>
            </Grid>
        </>
    )
}

export default InativarProduto;