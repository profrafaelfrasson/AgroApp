package br.unisul.agroweb.model.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ErroDTO {

    private String message;
    private LocalDateTime timestamp;
    private List<String> details = new ArrayList<>();

    public ErroDTO(String message) {
        this.message = message;
        timestamp = LocalDateTime.now();
    }

    public ErroDTO(String message, LocalDateTime timestamp) {
        this.message = message;
        this.timestamp = timestamp;
    }

    public ErroDTO(String message, List<String> details, LocalDateTime timestamp) {
        this.message = message;
        this.details = details;
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public List<String> getDetails() {
        return details;
    }

    public void setDetails(List<String> details) {
        this.details = details;
    }
}
