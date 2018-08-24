import React, { Component } from 'react';

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
    this.props.subscribeToNewComments();
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
