import { Fragment } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { verificarUsuarioLogado } from "./services/armazenamentoLocalService";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cliente from "./pages/Cliente";
import Layout from "./components/Layout";
import Produto from "./pages/Produto";
import Venda from "./pages/Venda";

const RotaPrivada = ({ Pagina, titulo }) => {
    return verificarUsuarioLogado() ? <Layout children={Pagina} titulo={titulo}/> : <Navigate to={{pathname: "/login"}}/>
}

const RotaLogin = () => {
    return !verificarUsuarioLogado() ? <Login /> : <Navigate to={{pathname: "/"}}/>
}

const Rotas = () => (
    <BrowserRouter>
        <Fragment>
            <Routes>
                <Route path="/login" element={<RotaLogin/>} />
                <Route exact path="/" element={<RotaPrivada Pagina={<Home />}/>} />
                <Route exact path="/cliente" element={<RotaPrivada Pagina={<Cliente/>} titulo={"Clientes"}/>} />
                <Route exact path="/produto" element={<RotaPrivada Pagina={<Produto/>} titulo={"Produtos"}/>} />
                <Route exact path="/venda" element={<RotaPrivada Pagina={<Venda/>} titulo={"Vendas"}/>} />
                <Route path="*" element={<h1>Página não encontrada</h1>}/>
            </Routes>
        </Fragment>
    </BrowserRouter>
  );
  
  export default Rotas;