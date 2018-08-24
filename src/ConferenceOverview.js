import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_CONFERENCES = gql`
  query {
    conferences {
      id
      name
    }
  }
`;

const ConferenceOverview = () => (
  <Query query={GET_CONFERENCES}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error :(</div>;

      const { conferences } = data;

      return (
        <ul>
          {conferences.map(conference => (
            <li key={conference.id}>{conference.name}</li>
          ))}
        </ul>
      );
    }}
  </Query>
)

export default ConferenceOverview;
