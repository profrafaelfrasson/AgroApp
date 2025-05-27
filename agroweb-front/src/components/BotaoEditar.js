import { faPencil } from "@fortawesome/free-solid-svg-icons";
import BotaoIcone from "./BotaoIcone";

export default function BotaoEditar({
    titulo, acao, disabled = false
}) {
    return <BotaoIcone titulo={titulo} acao={acao} disabled={disabled} icone={faPencil} />;
}