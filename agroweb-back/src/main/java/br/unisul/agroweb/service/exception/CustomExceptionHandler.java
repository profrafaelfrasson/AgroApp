package br.unisul.agroweb.service.exception;

import br.unisul.agroweb.model.dto.ErroDTO;
import jakarta.persistence.NoResultException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(NoResultException.class)
    public ResponseEntity<ErroDTO> noResultExceptionHandler(NoResultException exception, WebRequest request) {
        var mensagem = exception.getMessage() != null ? exception.getMessage() : "O registro informado não foi encontrado";

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErroDTO(mensagem, LocalDateTime.now()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErroDTO> methodArgumentNotValidException(MethodArgumentNotValidException exception) {
        var campos = exception.getBindingResult().getFieldErrors();

        var detalhes = campos.stream().map(DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErroDTO("Formulário inválido", detalhes, LocalDateTime.now()));
    }
    
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErroDTO> businessExceptionHandler(BusinessException exception) {
        return ResponseEntity.status(exception.getMessageType().getHttpStatus()).body(exception.getErroDTO());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErroDTO> exceptionHandler() {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

}
