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
  const list = document.createElement("ul");
  list.classList.add("comment-list");
  container.appendChild(list);

  comments.forEach((comment) => {
    const listItem = document.createElement("li");
    listItem.classList.add("comment-item");

    const commentArticle = document.createElement("article");
    commentArticle.classList.add("comment-conent");
    commentArticle.textContent = comment.text;
    listItem.appendChild(commentArticle);

    list.appendChild(listItem);

    if (comment.replies && comment.replies.length > 0) {
      generateComments(comment.replies, listItem);
    }
  });
}

const commentContainer = document.getElementById("comments-container");
generateComments(comments, commentContainer);
