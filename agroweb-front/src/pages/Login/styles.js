import { styled } from "styled-components";
import vaquinhas from "../../assets/vaquinhas.jpg";

export const PaginaLogin = styled.div`
    background-image: url(${vaquinhas});
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const Formulario = styled.form`
    width: 400px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 5px;
`;

export const PainelInput = styled.div`
    width: 100%;
    position: relative;

    input {
        width: 100%;
        padding: 10px 40px;
        margin-bottom: 15px;
    }

    i {
        position: absolute;
        left: 15px;
        top: 12px;
        color: grey;
    }
`;

export const BotaoEnviar = styled.button`
    width: 100%;
    border: none;
    border: 0;
    background-color: #004B80;
    color: white;
    padding: 10px 0;
    width: 100%;
`;

export const MensagemErro = styled.p`
    color: red;
    font-size: 0.9rem;
    margin-bottom: 15px;
`;