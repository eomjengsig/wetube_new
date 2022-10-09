const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.getElementById("delete");
let commentId;

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  commentId = id;
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  span2.id = "delete__comment";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";

  if (response.status === 201) {
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
    deleteComment = document.getElementById("delete__comment");
    deleteComment.removeEventListener("click", handleDeleteComment);
    deleteComment.addEventListener("click", handleDeleteComment);
  }
};

const handleDelete = () => {
  fetch();
  const comment = document.getElementById(commentId);
  comment.remove();
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

const handleDeleteComment = async (event) => {
  const li = event.srcElement.parentNode;
  const {
    dataset: { id: commentId },
  } = li;

  await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
  });
  li.remove();
};

if (deleteComments) {
  deleteComments.forEach((deleteComment) => {
    deleteBtn.addEventListener("click", handleDeleteComment);
  });
}
