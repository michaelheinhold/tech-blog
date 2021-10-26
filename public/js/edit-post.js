async function editPostFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[name="post-content"]').value;
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if(title && content) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    
    if(response.ok) {
      window.location.replace('/');
    } else {
      alert(response.statusText)
    }
  }
}

document.querySelector('.edit-post-form').addEventListener('submit', editPostFormHandler);