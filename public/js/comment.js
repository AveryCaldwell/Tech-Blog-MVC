document.addEventListener('DOMContentLoaded', function () {
    document
        .querySelector('#newCommentButton')
        .addEventListener('click', commentFormHandler);
});
// show comments
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
// delete comment
const commentDelete = async (event) => {
    event.preventDefault();
    const commentId = event.target.getAttribute('commentid');

    const response = await fetch(`/api/posts/comment/${commentId}`, {
        method: 'DELETE',
        body: JSON.stringify({
            id: commentId,
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
};
// update comment
const commentUpdate = async (event) => {
    event.preventDefault();
    const commentId = event.target.getAttribute('commentid');
    const commentVal = document.getElementById(`comment${commentId}`).value;

    const response = await fetch(`/api/posts/comment/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify({
            comment_text: commentVal,
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
};
