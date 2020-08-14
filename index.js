const puppeteer = require('puppeteer');
const fs = require('fs');
const download = require('./download');
const prompt =  require('prompt-sync')();

(async () => {
  let user = 'teste';

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Ler input
  user = prompt("Entre com o nome do usuário: ");
  
  await page.goto(`https://www.instagram.com/${user}`);

  const imgList = await page.evaluate(()=>{
    const nodeList = document.querySelectorAll('article img');

    const imgHtmlList = [...nodeList];

    const imgList = imgHtmlList.map(({src}) => ({src}))

    return imgList;

  })
  
  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
    if(err) throw new Error('Something went wrong!');
  })
  
  imgList.forEach(img=>{
    download(img.src,user);
  })
  
  await browser.close();
})();