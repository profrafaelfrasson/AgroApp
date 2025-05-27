import { Grid, GridItem, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import ModalPadrao from "../../../components/ModalPadrao";
import { useEffect, useState } from "react";
import HistoricoEntradaService from "../../../services/historicoEntradaService";
import { HistoricoEntradaModel } from "../../../model/HistoricoEntradaModel";
import DetalhesMensagem from "../../../components/DetalhesMensagem";
import DateUtils from "../../../util/dateUtils";
import Botao from "../../../components/Botao";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import RegistroEntrada from "./RegistroEntrada";

function HistoricoEntrada({
    modalAberto,
    fecharModal,
    idProduto
}) {
    return <ModalPadrao cabecalho="Histórico de entrada"
                        aberto={modalAberto}
                        acaoFechar={fecharModal}
                        width="60vw" center
                        children={<Conteudo idProduto={idProduto}/>}/>
}

function Conteudo({idProduto}) {
    const [modalRegistroEntradaAberto, setModalRegistroEntradaAberto] = useState(false);
    const [historicoEntrada, setHistoricoEntrada] = useState([]);

    useEffect(() => {consultarHistoricoEntrada()}, []);

    const toast = useToast();

    const mensagemErro = (descricao) => {
        toast({
            title: "Ocorreu um erro ao consultar o histórico de entrada do produto",
            description: <DetalhesMensagem detalhes={descricao} />,
            status: "error",
            position: "top",
            duration: 5000,
            isClosable: true
        })
    }

    const consultarHistoricoEntrada = async () => {
        HistoricoEntradaService.consultarHistoricoEntrada(idProduto).then((response) => {
            var historico = response.data.map((item) => new HistoricoEntradaModel(item));

            setHistoricoEntrada(historico);
        }).catch((err) => {
            mensagemErro(err.response.data.details);
        })
    }

    const abrirModalRegistroEntrada = (e) => {
        e.preventDefault();
        setModalRegistroEntradaAberto(true);
    }

    const fecharModalRegistroEntrada = () => {
        consultarHistoricoEntrada();
        setModalRegistroEntradaAberto(false);
    }
    
    return(
        <>
            <RegistroEntrada modalAberto={modalRegistroEntradaAberto} fecharModal={fecharModalRegistroEntrada} idProduto={idProduto}/>

            <Grid templateColumns='repeat(12, 1fr)' gap={6}>
                <GridItem colSpan={12}>
                    {historicoEntrada.length === 0
                        ?  <Text>Nenhum registro de entrada encontrado</Text>
                        :  <TableContainer bg={'white'} padding='10px'>
                                <Table variant='simple' size='lg'>
                                    <Thead>
                                        <Tr>
                                            <Th>Código</Th>
                                            <Th>Data</Th>
                                            <Th>Quantidade</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {historicoEntrada.map((registroEntrada, index) => (
                                            <Tr key={index}>
                                                <Td>
                                                    {registroEntrada.idHistoricoEntradaProduto}
                                                </Td>
                                                <Td>
                                                    {DateUtils.formatarData(registroEntrada.data)}
                                                </Td>
                                                <Td>
                                                    {registroEntrada.quantidade}
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                    }
                </GridItem>

                <GridItem colSpan={4}>
                    <Botao texto="Adicionar entrada" icone={faPlus} acao={abrirModalRegistroEntrada}/>
                </GridItem>
            </Grid>
        </>
    );
}

export default HistoricoEntrada;