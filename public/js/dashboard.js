// Wait for the DOM to load before attaching event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Get the new post button element
    const newPostButton = document.getElementById('new-post-button-dashboard');
    // Attach a click event listener to the new post button
    newPostButton.addEventListener('click', function () {
        // Redirect the user to the new post form page
        window.location.href = '/dashboard/new';
    });
});
