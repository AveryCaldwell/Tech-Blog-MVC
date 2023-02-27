document.addEventListener('DOMContentLoaded', function () {
    // Get the new post button element
    const editPostButton = document.getElementById('update-post-button');
    // Attach a click event listener to the new post button
    editPostButton.addEventListener('click', editFormHandler);
});

const editFormHandler = async () => {
    const title = document.getElementById('editPostTitle').value.trim();
    const content = document.getElementById('editContent').value.trim();
    const id = document.getElementById('editPostId').value;
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ post_id: id, title, content }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to edit post.');
    }
};
