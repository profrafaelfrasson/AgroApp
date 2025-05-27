import Botao from "./Botao";
import { faSave } from "@fortawesome/free-solid-svg-icons";

export default function BotaoSalvar({acao, disabled}) {
    return (
        <Botao texto={"Salvar"} icone={faSave} acao={acao} disabled={disabled}/>
    );
}