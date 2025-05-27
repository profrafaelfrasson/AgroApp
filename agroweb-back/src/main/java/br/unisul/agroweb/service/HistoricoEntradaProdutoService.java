package br.unisul.agroweb.service;

import br.unisul.agroweb.model.dto.RegistroEntradaProdutoDTO;
import br.unisul.agroweb.model.entity.HistoricoEntradaProduto;
import br.unisul.agroweb.model.entity.Produto;
import br.unisul.agroweb.model.repository.HistoricoEntradaProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class HistoricoEntradaProdutoService {

    private final HistoricoEntradaProdutoRepository historicoEntradaProdutoRepository;

    @Autowired
    public HistoricoEntradaProdutoService(HistoricoEntradaProdutoRepository historicoEntradaProdutoRepository) {
        this.historicoEntradaProdutoRepository = historicoEntradaProdutoRepository;
    }

    public List<HistoricoEntradaProduto> listarHistoricoEntradaPorProduto(Integer idProduto) {
        return historicoEntradaProdutoRepository.findAllByProdutoIdProduto(idProduto);
    }

    public void registrarEntrada(Produto produto, RegistroEntradaProdutoDTO registroEntradaProdutoDTO) {
        var historico = new HistoricoEntradaProduto(produto, registroEntradaProdutoDTO.getQuantidade(), registroEntradaProdutoDTO.getDataEntrada());

        historicoEntradaProdutoRepository.save(historico);
    }
}
