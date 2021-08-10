const express = require("express");
const router = express.Router();
const model = require("./model") 
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2

cloudinary.config({ 
    cloud_name: 'drgvu7vxa', 
    api_key: '149993817168625', 
    api_secret: 'NfZdLmcrYDFfKCq8-j_gWqpAcds' 
  });
  
  const storage = multer.diskStorage({
      destination: (req, file, cb) =>{
        cb(null, './uploads')
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      }
    })
     
    const upload = multer({ storage: storage })

router.post("/", upload.single("image"), async (req,res) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path)
        console.log(result)

        const newData = await model.create({
            name:req.body.name,
            club:req.body.club,
            country:req.body.country,
            position:req.body.position,
            age:req.body.age,
            cloud_id:result.public_id,
            image:result.secure_url,
            path:req.file.path,
      
        })
        res.status(201).json({
            message:"successful",
            data: newData,
        })
    }catch (error) {
        res.status(400).json({
            message:"error.message",
            data:"error"
        })
    }
})




router.get("/", async (req, res) => {
  const allArtist = await model.find();
  try {
    res.status(200).json({
      message: "all artists found",
      data: allArtist,
    });
  } catch (error) {
    res.status(404).json({
      message: "list not found",
      data: allArtist,
    });
  }
});

router.get("/:id", async (req, res) => {
  const oneArtist = await model.findById(req.params.id);
  try {
    res.status(200).json({
      message: "artists found",
      data: oneArtist,
    });
  } catch (error) {
    res.status(404).json({
      message: "artist not found",
      data: oneArtist,
    });
  }
});

// router.put("/:id", upload, async (req, res) => {
//   try{
//     const findId = await findNyId(req.params.id)
//     if (findId) {
//       await cloudinary.uploader.destroy(cloud_id)
//     }
//     const result = await cloudinary.uploader.upload(req.file.path)
//     const newData = {
//       name:req.body.name,
//       club:req.body.club,
//       country:req.body.country,
//       position:req.body.position,
//       age:req.body.age,
//       // cloud_id:result.public_id,
//       image:result.secure_url,
//       // path:req.file.path,
//    };
//    const newUpdate = await model.findByIdAndUpdate(newData)
//    res.status(200).json({
//    message:"success",
//    data:newUpdate
//    })
//   }catch (err) {
//     res.status(400).json({
//       message:"error.massage",
//       data:"error"
//     })
//   }
// }



// router.patch("/:id", upload, async (req, res) => {
//   const updatedData = {
//     image: req.file.path,
//     name:req.body.name,
//     club:req.body.club,
//      country:req.body.country,
//      age:req.body.age,
//      foot:req.body.foot,
//     //  cloud_id:result.public_id,
//     //  image:result.secure_url,
//     //  path:req.file.path,
//   };

//   try {
//     const updateArtist = await model.findByIdAndUpdate(req.params.id, updatedData);
//     res.status(200).json({
//       message: "artist found",
//       data: updateArtist,
//     });
//   } catch (error) {
//     res.status(404).json({
//       message: error.message,
//       data: "error",
//     });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   const deleteArtist = await model.findByIdAndRemove(req.params.id, req.body);
//   try {
//     res.status(200).json({
//       message: "artist deleted",
//       data: deleteArtist,
//     });
//   } catch (error) {
//     res.status(404).json({
//       message: "artist not deleted",
//       data: deleteArtist,
//     });
//   }
// });

module.exports = router;
