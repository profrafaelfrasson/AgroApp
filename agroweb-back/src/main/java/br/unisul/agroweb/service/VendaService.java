package br.unisul.agroweb.service;

import br.unisul.agroweb.model.dto.ConsultaVendaDTO;
import br.unisul.agroweb.model.dto.SalvarVendaDTO;
import br.unisul.agroweb.model.entity.Venda;
import br.unisul.agroweb.model.entity.VendaProduto;
import br.unisul.agroweb.model.entity.VendaProdutoPK;
import br.unisul.agroweb.model.entity.dto.VendaProdutoDTO;
import br.unisul.agroweb.model.enumered.SituacaoPagamentoEnum;
import br.unisul.agroweb.model.repository.VendaRepository;
import br.unisul.agroweb.service.exception.BusinessException;
import br.unisul.agroweb.service.exception.MessageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
public class VendaService {

    private final VendaRepository vendaRepository;

    private final PessoaService pessoaService;

    private final ProdutoService produtoService;

    private final UsuarioLoginService usuarioLoginService;

    private final EstoqueProdutoService estoqueProdutoService;

    @Autowired
    public VendaService(VendaRepository vendaRepository, PessoaService pessoaService, ProdutoService produtoService,
                        UsuarioLoginService usuarioLoginService, EstoqueProdutoService estoqueProdutoService) {
        this.vendaRepository = vendaRepository;
        this.pessoaService = pessoaService;
        this.produtoService = produtoService;
        this.usuarioLoginService = usuarioLoginService;
        this.estoqueProdutoService = estoqueProdutoService;
    }

    public boolean possuiPagamentoEmAberto(Integer idPessoa) {
        return vendaRepository.existsByCanceladaIsFalseAndDataPagamentoIsNullAndClienteIdPessoa(idPessoa);
    }

    public List<Venda> consultarVendas(ConsultaVendaDTO consultaVendaDTO) {
        return vendaRepository.findAll(consultaVendaDTO.getIdCliente(), consultaVendaDTO.getIdProduto(), consultaVendaDTO.getSituacaoPagamento() != null ? consultaVendaDTO.getSituacaoPagamento().name() : SituacaoPagamentoEnum.TODOS.name());
    }

    public Venda atualizarDataPagamento(Integer idVenda, LocalDate dataPagamento) {
        var venda = vendaRepository.findByIdVendaAndCanceladaIsFalse(idVenda).orElseThrow(() -> new BusinessException(MessageType.INVALID_PARAMETERS, "Nenhuma venda ativa foi encontrada"));

        if (venda.getDataPagamento() != null) {
            throw new BusinessException(MessageType.VALIDATION_ERROR, "A venda selecionada já possui data de pagamento");
        }

        venda.setDataPagamento(dataPagamento);

        return vendaRepository.save(venda);
    }

    public Venda salvarVenda(SalvarVendaDTO salvarVendaDTO) {
        var venda = popularVenda(salvarVendaDTO);

        vendaRepository.save(venda);

        return venda;
    }

    private Venda popularVenda(SalvarVendaDTO salvarVendaDTO) {
        var venda = new Venda();

        venda.setCliente(pessoaService.buscarPessoa(salvarVendaDTO.getIdCliente()));
        venda.setData(LocalDate.now());
        venda.setDataPagamento(salvarVendaDTO.isCrediario() ? null : LocalDate.now());
        venda.setFormaPagamento(salvarVendaDTO.getFormaPagamento().getValor());
        venda.setResponsavel(usuarioLoginService.obterUsuarioLogado());

        var valorTotal = salvarVendaDTO.getVendasProdutos().stream().map(VendaProdutoDTO::calcularValorTotal).reduce(BigDecimal.ZERO, BigDecimal::add);
        venda.setValorTotal(valorTotal);

        popularVendasProdutos(salvarVendaDTO, venda);

        return venda;
    }

    private void popularVendasProdutos(SalvarVendaDTO salvarVendaDTO, Venda venda) {
        for (var vendaProdutoDTO: salvarVendaDTO.getVendasProdutos()) {
            var produto = produtoService.buscarProdutoAtivo(vendaProdutoDTO.getProduto().getIdProduto());

            if (!estoqueProdutoService.possuiEstoqueDisponivel(produto.getIdProduto(), vendaProdutoDTO.getQuantidade())) {
                throw new BusinessException(MessageType.VALIDATION_ERROR, "O produto de código " + produto.getIdProduto() + " selecionado não possui estoque disponível");
            }

            var vendaProduto = new VendaProduto();

            vendaProduto.setQuantidade(vendaProdutoDTO.getQuantidade());
            vendaProduto.setValorUnitario(vendaProdutoDTO.getValorUnitario());
            vendaProduto.setVendaProdutoPK(new VendaProdutoPK(venda, produto));

            venda.getProdutos().add(vendaProduto);

            estoqueProdutoService.subtrairEstoque(produto, vendaProduto.getQuantidade());
        }
    }
}
