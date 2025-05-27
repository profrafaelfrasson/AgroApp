package br.unisul.agroweb.rest;

import br.unisul.agroweb.model.dto.AtualizarDataPagamentoDTO;
import br.unisul.agroweb.model.dto.ConsultaVendaDTO;
import br.unisul.agroweb.model.dto.SalvarVendaDTO;
import br.unisul.agroweb.model.entity.dto.VendaDTO;
import br.unisul.agroweb.service.VendaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/venda")
public class VendaEndpoint {

    private final VendaService vendaService;

    @Autowired
    public VendaEndpoint(VendaService vendaService) {
        this.vendaService = vendaService;
    }

    @GetMapping("/cliente/{idPessoa}/pagamento/em-aberto")
    boolean possuiPagamentoEmAberto(@PathVariable Integer idPessoa) {
        return vendaService.possuiPagamentoEmAberto(idPessoa);
    }

    @GetMapping
    List<VendaDTO> listarVendas(ConsultaVendaDTO consultaVendaDTO) {
        var vendas = vendaService.consultarVendas(consultaVendaDTO);

        return vendas.stream().map(VendaDTO::new).collect(Collectors.toList());
    }

    @PutMapping("/{idVenda}/pagamento")
    VendaDTO atualizarDataPagamento(@PathVariable Integer idVenda, @RequestBody @Valid AtualizarDataPagamentoDTO atualizarDataPagamentoDTO) {
        var venda = vendaService.atualizarDataPagamento(idVenda, atualizarDataPagamentoDTO.getDataPagamento());

        return new VendaDTO(venda);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    VendaDTO salvarVenda(@RequestBody @Valid SalvarVendaDTO salvarVendaDTO) {
        var venda = vendaService.salvarVenda(salvarVendaDTO);

        return new VendaDTO(venda);
    }
}
