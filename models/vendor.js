const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const vendorSchema = mongoose.Schema({
  _id: {
    type: String,
    default: function () {
      return nanoid(10);
    },
  },
  link: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  vendorName: {
    type: String,
    required: true,
  },
  vendorType: {
    type: String,
    required: true,
  },
  pointOfContact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  sections: [
    {
      _id: {
        type: String,
        default: function () {
          return nanoid(10);
        },
      },
      qtype: {
        type: String,
        required: true,
        default: "section",
      },
      questions: [
        {
          _id: {
            type: String,
            default: function () {
              return nanoid(10);
            },
          },
          qtype: {
            type: String,
            required: true,
          },
          question: {
            type: String,
            required: true,
          },
          answer: {
            type: String,
          },
          choices: [
            {
              _id: {
                type: String,
                default: function () {
                  return nanoid(10);
                },
              },
              choice: {
                type: String,
              },
            },
          ],
        },
      ],
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});

let vendor = mongoose.model("Vendor", vendorSchema);
vendor.createCollection();
module.exports = vendor;
