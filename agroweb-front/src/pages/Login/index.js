import React, { useState } from 'react'
import * as Componentes from "./styles";
import 'font-awesome/css/font-awesome.min.css';
import AutenticacaoService from '../../services/autenticacaoService';
import { useNavigate } from "react-router-dom";
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Spinner } from '@chakra-ui/spinner';

const Login = () => {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const realizarLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!nomeUsuario | !senha) {
      setMensagemErro("O nome de usuário e a senha devem ser preenchidos");
      setLoading(false);
      return;
    }

    setMensagemErro("");

    try {
      AutenticacaoService.login(nomeUsuario, senha).then(() => {
        navigate('/');
        setLoading(false);
      });
      
    } catch(err)  {
      setMensagemErro("Nome de usuário e/ou senha incorretos");
      setLoading(false);
    }
  };

  return (
    <Componentes.PaginaLogin>
      <Componentes.Formulario>
        {mensagemErro && <Componentes.MensagemErro>{mensagemErro}</Componentes.MensagemErro>}
          <Box w={'100%'} marginBottom={'10px'}>
            <InputGroup marginBottom="20px">
              <InputLeftElement>
                <FontAwesomeIcon icon={faUser} color='grey' />
              </InputLeftElement>
              <Input variant={'flushed'} type='text' placeholder='Nome de usuário' onChange={(e) => [setNomeUsuario(e.target.value), setMensagemErro("")]}/>
            </InputGroup>

            <InputGroup>
              <InputLeftElement>
                <FontAwesomeIcon icon={faLock} color='grey' />
              </InputLeftElement>
              <Input variant={'flushed'} type='password' placeholder='Senha' onChange={(e) => [setSenha(e.target.value), setMensagemErro("")]}/>
            </InputGroup>
          </Box>         

          <Box w={'100%'}>
            <Button isLoading={loading} spinner={<Spinner speed='1.5s' />} onClick={realizarLogin} w={'100%'} colorScheme='blue'>
              Entrar
            </Button>
          </Box>

      </Componentes.Formulario>
    </Componentes.PaginaLogin>
  )
}

export default Login;