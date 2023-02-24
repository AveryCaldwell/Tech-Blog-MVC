const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#name-login').value.trim();
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && email && password) {
        const response = await fetch('/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // document.location.replace('/dashboard');
            document.location.replace('/');
            console.table('Successfully logged in.');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#login').addEventListener('submit', loginFormHandler);
