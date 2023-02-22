const newFormHandler = async (event) => {
    event.preventDefault();

    // get title and content from form
    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('input[name="content"]').value;

    // user id is added from the session information in the route
    // use the add a new post POST route to add the post

    // if (email && password) {
    const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
    });
    // if the response is okay, reload the page, showing the newest post now in the user's post list
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to log in.');
    }
};
// };

document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);
