package br.unisul.agroweb.service;

import br.unisul.agroweb.model.dto.RegistroEntradaProdutoDTO;
import br.unisul.agroweb.model.entity.Produto;
import br.unisul.agroweb.model.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EstoqueProdutoService {

    private final ProdutoService produtoService;
    private final ProdutoRepository produtoRepository;
    private final HistoricoEntradaProdutoService historicoEntradaProdutoService;

    @Autowired
    public EstoqueProdutoService(ProdutoService produtoService, HistoricoEntradaProdutoService historicoEntradaProdutoService, ProdutoRepository produtoRepository) {
        this.produtoService = produtoService;
        this.historicoEntradaProdutoService = historicoEntradaProdutoService;
        this.produtoRepository = produtoRepository;
    }

    public void registrarEntrada(Integer idProduto, RegistroEntradaProdutoDTO registroEntradaProdutoDTO) {
        var produto = produtoService.buscarProdutoAtivo(idProduto);

        historicoEntradaProdutoService.registrarEntrada(produto, registroEntradaProdutoDTO);

        produto.setQuantidadeEstoque(produto.getQuantidadeEstoque() + registroEntradaProdutoDTO.getQuantidade());

        produtoService.salvarProduto(produto);
    }

    public void subtrairEstoque(Produto produto, Integer quantidade) {
        produto.setQuantidadeEstoque(produto.getQuantidadeEstoque() - quantidade);

        produtoService.salvarProduto(produto);
    }

    public boolean possuiEstoqueDisponivel(Integer idProduto, Integer quantidade) {
        return produtoRepository.possuiEstoqueDisponivel(idProduto, quantidade);
    }

}
