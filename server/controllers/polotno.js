const fs = require('fs');
// import polotno-node API
const { createInstance } = require('polotno-node');


exports.run = async function (req, res, next) {
  // const userId = req.params.userId;


  // if (req.user._id.toString() !== userId) { return res.status(401).json({ error: 'You are not authorized to view this user profile.' }); }
  // User.findById(userId, (err, user) => {
  //   if (err) {
  //     res.status(400).json({ error: 'No user could be found for this ID.' });
  //     return next(err);
  //   }

  //   const userToReturn = setUserInfo(user);

      // create working instance
      const instance = await createInstance({
        // to create your own API key please go here: https://polotno.com/cabinet
        key: 'nFA5H9elEytDyPyvKL7T',
      });

      // load sample json
      let jsonFileObj = fs.readFileSync('CrossTemplate.json');
      let jsonStr = String(jsonFileObj);
      jsonStr = jsonStr.replace("SUNDAY", "FRIDAY");
      const json = JSON.parse(jsonStr);
      //  console.log(json);

      
      const jpegImage = await instance.jsonToImageBase64(json, {
        pixelRatio: 0.5, // make image twice smaller
        mimeType: 'image/jpeg',
      });
      fs.writeFileSync('out.jpg', jpegImage, 'base64');

      // close instance
      instance.close();

    return res.status(200).json({ status: 'success' });
  // });
};
