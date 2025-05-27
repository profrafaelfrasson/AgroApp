package br.unisul.agroweb.rest;

import br.unisul.agroweb.model.entity.Pessoa;
import br.unisul.agroweb.model.entity.dto.PessoaDTO;
import br.unisul.agroweb.model.dto.SalvarPessoaDTO;
import br.unisul.agroweb.service.PessoaService;
import jakarta.validation.Valid;
import org.hibernate.validator.constraints.br.CPF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("pessoa")
public class PessoaEndpoint {

    @Autowired
    private PessoaService pessoaService;

    @GetMapping
    List<PessoaDTO> listarTodos() {
        List<Pessoa> pessoas = pessoaService.listarPessoasAtivas();

        return pessoas.stream().map(PessoaDTO::new).collect(Collectors.toList());
    }

    @GetMapping("/{idPessoa}")
    PessoaDTO buscarPessoa(@PathVariable Integer idPessoa) {
        return new PessoaDTO(pessoaService.buscarPessoa(idPessoa));
    }

    @GetMapping("/cpf/{cpf}")
    PessoaDTO buscarPessoa(@PathVariable String cpf) {
        return new PessoaDTO(pessoaService.buscarPessoa(cpf));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    PessoaDTO salvarPessoa(@RequestBody @Valid SalvarPessoaDTO salvarPessoaDto) {
        return new PessoaDTO(pessoaService.salvarPessoa(salvarPessoaDto));
    }

    @PutMapping("{idPessoa}")
    PessoaDTO atualizarPessoa(@RequestBody @Valid SalvarPessoaDTO salvarPessoaDto, @PathVariable Integer idPessoa) {
        return new PessoaDTO(pessoaService.atualizarPessoa(idPessoa, salvarPessoaDto));
    }

    @DeleteMapping("/{idPessoa}")
    void inativarPessoa(@PathVariable Integer idPessoa) {
        pessoaService.inativarPessoa(idPessoa);
    }

}
