package br.unisul.agroweb.model.repository;

import br.unisul.agroweb.model.entity.Usuario;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UsuarioRepository extends CrudRepository<Usuario, Integer> {

    Optional<Usuario> findByLogin(String login);

}
