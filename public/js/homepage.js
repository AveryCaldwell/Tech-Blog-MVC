// Wait for the DOM to load before attaching event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Get the new post button element
    const newPostButton = document.getElementById('new-post-button');
    // Attach a click event listener to the new post button
    newPostButton.addEventListener('click', function () {
        // Redirect the user to the new post form page
        window.location.href = '/dashboard';
    });
});
// TODO: Your dashboard route
// // Wait for the DOM to load before attaching event listeners
// document.addEventListener('DOMContentLoaded', function () {
//     // Get the new post button element
//     const yourDashboard = document.getElementById('your-dashboard');
//     // Attach a click event listener to the new post button
//     yourDashboard.addEventListener('click', function () {
//         // Redirect the user to the new post form page
//         window.location.href = '/dashboard';
//     });
// });
