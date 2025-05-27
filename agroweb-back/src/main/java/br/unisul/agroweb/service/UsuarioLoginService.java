package br.unisul.agroweb.service;

import br.unisul.agroweb.model.entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UsuarioLoginService implements UserDetailsService {

    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioLoginService(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioService.mapearUsuarioParaUserDetails(username);
    }

    public Usuario obterUsuarioLogado() {
        var userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return usuarioService.buscarUsuarioPorLogin(userDetails.getUsername());
    }
}
