const mongoose = require('mongoose');

const choiceSchema = mongoose.Schema({
    _id: {
        type: String,
        default: function () {
            return nanoid(10);
        },
    },
    choice:{
        type:String
    }
},
{timestamps: true}
);

module.exports = mongoose.model('Choice', choiceSchema)


const questionSchema = mongoose.Schema({
    _id: {
        type: String,
        default: function () {
            return nanoid(10);
        },
    },
    qtype:{
        type:String,
        required:true,
    },
    question:{
        type:String,
        required:true,
    },
    answer:{
        type:String,                                                                                                                                                              
    },
    choices:[
       {
        type:String,
        ref: 'Choice'
     }
    ]
},
{timestamps: true}
);

module.exports = mongoose.model('Question', questionSchema)

const sectionSchema = mongoose.Schema({
    _id: {
        type: String,
        default: function () {
            return nanoid(10);
        },
    },
    qtype:{
        type:String,
        required:true,
        default:"section"
    },
    questions:[
        {
            type:String,
            ref: 'Question'
         }
    ],
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
},
{timestamps: true}
);

module.exports = mongoose.model('Section', sectionSchema)

const vendorSchema = mongoose.Schema({
    _id: {
        type: String,
        default: function () {
            return nanoid(10);
        },
    },
    vendorName:{
        type:String,
        required:true,
    },
    vendorType:{
        type:String,
        required:true,
    },
    pointOfContact:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    contactNumber:{
        type:String,
        required:true,
    },
    website:{
        type:String,
        required:true,
    },
    
    sections:[
        {
            type:String,
            ref: 'Section'
         }
    ]
},
{timestamps: true}
);


module.exports = mongoose.model("VendorForm", vendorSchema)
