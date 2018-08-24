import React, { Component } from 'react';
import gql from 'graphql-tag';

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

const Comment = (props) => {
  const { data: {
    comment,
    // createdOn,
    author: { name },
    talk: { title }
  }} = props;

  return (
    <div>
      <p>Author: {name} | Talk: {title}</p>
      <p>{comment}</p>
    </div>
  );
}

class CommentOverview extends Component {
  componentDidMount() {
    this.subscribeToNewComments();
  }

  subscribeToNewComments() {
    const { subscribeToMore } = this.props;

    subscribeToMore({
      document: COMMENTS_SUBSCRIPTION,
      updateQuery: this.handleUpdate,
    })
  }

  handleUpdate = (previousResult, { subscriptionData }) => {
    if (!subscriptionData.data) {
      return previousResult;
    }

    const newComment = this.sanitizeCommentUpdateReponse(subscriptionData);

    return Object.assign({}, previousResult, {
      comments: {
        __typename: 'CommentPageableResponse',
        content: [...previousResult.comments.content, newComment]
      }
    });
  }

  sanitizeCommentUpdateReponse(subscriptionData) {
    const { talkTitle, authorName, ...commentData } = subscriptionData.data.comments;

    // The comment from the subscription returns talkTitle and authorName flattened.
    // Convert it to nested syntax to match query response
    // Also apollo-client crashes hard when we don't specifically define the __typenames....
    return {
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
  }

  render() {
    const { data, loading } = this.props;

    if (loading) {
      return <p>Loading...</p>
    }
    return (
      <ul>
        {data.comments.content.map(comment => (
          <Comment data={comment} key={comment.id} />
        ))}
      </ul>
    );
  }
}

export default CommentOverview;
