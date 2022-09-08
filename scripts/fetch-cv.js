const axios = require('axios');
const beautify = require('js-beautify').html;
const fs = require('fs');
const marked = require('marked');

axios.get('https://raw.githubusercontent.com/brandonwkipp/cv/main/README.md')
  .then((response) => {
    if (response.status === 200) {
      let resume = `
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <link rel="manifest" href="brandonwkipp.webmanifest">
        <link rel="stylesheet" href="../styles/index.css">
        <meta content="text/html; charset=utf-8" httpEquiv="Content-Type" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#e2ffd8" />
        <meta name="Description" content="Software Engineer &amp; Musician." />
        <meta name="theme-color" content="#e2ffd8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Brandon W. Kipp</title>
      </head>

      <body>
        <main>
          <header>
            <h2>Brandon W. Kipp, <small>Software Engineer & Musician</small></h2>
          </header>
          <hr />
          <section>
      `;

      resume += marked.parse(
        response.data.split('\n').slice(6).join('\n'),
        { headerIds: false, xhtml: true },
      );

      resume += `</section>
          </body>
        </html>
      `;

      fs.writeFileSync(
        'src/resume/index.html',
        beautify(
          resume,
          {
            end_with_newline: true,
            indent_size: 2,
            space_around_combinator: true,
          },
        ),
      );
    }
  });
