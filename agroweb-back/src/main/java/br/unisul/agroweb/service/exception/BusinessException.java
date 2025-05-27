package br.unisul.agroweb.service.exception;

import br.unisul.agroweb.model.dto.ErroDTO;


public class BusinessException extends RuntimeException {

    private final MessageType messageType;
    private final ErroDTO erroDTO;

    public BusinessException(MessageType messageType, String message) {
        this.messageType = messageType;
        this.erroDTO = new ErroDTO(message);
    }

    public MessageType getMessageType() {
        return messageType;
    }

    public ErroDTO getErroDTO() {
        return erroDTO;
    }
}
