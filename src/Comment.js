import React from 'react';

const Comment = (props) => {
  const { data: {
    comment,
    // createdOn,
    authorName,
    talkTitle
  }} = props;

  return (
    <div>
      <p>Author: {authorName} | Talk: {talkTitle}</p>
      <p>{comment}</p>
    </div>
  );
}

export default Comment;
