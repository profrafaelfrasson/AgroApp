package br.unisul.agroweb.model.repository;

import br.unisul.agroweb.model.entity.Produto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProdutoRepository extends CrudRepository<Produto, Integer> {

    List<Produto> findAllByAtivoIsTrue();

    Optional<Produto> findByIdProdutoAndAtivoIsTrue(Integer idProduto);

    @Query("SELECT EXISTS(SELECT 1 FROM Produto produto WHERE produto.idProduto = :idProduto AND produto.quantidadeEstoque >= :quantidade)")
    boolean possuiEstoqueDisponivel(@Param("idProduto") Integer idProduto, @Param("quantidade") Integer quantidade);

}
