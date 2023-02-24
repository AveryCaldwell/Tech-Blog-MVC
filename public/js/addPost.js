const newFormHandler = async (event) => {
    event.preventDefault();

    // get title and content from form
    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('input[name="content"]').value;

    // user id is added from the session information in the route
    // use the add a new post POST route to add the post

    const post_id = event.target.getAttribute('data-id');
    if (content && post_id) {
        // if (email && password) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        // if the response is okay, reload the page, showing the newest post now in the user's post list
        if (response.ok) {
            document.location.replace('/post/${post_id}$');
            console.log('Comment posted successfully.');
        } else {
            alert('Failed to add post.');
        }
    }
};

// Event Listener for adding a post
if (document.querySelector('#submitBtn') != null) {
    document
        .querySelector('#submitBtn')
        .addEventListener('click', newFormHandler);
}
// document.querySelector('#submitBtn').addEventListener('click', newFormHandler);
