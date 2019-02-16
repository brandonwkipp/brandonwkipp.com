function loadPost()
{
    let postSelect = document.getElementById('blog-editor-select');
    let value = postSelect.options[postSelect.selectedIndex].value;

    if (value === "0")
    {
        return;
    }

    $.ajax({
        data: {
            "postId": value,
        },
        type: "get",
        url: "/blog/posts/id/" + value,
    }).done(function(data) {
        let parsedData = JSON.parse(data);

        let id = document.getElementById('blog-editor-id');
        let title = document.getElementById('title');
        let body = document.getElementById('body');
        let preview = document.getElementById('preview');
        let tags = document.getElementById('tags');
        let publishToMedium = document.getElementById('publish-to-medium');

        id.value = value;
        title.value = parsedData['title'];
        body.value = parsedData['body'];
        preview.value = parsedData['preview'];
        tags.value = parsedData['tags'];
        publishToMedium.checked = parsedData['publishToMedium'];

        if (parsedData['publishToMedium'])
        {
            publishToMedium.disabled = true;
        }

    }).fail(function(error) {
        console.log(error);
    });
}

function submitBlogPost()
{
    let postSelect = document.getElementById('blog-editor-select');
    let value = postSelect.options[postSelect.selectedIndex].value;

    $.ajax({
        data: {
            "id": value,
            "title": document.getElementById('title').value,
            "body": document.getElementById('body').value,
            "preview": document.getElementById('preview').value,
            "publishToMedium": document.getElementById('publish-to-medium').checked,
            "tags": document.getElementById('tags').value,
        },
        type: "post",
        url: "/admin/blog-editor/submit",
    }).done(function(data) {
        submitBlogSnackbar();
    }).fail(function(error) {
        console.log(error);
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
