import Rotas from "./routes";
import GlobalStyle from "./styles/global";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <>
      <ChakraProvider>
        <Rotas />
        <GlobalStyle />
      </ChakraProvider>
    </>
  );
}

export default App;
