const Vendor = require("../models/vendor");
const { nanoid } = require("nanoid");

const router = require("express").Router();

router.post("/create", async (req, res) => {
  try {
    const newVendor = new Vendor(req.body);
    const savedVendor = await newVendor.save();

    const { _id: vendorFormId } = savedVendor._doc;

    //generate link
    const nanoId = nanoid(10);
    const generateLink = `${process.env.VENDOR_REG_URL}/${nanoId}`;

    await Vendor.findByIdAndUpdate(vendorFormId, {
      link: nanoId,
      isActive: true,
    });

    res.status(201).json(generateLink);
  } catch (error) {
    console.log(error);
  }
});

router.post("/send_email", async (req, res) => {
  try {
    const { emails, description, link } = req.body;

    if (!emails) {
      res.status(400).send("Emails not found!");
    }

    if (!link) {
      res.status(400).send("Link not found!");
    }

    for (const email of emails) {
      //send email
      const renderData = description;
      //email config to send data
      console.log(email);
    }

    res.send({ type: "success" });

    // const renderData = {
    //   name: "Rohan",
    //   age: 26,
    // };

    // res.render("verify_link", { demo: renderData });
  } catch (error) {
    console.log(error);
  }
});

router.get("/verify_link/:token", async (req, res) => {
  try {
    const token = req.params.token;

    if (!token) res.status(400).send("Token not found!");

    const vendorData = await Vendor.findOne({ link: token });

    if (vendorData) {
      if (vendorData?.isActive === true) {
        //redirect to active link page
        res.status(200).json(vendorData);
      } else {
        //inactive link
        res.status(400).json({ message: "Inactive Link" });
      }
    } else {
      //invalid token
      res.status(400).json({ message: "Invalid Token" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/:vendorId", async (req, res) => {
  try {
    const vendorId = req.params.vendorId;
    if (!vendorId) {
      res.status(400).send("Invalid Vendor Id");
    }

    const formData = req.body;
    formData["isActive"] = false;

    await Vendor.findByIdAndUpdate(vendorId, formData);

    res.status(200).send({ type: "success" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
