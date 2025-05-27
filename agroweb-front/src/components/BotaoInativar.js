import Botao from "./Botao";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

export default function BotaoInativar({acao}) {
    return (
        <Botao texto={"Inativar"} cor="#FF0000" icone={faMinus} acao={acao}/>
    );
}