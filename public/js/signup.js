// signup form
const signupFormHandler = async (event) => {
    event.preventDefault();
    const userObj = {
        username: document.querySelector('#username-signup').value,
        email: document.querySelector('#email-signup').value,
        password: document.querySelector('#password-signup').value,
    };
    console.log(userObj);
    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(userObj),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        if (response.ok) {
            console.log('Account successfully created!');
            document.location.replace('/dashboard');
        } else {
            alert('UH OH! Something went wrong. Sign up failed.');
        }
    });
};
document.querySelector('#signup').addEventListener('submit', signupFormHandler);
