// Wait for the DOM to load before attaching event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Get the new post button element
    const newPostButton = document.getElementById('add-post-button');
    // Attach a click event listener to the new post button
    newPostButton.addEventListener('click', newFormHandler);
});

const newFormHandler = async (event) => {
    const newPostForm = document.getElementById('new-post-form');
    event.preventDefault();

    const formData = new FormData(newPostForm);
    const newPost = {
        title: formData.get('postTitle'),
        content: formData.get('content'),
    };

    // Send a POST request to the server to create the new post
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            response.json();
            if (response.ok) {
                document.location.replace(`/dashboard`);
                console.log('Comment posted successfully.');
            } else {
                alert('Failed to add post.');
            }
        })
        .then((data) => {
            console.log(data);

            // get title and content from form
            // const title = document.querySelector('#postTitle').value;
            // const content = document.querySelector('#content').value;

            // user id is added from the session information in the route
            // use the add a new post POST route to add the post
            // const post_id = event.target.getAttribute('data-id');

            // if (content && post_id) {
            //     const response = await fetch('/api/posts', {
            //         method: 'POST',
            //         body: JSON.stringify({ title, content }),
            //         headers: { 'Content-Type': 'application/json' },
            // });
            // if the response is okay, reload the page, showing the newest post now in the user's post list
        });
};

// Event Listener for adding a post
// if (document.querySelector('#new-post-button') != null) {
//     document
//         .querySelector('#new-post-button')
//         .addEventListener('click', newFormHandler);
// }
// document
//     .querySelector('#new-post-button')
//     .addEventListener('click', newFormHandler);
