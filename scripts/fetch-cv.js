const axios = require('axios');
const fs = require('fs');

axios.get('https://raw.githubusercontent.com/brandonwkipp/cv/main/README.md')
  .then((response) => {
    if (response.status === 200) {
      fs.writeFileSync(
        'src/markdown/cv.md',
        response.data.split('\n').slice(6).join('\n'),
      );
    }
  });
