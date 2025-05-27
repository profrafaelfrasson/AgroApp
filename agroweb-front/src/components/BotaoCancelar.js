import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Botao from "./Botao";

export default function BotaoCancelar({
    acao, disabled
}) {
    return <Botao texto="Cancelar" 
                  icone={faXmark} 
                  acao={acao} 
                  cor="white" 
                  corTexto="black"
                  border="1px solid black"
                  disabled={disabled}/>
}