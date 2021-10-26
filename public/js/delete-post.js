async function deletePostFormHandler() {
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    
    if(response.ok) {
      window.location.replace('/dashboard');
    } else {
      alert(response.statusText)
    }
}

document.querySelector('.delete-btn').addEventListener('click', deletePostFormHandler);