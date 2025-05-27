import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Botao from "./Botao";

export default function BotaoConfirmar({
    acao, disabled
}) {
    return <Botao texto="Confirmar" icone={faCheck} acao={acao} disabled={disabled}/>
}