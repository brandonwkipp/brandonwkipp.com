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
    console.log('resume')
    document.getElementById('content-box').innerHTML = '<img id="resume-img" src="images/resume.png" width="1100px" height="599px"><div class="download-row"><a class="portrait" href="KippBrandonResume-portrait.pdf" download="KippBrandonResume-portrait.pdf"><button class="btn btn-primary">Download (Portrait)</button></a><a class="landscape" href="KippBrandonResume-landscape.pdf" download="KippBrandonResume-landscape.pdf"><button class="btn btn-primary">Download (Landscape)</button></a></div>';
}
function blogSwitch() {
    document.getElementById('content-box').innerHTML = blogContent;
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
    document.getElementById('resume').addEventListener('click', function() {
        resumeSwitch();
    });
}

init();

/*

<div id="myCarousel" class="carousel slide" data-interval="false">
    <!-- Wrapper for slides -->
    <div class="carousel-inner" role="listbox">
      <div class="item active">
          <img src="images/icons/twitter-icon.png">
      </div>
      <div class="item">
          <img src="images/icons/reddit-icon.png">
      </div>
      <div class="item">
          <img src="images/icons/soundcloud-icon.png">
      </div>
    </div>

  <!-- Left and right controls -->
  <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev" style="background-image:none;">
    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next" style="background-image:none;">
    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

*/
