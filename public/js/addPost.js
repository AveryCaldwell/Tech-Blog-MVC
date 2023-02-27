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
        });
};
