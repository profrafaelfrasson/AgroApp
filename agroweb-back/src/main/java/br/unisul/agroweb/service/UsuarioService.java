package br.unisul.agroweb.service;

import br.unisul.agroweb.model.entity.Usuario;
import br.unisul.agroweb.model.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public User mapearUsuarioParaUserDetails(Integer idUsuario) {
        var usuario = usuarioRepository.findById(idUsuario).orElseThrow(IllegalArgumentException::new);

        return mapearUsuarioParaUserDetails(usuario);
    }

    public User mapearUsuarioParaUserDetails(String login) {
        var usuario = buscarUsuarioPorLogin(login);

        return mapearUsuarioParaUserDetails(usuario);
    }

    public User mapearUsuarioParaUserDetails(Usuario usuario) {
        return new User(usuario.getLogin(), usuario.getSenha(), List.of(new SimpleGrantedAuthority("ALL")));
    }

    public Usuario buscarUsuarioPorLogin(String login) {
        return usuarioRepository.findByLogin(login).orElseThrow(() -> new UsernameNotFoundException("Nome de usuário não encontrado"));
    }
}
