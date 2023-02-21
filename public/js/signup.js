// const signupFormHandler = async (event) => {
//     event.preventDefault();

async function signupFormHandler(event) {
    event.preventDefault();

    // Get the information from the sign up form
    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // if all three fields have content
    if (username && email && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        // Check response status
        if (response.ok) {
            console.log('Account successfully created!');
            document.location.replace('/dashboard');
        } else {
            alert('Something went wrong, failed to sign up.');
        }
    }
}

document
    .querySelector('#signup-form')
    .addEventListener('submit', signupFormHandler);
