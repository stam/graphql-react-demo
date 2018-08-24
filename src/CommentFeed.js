import React from 'react';
import gql from 'graphql-tag';
import { Subscription } from 'react-apollo';

import Comment from './Comment';

const COMMENTS_SUBSCRIPTION = gql`
  subscription {
    comments {
      comment
      createdOn
      authorName
      talkTitle
    }
  }
`;

const ConferenceOverview = () => (
  <Subscription
    subscription={COMMENTS_SUBSCRIPTION}
  >
    {(props) => {
      if (props.loading) {
        return null;
      }
      const { data: { comments }} = props;
      return (
        <Comment data={comments} />
      );
    }}
  </Subscription>
);

export default ConferenceOverview;
