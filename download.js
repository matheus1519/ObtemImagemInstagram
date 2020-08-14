const download = require('image-downloader')
const path = require('path');
const fs = require('fs');

const downloadImage = (url,user)=>{

  let dir = path.resolve(__dirname,'images', user);

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  const options = {
    url,
    dest: dir       
  }
  
  download.image(options)
    .then(({ filename }) => {
      console.log('Saved to', filename) 
    })
    .catch((err) => console.error(err))
  
}

module.exports = downloadImage;