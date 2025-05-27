import { faBan } from "@fortawesome/free-solid-svg-icons";
import BotaoIcone from "./BotaoIcone";

export default function BotaoRemover({
    titulo, acao, disabled
}) {
    return <BotaoIcone titulo={titulo} acao={acao} disabled={disabled} icone={faBan}/>
}