package br.unisul.agroweb.model.repository;

import br.unisul.agroweb.model.entity.HistoricoEntradaProduto;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoricoEntradaProdutoRepository extends CrudRepository<HistoricoEntradaProduto, Integer> {

    List<HistoricoEntradaProduto> findAllByProdutoIdProduto(Integer idProduto);
}
