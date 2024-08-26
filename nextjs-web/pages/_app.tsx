import type { AppProps } from 'next/app';
import { CurrentProvider } from '../hooks/useCurrent';
import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from '../lib/apolloClient';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={initializeApollo()}>
      <CurrentProvider>
        <Component {...pageProps} />
      </CurrentProvider>
    </ApolloProvider>
  );
}

export default MyApp;
