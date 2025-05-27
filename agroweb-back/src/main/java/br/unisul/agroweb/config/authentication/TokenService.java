package br.unisul.agroweb.config.authentication;

import br.unisul.agroweb.model.dto.AutenticacaoRetornoDTO;
import br.unisul.agroweb.model.entity.dto.PessoaDTO;
import br.unisul.agroweb.service.UsuarioService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class TokenService {

    @Value("${jwt.secret}")
    private String chave;

    @Value("${jwt.expiration}")
    private String expiracao;

    private final UsuarioService usuarioService;

    @Autowired
    public TokenService(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    public AutenticacaoRetornoDTO gerarToken(Authentication autenticacao) {
        var usuarioDTO = (UserDetails) autenticacao.getPrincipal();

        var usuario = usuarioService.buscarUsuarioPorLogin(usuarioDTO.getUsername());

        var dataAtual = new Date();
        var dataExpiracao = new Date(dataAtual.getTime() + Long.parseLong(expiracao));

        var token =  Jwts.builder().setIssuer("AgroWeb")
                         .setSubject(usuario.getIdUsuario().toString())
                         .setIssuedAt(dataAtual)
                         .setExpiration(dataExpiracao)
                         .signWith(converterChave())
                         .compact();

        return new AutenticacaoRetornoDTO(token, new PessoaDTO(usuario.getPessoa()));
    }

    public String obterToken(HttpServletRequest request) {
        var bearerToken = request.getHeader("Authorization");

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }

    public Integer obterIdUsuarioDeToken(String token) {
        var idUsuario = Jwts.parserBuilder().setSigningKey(converterChave()).build().parseClaimsJws(token).getBody().getSubject();

        return idUsuario != null ? Integer.valueOf(idUsuario) : null;
    }

    public boolean validarToken(String token) {
        try {
            if (!StringUtils.hasText(token)) {
                return false;
            }

            Jwts.parserBuilder().setSigningKey(converterChave()).build().parseClaimsJws(token);
            return true;
        } catch (Exception excecao) {
            throw new AuthenticationCredentialsNotFoundException("Token inválido");
        }
    }

    private Key converterChave() {
        byte[] bytes = chave.getBytes(StandardCharsets.UTF_8);

        return Keys.hmacShaKeyFor(bytes);
    }

}
