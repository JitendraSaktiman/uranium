const blogModel = require('../models/blogModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


// createBlog

const createBlog = async function (req, res) {
    try {
        let Blogs = req.body;
        let createblogs = await blogModel.create(Blogs);
        return res.status(201).send({ status: true, msg: createblogs });
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
}
module.exports.createBlog = createBlog;


// getBlogs

const getBlogs = async function (req, res) {
    try {
        let data = req.query
        // find the all data filter and query
        let blogs = await blogModel.find({ $and: [{ isDeleted: false }, { isPublished: true }, data] });

        // check data exits or not
        if (blogs.length <= 0) {
            return res.status(400).send({ status: false, msg: 'Data Not Found' })
        }
        return res.status(200).send({ status: true, data: blogs })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
module.exports.getBlogs = getBlogs;


//  updateBlog
const updateblogs = async function (req, res) {
    try {
        let Id = req.params.blogId;
        let userData = req.body;

        let { body, title, isPublished, tags, subcategory, isDeleted } = userData

        if (Id.length < 24) {
            return res.status(404).send({ msg: "Enter Valid Blog-Id" });
        }
        let user = await blogModel.findById(Id)
        if (!user) {
            return res.status(404).send({ staus: false, msg: "No such blog exists" });
        }

        let updateBlog1 = await blogModel.findByIdAndUpdate({ _id: Id }, {
            $set: { body: body, title: title, isPublished: isPublished, isDeleted: isDeleted },
            $push: { tags: tags, subcategory: subcategory }
        }, { new: true })

        if (updateBlog1.isPublished == true) {
            // updating date in publishedAt if is published true
            let update = await blogModel.findOneAndUpdate({ _id: Id }, { publishedAt: new String(Date()) });
        }
        if (updateBlog1.isPublished == false) {
            let update = await blogModel.findOneAndUpdate({ _id: Id }, { publishedAt: null });;
        }
        if (updateBlog1.isDeleted == true) {
            let update = await blogModel.findOneAndUpdate({ _id: Id }, { deletedAt: new String(Date()) });
        }
        if (updateBlog1.isDeleted == false) {
            let update = await blogModel.findOneAndUpdate({ _id: Id }, { deletedAt: null });
        }

        return res.status(201).send({ status: true, data: updateBlog1 });
    }
    catch (err) {
        return res.status(500).send({ msg: err.message });
    }
};
module.exports.updateblogs = updateblogs;


// deleteBlogs

const deleteBlogs = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        if (blogId.length < 24) {
            return res.status(400).send("Invlid Blog-Id")
        }
        // Check if the blogId exists
        if (!blogId) {
            return res.status(400).send({ msg: "Enter Blog-Id In Your Params" });
        }
        let validID = await blogModel.findById(blogId);
        if (!validID) {
            return res.status(404).send({ msg: "Enter Valid Blog-Id" });
        }

        let checkid = validID.isDeleted;
        if (validID) {
            if (checkid == false) {
                // mark it deleted
                let blogDelete = await blogModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true }, { new: true });
                if (blogDelete.isDeleted == true) {
                    let update = await blogModel.findOneAndUpdate({ _id: blogId }, { deletedAt: new String(Date()) });
                }
                if (blogDelete.isDeleted == false) {
                    let update = await blogModel.findOneAndUpdate({ _id: blogId }, { deletedAt: null });
                }
                return res.status(201).send({ status: true, data: blogDelete });
            }
            else {
                // If the blog document doesn't exist then return an HTTP status of 404
                return res.status(400).send({ status: false, msg: "Blog Is Deleted" });
            }
        }
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
}
module.exports.deleteBlogs = deleteBlogs;


// deleteByQuery
const queryDeleted = async function (req, res) {
    try {
        let data = req.query;
        let blog = req.query.authorId;

        if (!blog) {
            return res.status(400).send({ status: false, msg: "Plz Enter authorId In Query" });
        }

        let valid = await blogModel.findOne(data);
        if (!valid) {
            return res.status(404).send({ status: false, msg: "Data doesn't exit!!" })
        }

        if (Object.values(data).length <= 0) {
            return res.status(400).send({ status: false, msg: "Input Missing" });
        }

        let deleted = await blogModel.findOneAndUpdate(data, { isDeleted: true }, { new: true });
        if (deleted.isDeleted == true) {
            let update = await blogModel.findOneAndUpdate({ _id: blog }, { deletedAt: new String(Date()) });
        }
        if (deleted.isDeleted == false) {
            let update = await blogModel.findOneAndUpdate({ _id: blog }, { deletedAt: null });
        }
        return res.status(200).send({ status: true, data: deleted });
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
module.exports.queryDeleted = queryDeleted;