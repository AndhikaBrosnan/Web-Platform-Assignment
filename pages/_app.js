// import App from 'next/app'

import { ApolloProvider } from "@apollo/client";
import client from "../api/apollo-client";
import CommonLayout from "../component/commonLayout";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "../store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <CommonLayout>
            <Component {...pageProps} />
          </CommonLayout>
        </ChakraProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
