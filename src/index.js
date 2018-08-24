import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({ uri: 'http://localhost:8080/graphql' });

const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
    <AppComponent />
  </ApolloProvider>
);

render(ApolloApp(App), document.getElementById('root'));
