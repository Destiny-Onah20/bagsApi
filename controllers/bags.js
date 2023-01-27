const modelName = require("../models/bagModel");
const cloudinary = require("../helpers/cloudinary")

exports.createBag = async(req,res)=>{
    try {
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath);
        const bagData = {
            title: req.body.title,
            desc: req.body.desc,
            image: result.secure_url,
            price: req.body.price,
            cloudId: result.public_id
        };
        const created = await modelName.create(bagData);
        res.status(201).json({
            message: "Post created successfully...",
            data: created
        });                
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.delBag = async(req,res)=>{
    try {
        const bagId = req.params.bagId;
        const getId = await modelName.findById(bagId);
        await cloudinary.uploader.destroy(getId.cloudId);
        await modelName.findByIdAndDelete(bagId);
        res.status(200).json({
            message: "Deleted successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.getAll = async (req,res)=>{
    try {
        const all = await modelName.find();
        res.status(200).json({
            message: all.length,
            data: all
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};