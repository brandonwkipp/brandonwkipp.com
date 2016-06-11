function activeSwitch(element) {
    var ul = document.getElementById('navTabs');
    var list = ul.getElementsByTagName('li');

    for(var i = 0; i < list.length; i++)
    {
        if($(list[i]).hasClass('active') || $(list[i]).hasClass('open'))
        {
            $(list[i]).removeClass();
        }
    }
    if(element.id == 'projects' || element.id == 'connect')
    {
        $(element).addClass('active open');
    }else
    {
        $(element).addClass('active open');
    }
}
function init() {
    var ul = document.getElementById('navTabs');
    var list = ul.getElementsByTagName('li');

    for(var i = 0; i < list.length; i++)
    {
        list[i].addEventListener('mouseover', function() {
            activeSwitch(this);
        });
        list[i].addEventListener('click', function() {

        });
    }
    $.get("content.json", function(data) {
        for(var i = 0; i < data["blog"].length; i++)
        {
            var blog = document.createElement("div");
            blog.className = "blog-entry";

            var divider = document.createElement("hr");

            var title = document.createElement("h3");
            title.className = "blog-title";
            title.innerHTML = data["blog"][i].title;

            var date = document.createElement("p");
            date.className = "blog-date";
            date.innerHTML = data["blog"][i].date;

            var text = document.createTextNode(data["blog"][i].text.join('\n'));

            blog.appendChild(title);
            blog.appendChild(date);
            blog.appendChild(text);
            blog.appendChild(divider);

            document.getElementById('content-box').appendChild(blog);
        }
    });
    document.getElementById('portrait').addEventListener('mouseover', function() {
        document.getElementById('portrait').src = 'images/2.png';
    });
    document.getElementById('portrait').addEventListener('mouseout', function() {
        document.getElementById('portrait').src = 'images/1.png';
    });
    document.getElementById('about').addEventListener('click', function() {
        resumeSwitch();
    });
}

init();
