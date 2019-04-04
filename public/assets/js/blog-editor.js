function clearEditor()
{
    document.getElementById('title').value = '';
    document.getElementById('body').value = '';
    document.getElementById('preview').value = '';
    document.getElementById('tags').value = '';
}

function createPost()
{
    let postSelect = document.getElementById('blog-editor-select');
    let value = postSelect.options[postSelect.selectedIndex].value;

    let params = new FormData();
    params.append('id', value);
    params.append('title', document.getElementById('title').value);
    params.append('body', document.getElementById('body').value);
    params.append('preview', document.getElementById('preview').value);
    params.append('tags', document.getElementById('tags').value);

    axios.post('/create-post', params)
    .then(function (response) {
        if (response.data.success)
        {
            clearEditor();
        }
    })
    .catch(function (error) {
        console.log(error)
    });
}

function submitBlogSnackbar()
{
    let sb = document.getElementById('blog-editor-snackbar');
    sb.classList.add('show');
    setTimeout(function()
    {
        sb.classList.remove('show');
    }, 3000);
}
