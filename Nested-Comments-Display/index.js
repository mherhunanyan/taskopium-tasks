const comments = [
  {
    id: 1,
    text: "This is the first comment",
    parentId: null,
    replies: [
      {
        id: 2,
        text: "This is a reply to the first comment",
        parentId: 1,
        replies: [
          {
            id: 3,
            text: "This is a nested reply",
            parentId: 2,
            replies: [], // Further nesting possible
          },
        ],
      },
    ],
  },
  {
    id: 4,
    text: "This is an independent comment",
    parentId: null,
    replies: [],
  },
];

function generateComments(comments, container) {
  comments.forEach((comment) => {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    commentDiv.textContent = comment.text;

    container.appendChild(commentDiv);

    if (comment.replies?.length) {
      const repliesContainer = document.createElement("div");
      repliesContainer.classList.add("replies");
      commentDiv.appendChild(repliesContainer);
      generateComments(comment.replies, repliesContainer);
    }
  });
}

const commentContainer = document.getElementById("comments-container");
generateComments(comments, commentContainer);
