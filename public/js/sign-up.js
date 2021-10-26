async function signUpFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('input[name="sign-up-username"]').value.trim();
  const email = document.querySelector('input[name="sign-up-email"]').value.trim();
  const password = document.querySelector('input[name="sign-up-password"]').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
      window.location.replace('/dashboard');
    } else {
      alert(response.statusText)
    }
  }
}

document.querySelector('.sign-up-form').addEventListener('submit', signUpFormHandler);