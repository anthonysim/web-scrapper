const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

const url = 'https://www.theguardian.com/us';

axios.get(url)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);
    const articlesArr = [];

    $('.fc-item__header', html).each(function () {
      const title = $(this).text().match(/[a-zA-Z0-9" "]/gi).join('').trim();
      const href = $(this).find('a').attr('href');

      articlesArr.push({
        title,
        href,
      })
    })
    console.log(articlesArr);
  }).catch(err => console.error(err));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}!`);
})
