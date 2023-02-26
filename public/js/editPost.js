const editFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('postTitle').value.trim();
    const content = document.querySelector('content').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch('/api/post/${id}', {
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

document
    .querySelector('.edit-post-form')
    .addEventListener('submit', editFormHandler);
