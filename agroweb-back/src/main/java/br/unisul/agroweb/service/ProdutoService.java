package br.unisul.agroweb.service;

import br.unisul.agroweb.model.dto.SalvarProdutoDTO;
import br.unisul.agroweb.model.entity.Produto;
import br.unisul.agroweb.model.repository.ProdutoRepository;
import jakarta.persistence.NoResultException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProdutoService {

    public ProdutoRepository produtoRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public ProdutoService(ProdutoRepository produtoRepository, ModelMapper modelMapper) {
        this.produtoRepository = produtoRepository;
        this.modelMapper = modelMapper;
    }

    public Produto buscarProdutoAtivo(Integer idProduto) {
        return produtoRepository.findByIdProdutoAndAtivoIsTrue(idProduto).orElseThrow(() -> new NoResultException("O produto informado não foi encontrado"));
    }

    public List<Produto> listarProdutosAtivos() {
        return produtoRepository.findAllByAtivoIsTrue();
    }

    public Produto salvarProduto(SalvarProdutoDTO produtoDTO) {
        var produto = modelMapper.map(produtoDTO, Produto.class);

        return salvarProduto(produto);
    }

    public Produto salvarProduto(Produto produto) {
        return produtoRepository.save(produto);
    }

    public Produto atualizarProduto(Integer idProduto, SalvarProdutoDTO produtoDTO) {
        produtoDTO.setIdProduto(idProduto);
        var produto = produtoRepository.findById(idProduto).orElseThrow(() -> new NoResultException("O produto informado não foi encontrado"));

        produtoDTO.setQuantidadeEstoque(produto.getQuantidadeEstoque());

        modelMapper.map(produtoDTO, produto);

        return produtoRepository.save(produto);
    }

    public void inativarProduto(Integer idProduto) {
        var produto = produtoRepository.findById(idProduto).orElseThrow(() -> new NoResultException("O produto informado não foi encontrado"));

        produto.setAtivo(false);

        produtoRepository.save(produto);
    }
}
