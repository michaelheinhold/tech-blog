async function createPostFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[name="post-content"]').value;

  if(title && content) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        content
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

document.querySelector('.new-post-form').addEventListener('submit', createPostFormHandler);