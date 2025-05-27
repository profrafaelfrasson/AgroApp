import { useState } from "react";
import ModalPadrao from "../../../components/ModalPadrao";
import { Grid, GridItem, useToast } from "@chakra-ui/react";
import SelectList from "../../../components/SelectList";
import ProdutoService from "../../../services/produtoService";
import { useEffect } from "react";
import InputNumero from "../../../components/InputNumero";
import Botao from "../../../components/Botao";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import BotaoCancelar from "../../../components/BotaoCancelar";

function AdicionarProduto({
    modalAberto, fecharModal, adicionarVendaProduto, vendasProdutos
}) {
    return <ModalPadrao cabecalho="Adicionar produto" 
                        width="40vw"
                        aberto={modalAberto} 
                        acaoFechar={fecharModal}
                        children={<Conteudo fecharModal={fecharModal} adicionarVendaProduto={adicionarVendaProduto} vendasProdutos={vendasProdutos}/>}/>
}

function Conteudo({fecharModal: fecharModal, adicionarVendaProduto, vendasProdutos}) {
    const [produtos, setProdutos] = useState([]);
    const [idProdutoSelecionado, setIdProdutoSelecionado] = useState();
    const [quantidade, setQuantidade] = useState(1);

    const toast = useToast();

    useEffect(() => {
        consultarProdutos();
    }, []);

    const mensagemErro = (erro) => {
        toast({
            title: erro,
            status: "error",
            position: "top",
            duration: 5000,
            isClosable: true
        });
    }

    function mapearProdutosParaSelectItem() {
        return produtos.map((produto) => {
            return {
                label: produto.nome,
                valor: produto.idProduto
            };
        })
    }

    function consultarProdutos() {
        ProdutoService.consultarProdutos().then((response) => {
            setProdutos(response);
        }).catch((err) => {
            console.log(err);
        })
    }

    function adicionarProduto() {
        var valido = true;
        if (idProdutoSelecionado == null || idProdutoSelecionado === "") {
            mensagemErro("O produto deve ser selecionado")
            valido = false;
        }

        if (quantidade == null || quantidade <= 0) {
            mensagemErro("Uma quantidade maior que zero deve ser inserida");
            valido = false;
        }

        if (!valido) {
            return;
        }

        ProdutoService.consultarDisponibilidadeEstoque(idProdutoSelecionado, quantidade).then((response) => {
            if (response.data) {
                var produto = produtos.find(item => {return item.idProduto == idProdutoSelecionado});

                if (vendasProdutos.some(item => item.produto.idProduto === produto.idProduto)) {
                    mensagemErro("O produto " + produto.nome + " já foi adicionado.");
                    return;
                }

                var vendaProduto = {
                    quantidade: quantidade,
                    valorUnitario: produto.valor,
                    produto: produto
                }

                adicionarVendaProduto(vendaProduto);
                return;
            }

            mensagemErro("O produto selecionado não possui estoque disponível");
        }).catch((err) => {
            console.log(err);
            mensagemErro("Não foi possível consultar o estoque disponível do produto. Tente novamente mais tarde.");
        })
    }

    return (
        <>
            <Grid templateColumns='repeat(12, 1fr)' gap={6}>
                <GridItem colSpan={6}>
                    <SelectList label='Produto' 
                                required
                                valores={mapearProdutosParaSelectItem()}
                                value={idProdutoSelecionado} 
                                change={(e) => {setIdProdutoSelecionado(e.target.value)}} />
                </GridItem>

                <GridItem colSpan={6}>
                    <InputNumero label='Quantidade' required value={quantidade} change={(e) => {setQuantidade(e.target.value)}}/>
                </GridItem>

                <GridItem colSpan={6}>
                    <Botao texto="Adicionar" icone={faPlus} acao={adicionarProduto}/>
                </GridItem>

                <GridItem colSpan={6}>
                    <BotaoCancelar acao={fecharModal} />
                </GridItem>

            </Grid>
        </>
    );
}

export default AdicionarProduto;