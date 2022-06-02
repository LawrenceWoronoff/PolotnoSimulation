const fs = require('fs');
// import fetch from 'node-fetch';
const fetch = require('node-fetch');
// import fetch from 'fetch';

const { createInstance } = require('polotno-node');

let layerChecked = {
  bath_count: false,
  bath_icon: false,
  bed_count: false,
  bed_icon: false,
  car_count: false,
  car_icon: false,
  gradient_overlay: false,
  street_address: false,
  suburb: false,
  priceview: false,
  listing_image: false,
};
async function getBlob (url) {
  let blob = await fetch(url).then(r => r.blob());
  console.log(blob);
  return blob;
}

exports.run = async function (req, res, next) {
    const jsonFileName = req.body.jsonFile;
    const feed = req.body.feed;

    // create working instance
    const instance = await createInstance({
      // to create your own API key please go here: https://polotno.com/cabinet
      key: 'nFA5H9elEytDyPyvKL7T',
    });

    // load sample json
    let jsonFileObj = fs.readFileSync('templates/'+ jsonFileName);
    let canvasObj = JSON.parse(jsonFileObj);
    let children = canvasObj.pages[0].children;
    
    children.forEach(child => {
      // console.log(child);
      switch(child.name) {
        case 'listing_image':
          layerChecked.listing_image = true;
          // child.src = feed.listing_image;
          
          // console.log(getBlob)
          // if(feed.hasOwnProperty('listing_image') && feed.listing_image != ""){
          //   getBlob(feed.listing_image);
          //   // console.log(blob);
          // }
          break;
        case 'bath_count':
          layerChecked.bath_count = true;
          child.text = feed.bath_count;
          break;
        case 'bath_icon':
          layerChecked.bath_icon = true;
          let bathColorKeys = Object.keys(child.colorsReplace);
          if(feed.hasOwnProperty('bath_icon') && feed.bath_icon != "")
            child.colorsReplace[bathColorKeys[0]] = feed.bath_icon;
            break;
        case 'bed_count':
          layerChecked.bed_count = true;
          if(feed.hasOwnProperty('bed_count') && feed.bed_count != "")
            child.text = feed.bed_count;
          break;
        case 'bed_icon':
          layerChecked.bed_icon = true;
          let bedColorKeys = Object.keys(child.colorsReplace);
          if(feed.hasOwnProperty('bed_icon') && feed.bed_icon != "")
            child.colorsReplace[bedColorKeys[0]] = feed.bed_icon;
          break;
        case 'car_count':
          layerChecked.car_count = true;
          if(feed.hasOwnProperty('car_count') && feed.car_count != "")
            child.text = feed.car_count;
          break;
        case 'car_icon':
          layerChecked.car_icon = true;
          let carColorkeys = Object.keys(child.colorsReplace);
          if(feed.hasOwnProperty('car_icon') && feed.car_icon != "")
            child.colorsReplace[carColorkeys[0]] = feed.car_icon;
          break;
        case 'gradient_overlay':
          layerChecked.gradient_overlay = true;
          // let gradientOverlayKeys = Object.keys(child.colorsReplace);
          if(feed.hasOwnProperty('gradient_overlay') && feed.gradient_overlay != "")
          {
            console.log(feed.gradient_overlay)
            let fullStr = feed.gradient_overlay.replace(/"/g, '').trim();
            let keyValue = fullStr.split(":");
            console.log(keyValue);
            
            if(keyValue.length < 2)
              return;
            child.colorsReplace = {};
            child.colorsReplace[keyValue[0]] = keyValue[1];
            console.log(child.colorsReplace);
          }
          break;
        case 'street_address':
          layerChecked.street_address = true;
          if(feed.hasOwnProperty('street_address') && feed.street_address != "")
            child.text = feed.street_address;
          break;
        case 'suburb':
          layerChecked.suburb = true;
          if(feed.hasOwnProperty('suburb') && feed.suburb != "")
            child.text = feed.suburb;
          break;
        case 'priceview':
          layerChecked.priceview = true;
          if(feed.hasOwnProperty('priceview') && feed.priceview != "")
            child.text = feed.priceview;
          break;
      }
    });

    console.log(layerChecked);
    let invalid_layers = [];
    
    Object.keys(layerChecked).forEach((key)=>{
      if(layerChecked[key] == false)
        invalid_layers.push(key);
    })
    const jpegImage = await instance.jsonToImageBase64(canvasObj, {
      pixelRatio: 0.5, // make image twice smaller
      mimeType: 'image/jpeg',
    });
    // fs.writeFileSync('template.jpg', jpegImage, 'base64');

    // close instance
    instance.close();


  return res.status(200).json({ status: 'success', data: jpegImage, warning: invalid_layers});
};

exports.templateView = async function (req, res, next) {
      const jsonFileName = req.body.jsonFile;

      // create working instance
      const instance = await createInstance({
        // to create your own API key please go here: https://polotno.com/cabinet
        key: 'nFA5H9elEytDyPyvKL7T',
      });

      // load sample json
      let jsonFileObj = fs.readFileSync('templates/'+ jsonFileName);
      let jsonStr = String(jsonFileObj);
      const json = JSON.parse(jsonStr);
      //  console.log(json);

      
      const jpegImage = await instance.jsonToImageBase64(json, {
        pixelRatio: 0.5, // make image twice smaller
        mimeType: 'image/jpeg',
      });
      // fs.writeFileSync('template.jpg', jpegImage, 'base64');

      // close instance
      instance.close();

    return res.status(200).json({ status: 'success', data: jpegImage});
  // });
};