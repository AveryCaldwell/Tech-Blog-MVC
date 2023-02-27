document.addEventListener('DOMContentLoaded', function () {
    // Get the new post button element
    const editPostButton = document.getElementById('delete-post-button');
    // Attach a click event listener to the new post button
    editPostButton.addEventListener('click', deleteFormHandler);
});
const deleteFormHandler = async (event) => {
    const id = document.getElementById('editPostId').value;
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ post_id: id }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
        console.log('Post deleted.');
    } else {
        alert('Failed to delete post.');
    }
};
