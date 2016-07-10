var blogContent;
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
        $(element).addClass('active');
    }
}
function resumeSwitch() {
    document.getElementById('content-box').innerHTML = '<img id="resume-img"><div class="download-row hidden-xs"><a class="portrait" href="KippBrandonResume-portrait.pdf" download="KippBrandonResume-portrait.pdf"><button class="btn btn-primary">Download (Portrait)</button></a><a class="landscape" href="KippBrandonResume-landscape.pdf" download="KippBrandonResume-landscape.pdf"><button class="btn btn-primary">Download (Landscape)</button></a></div>';
}
function blogSwitch() {
    document.getElementById('content-box').innerHTML = blogContent;
}
function botSwitch() {
    var bots = '<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">';
    bots += '<div id="prossbot" class="bot"><p class="bot-title">ProssBot</p><p class="bot-explanation">';
    bots += 'A bot dedicated to tweeting lyrics of one of myfavorite local artists I worked with at Maple Tree Studio.</p>';
    bots += '<a class="twitter-timeline" href="https://twitter.com/prossbot" data-chrome="noheader nofooter"></a></div></div>';

    document.getElementById('content-box').innerHTML = bots;
    twttr.widgets.load();
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
            blogContent = document.getElementById('content-box').innerHTML;
        }
    });
    document.getElementById('portrait').addEventListener('mouseover', function() {
        document.getElementById('portrait').src = 'images/2.png';
    });
    document.getElementById('portrait').addEventListener('mouseout', function() {
        document.getElementById('portrait').src = 'images/1.png';
    });
    document.getElementById('blog').addEventListener('click', function() {
        blogSwitch();
    });
    document.getElementById('mobile-blog').addEventListener('click', function() {
        blogSwitch();
    });
    document.getElementById('resume').addEventListener('click', function() {
        resumeSwitch();
    });
    document.getElementById('bots').addEventListener('click', function() {
        botSwitch();
    });
    var listItems = document.querySelectorAll('.mobile-list-item');
    for(var i = 0; i < listItems.length; i++)
    {
        $(listItems[i]).click(function(event) {
            event.stopPropagation();
        });
    }
}
function test(array) {
    var blogs = JSON.parse(array);
    for(var i = blogs.length; i != 0; i--)
    {
        console.log(blogs[i - 1].title);
    }
}

init();
