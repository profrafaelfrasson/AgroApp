import { IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BotaoIcone({
    titulo, icone, acao, disabled
}) {
    return (
        <IconButton bg='transparent'  
                    isDisabled={disabled}
                    aria-label={titulo}
                    title={titulo}
                    onClick={acao}
                    icon={<FontAwesomeIcon icon={icone}/>}/>
    );
}