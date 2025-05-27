package br.unisul.agroweb.rest;

import br.unisul.agroweb.model.dto.RegistroEntradaProdutoDTO;
import br.unisul.agroweb.model.dto.SalvarProdutoDTO;
import br.unisul.agroweb.model.entity.dto.HistoricoEntradaProdutoDTO;
import br.unisul.agroweb.model.entity.dto.ProdutoDTO;
import br.unisul.agroweb.service.EstoqueProdutoService;
import br.unisul.agroweb.service.HistoricoEntradaProdutoService;
import br.unisul.agroweb.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("produto")
public class ProdutoEndpoint {

    public ProdutoService produtoService;

    public HistoricoEntradaProdutoService historicoEntradaProdutoService;

    public EstoqueProdutoService estoqueProdutoService;

    @Autowired
    public ProdutoEndpoint(ProdutoService produtoService, HistoricoEntradaProdutoService historicoEntradaProdutoService, EstoqueProdutoService estoqueProdutoService) {
        this.produtoService = produtoService;
        this.historicoEntradaProdutoService = historicoEntradaProdutoService;
        this.estoqueProdutoService = estoqueProdutoService;
    }

    @GetMapping("/{idProduto}")
    ProdutoDTO buscarProduto(@PathVariable Integer idProduto) {
        return new ProdutoDTO(produtoService.buscarProdutoAtivo(idProduto));
    }

    @GetMapping
    List<ProdutoDTO> listarProdutosAtivos() {
        var produtos = produtoService.listarProdutosAtivos();

        return produtos.stream().map(ProdutoDTO::new).collect(Collectors.toList());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    ProdutoDTO salvar(@RequestBody @Valid SalvarProdutoDTO produtoDTO) {
        var produto = produtoService.salvarProduto(produtoDTO);

        return new ProdutoDTO(produto);
    }

    @PutMapping("/{idProduto}")
    ProdutoDTO atualizar(@PathVariable Integer idProduto, @RequestBody @Valid SalvarProdutoDTO produtoDTO) {
        var produto = produtoService.atualizarProduto(idProduto, produtoDTO);

        return new ProdutoDTO(produto);
    }

    @DeleteMapping("/{idProduto}")
    void inativar(@PathVariable Integer idProduto) {
        produtoService.inativarProduto(idProduto);
    }

    @GetMapping("/{idProduto}/estoque/entrada")
    List<HistoricoEntradaProdutoDTO> listarHistoricoEntradaPorProduto(@PathVariable Integer idProduto) {
        var entradas = historicoEntradaProdutoService.listarHistoricoEntradaPorProduto(idProduto);

        return entradas.stream().map(HistoricoEntradaProdutoDTO::new).collect(Collectors.toList());
    }

    @PutMapping("/{idProduto}/estoque/entrada")
    void registrarEntradaProduto(@PathVariable Integer idProduto, @RequestBody @Valid RegistroEntradaProdutoDTO registroEntradaProdutoDTO) {
        estoqueProdutoService.registrarEntrada(idProduto, registroEntradaProdutoDTO);
    }

    @GetMapping("/{idProduto}/estoque/{quantidade}")
    boolean possuiEstoqueDisponivel(@PathVariable Integer idProduto, @PathVariable Integer quantidade) {
        return estoqueProdutoService.possuiEstoqueDisponivel(idProduto, quantidade);
    }
}
