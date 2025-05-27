import { Divider, Grid, GridItem, useToast, TableContainer, Table, Tbody, Td, Th, Thead, Tfoot, Tr } from "@chakra-ui/react";
import ModalPadrao from "../../../components/ModalPadrao";
import { useEffect, useState } from "react";
import ClienteService from "../../../services/clienteService";
import SelectList from "../../../components/SelectList";
import VendaService from "../../../services/vendaService";
import { formasPagamentoType } from "../../../model/types/FormaPagamentoType";
import SelectCheckbox from "../../../components/SelectCheckbox";
import Botao from "../../../components/Botao";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import AdicionarProduto from "./AdicionarProduto";
import NumberUtils from "../../../util/numberUtil";
import BotaoIcone from "../../../components/BotaoIcone";
import BotaoSalvar from "../../../components/BotaoSalvar";
import DetalhesMensagem from "../../../components/DetalhesMensagem";

function CadastroVenda({
    modalAberto,
    fecharModal
}) {
    return <ModalPadrao cabecalho="Cadastro de venda" aberto={modalAberto} acaoFechar={fecharModal} children={<Conteudo fecharModal={fecharModal}/>}/>;
}

function Conteudo({fecharModal}) {
    const [modalAdicionarProdutoAberto, setModalAdicionarProdutoAberto] = useState(false);

    const [vendasProdutos, setVendasProdutos] = useState([]);

    const [clientes, setClientes] = useState([]);
    const [idClienteSelecionado, setIdClienteSelecionado] = useState();
    const [formaPagamento, setFormaPagamento] = useState();
    const [crediario, setCrediario] = useState(false);

    const toast = useToast();

    useEffect(() => {
        ClienteService.consultarClientes().then((response) => setClientes(response));
    }, []);

    const mensagemErro = (descricao) => {
        toast({
            title: "Ocorreu um erro ao salvar a venda",
            description: <DetalhesMensagem detalhes={descricao} />,
            status: "error",
            position: "top",
            duration: 5000,
            isClosable: true
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

    function selecionarCliente(idCliente) {
        if (idCliente === "") {
            setIdClienteSelecionado();
            return;
        }

        VendaService.consultarPossuiPagamentoEmAberto(idCliente).then((response) => {
            if (response.data) {
                idCliente = "";

                toast({
                    title: "O cliente selecionado possui pagamentos em aberto",
                    status: "error",
                    position: "top",
                    duration: 5000,
                    isClosable: true
                })
            }

            setIdClienteSelecionado(idCliente);
        }).catch((err) => {
            alert('erro');
            console.log(err);
        });
    }

    function desabilitarFormulario() {
        return idClienteSelecionado === "" || idClienteSelecionado == null;
    }

    function abrirModalAdicionarProduto() {
        setModalAdicionarProdutoAberto(true);
    }

    function adicionarVendaProduto(vendaProduto) {
        fecharModalAdicionarProduto();
        setVendasProdutos(vendasProdutos => [...vendasProdutos, vendaProduto]);
    }

    function fecharModalAdicionarProduto() {
        setModalAdicionarProdutoAberto(false);
    }

    function removerProduto(vendaProduto) {
        setVendasProdutos(vendasProdutos.filter(item => item !== vendaProduto));
    }

    function valorTotal() {
        return vendasProdutos.reduce((total, venda) => {
            return total += venda.valorUnitario * venda.quantidade;
        }, 0);
    }
    
    function salvarVenda() {
        var dados = {
            idCliente: idClienteSelecionado,
            crediario: crediario,
            formaPagamento: formaPagamento,
            vendasProdutos: vendasProdutos
        }

        VendaService.salvar(dados).then(() => {
            fecharModal();

            toast({
                title: "Venda cadastrada com sucesso.", 
                status: "success",
                position: "top",
                duration: 3000,
                isClosable: true
            });
        }).catch((err) => {
            mensagemErro(err.response.data.details);
        })
    }

    return (
        <>
            <AdicionarProduto modalAberto={modalAdicionarProdutoAberto} fecharModal={fecharModalAdicionarProduto} adicionarVendaProduto={adicionarVendaProduto} vendasProdutos={vendasProdutos}/>

            <Grid templateColumns='repeat(12, 1fr)' gap={6}>
                <GridItem colSpan={5}>
                    <SelectList label='Cliente' 
                                valores={mapearClientesParaSelectItem()}
                                value={idClienteSelecionado} 
                                change={(e) => {selecionarCliente(e.target.value)}} />
                </GridItem>

                <GridItem colSpan={5}>
                    <SelectList label='Forma de pagamento' 
                                disabled={desabilitarFormulario()}
                                valores={formasPagamentoType}
                                value={formaPagamento} 
                                change={(e) => {setFormaPagamento(e.target.value)}} />
                </GridItem>

                <GridItem colSpan={2}>
                    <SelectCheckbox label='Crediário' 
                                    disabled={desabilitarFormulario()}
                                    value={crediario} 
                                    change={(e) => {setCrediario(e.target.checked)}}/>
                </GridItem>

                <GridItem colSpan={12}>
                    <Divider />
                </GridItem>

                <GridItem colSpan={3}>
                    <Botao texto="Adicionar produto"
                           disabled={desabilitarFormulario()} 
                           icone={faPlus} 
                           acao={abrirModalAdicionarProduto}/>
                </GridItem>

                <GridItem colSpan={12}>
                    <TableContainer>
                        <Table variant='simple' size='lg'>
                            <Thead> 
                                <Tr>
                                    <Th width="10%">Ação</Th>
                                    <Th width="10%">Código</Th>
                                    <Th width="40%">Produto</Th>
                                    <Th width="10%">Qtd.</Th>
                                    <Th>Valor un.</Th>
                                    <Th>Sub total</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {vendasProdutos.map((vendaProduto, index) => (
                                    <Tr key={index}>
                                        <Td><BotaoIcone icone={faTrash} acao={() => removerProduto(vendaProduto)}/></Td>
                                        <Td>{vendaProduto.produto.idProduto}</Td>
                                        <Td>{vendaProduto.produto.nome}</Td>
                                        <Td>{vendaProduto.quantidade}</Td>
                                        <Td>{NumberUtils.converterParaReal(vendaProduto.valorUnitario)}</Td>
                                        <Td>{NumberUtils.converterParaReal(vendaProduto.valorUnitario * vendaProduto.quantidade)}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th colSpan='6' textAlign='center'> Valor total: {NumberUtils.converterParaReal(valorTotal())}</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </GridItem>

                <GridItem colSpan={3}>
                    <BotaoSalvar acao={salvarVenda} disabled={desabilitarFormulario()}/>
                </GridItem>

            </Grid>
        </>
    );
}

export default CadastroVenda;