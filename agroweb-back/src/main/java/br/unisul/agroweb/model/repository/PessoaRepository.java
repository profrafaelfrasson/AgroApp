package br.unisul.agroweb.model.repository;

import br.unisul.agroweb.model.entity.Pessoa;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PessoaRepository extends CrudRepository<Pessoa, Integer> {

    List<Pessoa> findAllByAtivoIsTrue();

    Optional<Pessoa> findByIdPessoaAndAtivoIsTrue(Integer idPessoa);

    Optional<Pessoa> findByCpf(String cpf);

}
