const router = require("express").Router();
const multer = require("multer");

const Listing = require("../models/Listing");
const User = require('../models/User');

/* Configuration multer for file upload */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* CREATE A NEW LISTING */
router.post(
  "/create",
  upload.array("listingPhotos"), async (req, res) => {
    try {
      /* Take the information from the form */
      const {
        creator,
        category,
        type,
        streetAddress,
        aptSuite,
        city,
        province,
        country,
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount,
        amenities,
        description,
        highlight,
        highlightDesc,
        price,
      } = req.body;


      const listingPhotos = req.files

      if(! listingPhotos){
        return res.status(400).send("No file uploaded");
    }

    const listingPhotosPath = listingPhotos.map((file)=>file.path)

    const newListing = new Listing({
        ...req.body,
        listingPhotosPath
    });

    await newListing.save();
    res.status(200).json(newListing);

    } catch (error) {
        res.status(409).json({message: 'Failed to create listing', error: error.message})
        console.error(error)
    }
  }
);

/* GET ALL LISTINGS */
router.get('/', async(req, res)=>{
    const qCategory = req.query.category
    try {
        let listings
        if(qCategory){
            listings = await Listing.find({category: qCategory}).populate('creator')
    }
    else{
        listings = await Listing.find()
    }

    res.status(200).json(listings)
}
         catch (error) {
            res.status(409).json({message: 'Failed to fetch listings', error: error.message})
        
    }
})

module.exports = router