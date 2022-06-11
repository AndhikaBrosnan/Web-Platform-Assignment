// import App from 'next/app'

import { ApolloProvider } from "@apollo/client";
import client from "../api/apollo-client";
import CommonLayout from "../component/commonLayout";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <CommonLayout>
        <Component {...pageProps} />
      </CommonLayout>
    </ApolloProvider>
  );
}

export default MyApp;
