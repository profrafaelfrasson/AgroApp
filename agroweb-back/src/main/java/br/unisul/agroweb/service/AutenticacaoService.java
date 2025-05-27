package br.unisul.agroweb.service;

import br.unisul.agroweb.config.authentication.TokenService;
import br.unisul.agroweb.model.dto.AutenticacaoRetornoDTO;
import br.unisul.agroweb.model.entity.dto.UsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AutenticacaoService {

    private final AuthenticationManager authenticationManager;

    private final TokenService tokenService;

    @Autowired
    public AutenticacaoService(AuthenticationManager authenticationManager, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    public AutenticacaoRetornoDTO login(UsuarioDTO usuarioDTO) {
        var autenticacao = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(usuarioDTO.getLogin(), usuarioDTO.getSenha()));

        SecurityContextHolder.getContext().setAuthentication(autenticacao);

        return tokenService.gerarToken(autenticacao);
    }
}
