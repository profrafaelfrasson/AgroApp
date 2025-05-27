package br.unisul.agroweb.config.authentication;

import br.unisul.agroweb.service.UsuarioService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioService usuarioService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        var token = tokenService.obterToken(request);

        if (tokenService.validarToken(token)) {
            var idUsuario = tokenService.obterIdUsuarioDeToken(token);

            var usuario = usuarioService.mapearUsuarioParaUserDetails(idUsuario);

            var tokenAutenticacao = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());
            tokenAutenticacao.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(tokenAutenticacao);
        }

        filterChain.doFilter(request, response);
    }
}
