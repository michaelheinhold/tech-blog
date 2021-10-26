async function commentFormHandler(event) {
  event.preventDefault();

  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const text = document.querySelector('textarea[name="comment-text"]').value;

  const response = await fetch('/api/comments', {
    method: 'post',
    body: JSON.stringify({
      text,
      post_id
    }),
    headers: { 'Content-Type': 'application/json' }
  })

  if(response.ok) {
    window.location.reload();
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);