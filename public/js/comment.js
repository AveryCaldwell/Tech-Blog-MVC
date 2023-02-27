const commentFormHandler = async (event) => {
    const comment_text = document.querySelector('#comment').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        const response = await fetch('/api/posts/comment', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
            document.querySelector('#comment').style.display = 'block';
        }
    }
};
document
    .querySelector('#newCommentButton')
    .addEventListener('click', commentFormHandler);

// const newCommentFormHandler = async (event) => {
//     event.preventDefault();

//     const content = document.querySelector('#comment').value.trim();
//     const postId = document.querySelector('#hiddenPostId').value;

//     if (content && postId) {
//         const response = await fetch('/api/comments', {
//             method: 'POST',
//             body: JSON.stringify({ content, postId }),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (response.ok) {
//             document.location.reload();
//         } else {
//             alert('Failed to create comment');
//         }
//     }
// };

// document
//     .querySelector('#newCommentForm')
//     .addEventListener('submit', newCommentFormHandler);
