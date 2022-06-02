const multer = require('multer');
const path = require("path");

exports.uploadFile = async function (req, res, next) {
  
  const storage = multer.diskStorage({
    destination: "./templates/",
    filename: function(req, file, cb){
       cb(null,"Template-" + Date.now() + path.extname(file.originalname));
    }
 });
 const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
  }).single("myfile");

  
  upload(req, res, () => {
      // console.log("Request ---", req.body);
      // console.log("Request file ---", req.file);//Here you get file.
      console.log(req.file.filename);
      return res.status(200).json({ status: 'success', data: req.file.filename});

      // const file = new File();
      // file.meta_data = req.file;
      // file.save().then(()=>{
      // res.send({message:"uploaded successfully"})
      // })

      res.send({message:"uploaded successfully"})
      /*Now do where ever you want to do*/
  });

  // return res.status(200).json({ status: 'success', data: jpegImage});
};
