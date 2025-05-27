package br.unisul.agroweb.service;

import br.unisul.agroweb.model.entity.Pessoa;
import br.unisul.agroweb.model.dto.SalvarPessoaDTO;
import br.unisul.agroweb.model.repository.PessoaRepository;
import br.unisul.agroweb.service.exception.BusinessException;
import br.unisul.agroweb.service.exception.MessageType;
import br.unisul.agroweb.util.StringUtils;
import jakarta.persistence.NoResultException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;

import static br.unisul.agroweb.util.StringUtils.maskCpf;

@Component
public class PessoaService {

    private final PessoaRepository pessoaRepository;

    private final ModelMapper modelMapper;

    private static final String PESSOA_JA_CADASTRADA = "Já existe uma pessoa cadastrada para o cpf %s";
    private static final String PESSOA_NAO_ENCONTRADA = "A pessoa informada não foi encontrada";


    @Autowired
    public PessoaService(PessoaRepository pessoaRepository, ModelMapper modelMapper) {
        this.pessoaRepository = pessoaRepository;
        this.modelMapper = modelMapper;
    }

    public List<Pessoa> listarPessoasAtivas() {
        return pessoaRepository.findAllByAtivoIsTrue();
    }

    public Pessoa buscarPessoa(Integer idPessoa) {
        return pessoaRepository.findByIdPessoaAndAtivoIsTrue(idPessoa).orElseThrow((() -> new NoResultException(PESSOA_NAO_ENCONTRADA)));
    }

    public Pessoa buscarPessoa(String cpf) {
        return pessoaRepository.findByCpf(StringUtils.maskCpf(cpf)).orElseThrow(() -> new NoResultException(PESSOA_NAO_ENCONTRADA));
    }

    public Pessoa salvarPessoa(SalvarPessoaDTO salvarPessoaDto) {
        validarSalvarPessoa(salvarPessoaDto);

        Pessoa pessoa = criarPessoa(salvarPessoaDto);
        validarPessoa(pessoa);
        return pessoaRepository.save(pessoa);
    }

    private void validarSalvarPessoa(SalvarPessoaDTO salvarPessoaDto) {
        Optional<Pessoa> pessoaOptional = pessoaRepository.findByCpf(maskCpf(salvarPessoaDto.getCpf()));
        if (pessoaOptional.isPresent()) {
            Pessoa pessoa = pessoaOptional.get();
            throw new BusinessException(MessageType.VALIDATION_ERROR, String.format(PESSOA_JA_CADASTRADA, maskCpf(pessoa.getCpf())));
        }
    }

    public Pessoa atualizarPessoa(Integer idPessoa, SalvarPessoaDTO salvarPessoaDTO) {
        Pessoa pessoa = buscarPessoa(idPessoa);
        return atualizarPessoa(pessoa, salvarPessoaDTO);
    }

    public Pessoa atualizarPessoa(Pessoa pessoa, SalvarPessoaDTO salvarPessoaDTO) {
        atualizarDadosPessoa(salvarPessoaDTO, pessoa);
        validarPessoa(pessoa);

        validarAtualizarPessoa(pessoa, salvarPessoaDTO);

        return pessoaRepository.save(pessoa);
    }

    private void validarAtualizarPessoa(Pessoa pessoa, SalvarPessoaDTO salvarPessoaDTO) {
        Optional<Pessoa> pessoaOptional = pessoaRepository.findByCpf(maskCpf(salvarPessoaDTO.getCpf()));
        if (pessoaOptional.isPresent() && !pessoaOptional.get().getIdPessoa().equals(pessoa.getIdPessoa())) {
            throw new BusinessException(MessageType.VALIDATION_ERROR, String.format(PESSOA_JA_CADASTRADA, maskCpf(pessoa.getCpf())));
        }
    }

    public void inativarPessoa(Integer idPessoa) {
        Pessoa pessoa = buscarPessoa(idPessoa);

        pessoa.setAtivo(false);

        pessoaRepository.save(pessoa);
    }

    private void validarPessoa(Pessoa pessoa) throws BusinessException {
        if (Period.between(pessoa.getDataNascimento(), LocalDate.now()).getYears() < 18) {
            throw new BusinessException(MessageType.VALIDATION_ERROR, "A pessoa deve ser maior de idade");
        }
    }

    private void atualizarDadosPessoa(SalvarPessoaDTO salvarPessoaDto, Pessoa pessoa) {
        modelMapper.map(salvarPessoaDto, pessoa);
    }

    private Pessoa criarPessoa(SalvarPessoaDTO salvarPessoaDto) {
        return modelMapper.map(salvarPessoaDto, Pessoa.class);
    }
}
