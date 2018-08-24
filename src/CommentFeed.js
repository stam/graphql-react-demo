import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import CommentOverview from './CommentOverview';

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

const COMMENTS_QUERY = gql`
  query {
    comments(page: {
      page: 0,
      size: 9999
    })
    {
      content {
        id,
        comment
        createdOn
        talk {
          title
        }
        author {
          name
        }
      }
    }
  }
`;

const CommentFeed = () => (
  <Query
    query={COMMENTS_QUERY}
  >
    {({ subscribeToMore, ...result }) => (
        <CommentOverview
          {...result}
          subscribeToNewComments={() =>
            subscribeToMore({
              document: COMMENTS_SUBSCRIPTION,
              updateQuery: (previousResult, { subscriptionData }) => {
                if (!subscriptionData.data) return previousResult;
                const subscriptionResponse = subscriptionData.data.comments;

                const { talkTitle, authorName, ...commentData } = subscriptionResponse;

                // The comment from the subscription returns talkTitle and authorName flattened.
                // Convert it to nested syntax to match query response
                // Also apollo-client crashes hard when we don't specifically define the __typenames....
                const newComment = {
                  id: Date.now(), // Please add this to the contentUpdate response
                  talk: {
                    title: talkTitle,
                    __typename: 'Talk',
                  },
                  author: {
                    name: authorName,
                    __typename: 'Person',
                  },
                  ...commentData,
                }

                return Object.assign({}, previousResult, {
                  comments: {
                    __typename: 'CommentPageableResponse',
                    content: [...previousResult.comments.content, newComment]
                  }
                });
              }
            })
          }
        />
    )
    }
  </Query>
);

export default CommentFeed;
