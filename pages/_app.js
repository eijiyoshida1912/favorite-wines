import {
  ChakraProvider,
  Container,
  Center,
  Text,
  Box,
  Flex,
  Icon,
} from "@chakra-ui/react";
import "../styles/globals.css";

import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Header />
      <Container maxW="container.xl">
        <Component {...pageProps} />
      </Container>
      <Center as="p" bg="white" color="gray.500" h="60px" mt={10}>
        &copy; Eiji Yoshida
      </Center>
    </ChakraProvider>
  );
}

export default MyApp;
