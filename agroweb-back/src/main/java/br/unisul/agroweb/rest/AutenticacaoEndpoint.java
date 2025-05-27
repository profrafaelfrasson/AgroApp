package br.unisul.agroweb.rest;

import br.unisul.agroweb.model.dto.AutenticacaoRetornoDTO;
import br.unisul.agroweb.model.entity.dto.UsuarioDTO;
import br.unisul.agroweb.service.AutenticacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AutenticacaoEndpoint {

    private final AutenticacaoService autenticacaoService;

    @Autowired
    public AutenticacaoEndpoint(AutenticacaoService autenticacaoService) {
        this.autenticacaoService = autenticacaoService;
    }

    @PostMapping
    public ResponseEntity<AutenticacaoRetornoDTO> autenticar(@RequestBody UsuarioDTO usuarioDTO) {
        return ResponseEntity.ok(autenticacaoService.login(usuarioDTO));
    }
}
