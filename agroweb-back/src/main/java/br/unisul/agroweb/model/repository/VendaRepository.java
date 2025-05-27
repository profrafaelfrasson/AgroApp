package br.unisul.agroweb.model.repository;

import br.unisul.agroweb.model.entity.Venda;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VendaRepository extends CrudRepository<Venda, Integer> {

    boolean existsByCanceladaIsFalseAndDataPagamentoIsNullAndClienteIdPessoa(Integer idPessoa);

    Optional<Venda> findByIdVendaAndCanceladaIsFalse(Integer idVenda);

    @Query(" SELECT venda FROM Venda venda "
         + "   JOIN venda.produtos produto "
         + " WHERE (:idPessoa IS NULL OR venda.cliente.idPessoa = :idPessoa) "
         + "   AND (:idProduto IS NULL OR produto.vendaProdutoPK.produto.idProduto = :idProduto) "
         + "   AND (:situacaoPagamento = 'TODOS' OR (:situacaoPagamento = 'EM_ABERTO' AND venda.dataPagamento IS NULL) OR (:situacaoPagamento = 'PAGO' AND venda.dataPagamento IS NOT NULL)) "
         + "   AND venda.cancelada = FALSE "
         + " ORDER BY venda.idVenda DESC ")
    List<Venda> findAll(@Param("idPessoa") Integer idPessoa, @Param("idProduto") Integer idProduto, @Param("situacaoPagamento") String situacaoPagamento);
}
