const Post = require("../data/models/Post");
const ServiceResponse = require("../services/ServiceResponse.js");
const path = require("path");
const fs = require("fs");

function decode_base64(base64str) {
  const img_parts = base64str.split(';base64');
  const img_type = img_parts[0].split('image/')[1];
  const filename = new Date().getTime() + '.' + img_type;
  const imgPath = path.join(__dirname, "..", "/client-app/public/static/assets/posts", filename);
  const buffer = new Buffer.from(img_parts[1], "base64");

  fs.writeFileSync(imgPath, buffer);
  return filename;
}

exports.createPost = async (req, res, next) => {
  const filename = decode_base64(req.body.Image);
  try {
    const post = await Post.findOne({ where: { Title: req.body.Title } });
    if (!post) {
      await new Post({
        Title: req.body.Title,
        ShortDescription: req.body.ShortDescription,
        Description: req.body.Description,
        CategoryId: req.body.CategoryId,
        Image: filename,
        UserId: req.body.UserId,
      }).save();
      const posts = await Post.findAll();
      res
        .status(200)
        .json(
          new ServiceResponse(
            "Post successfully created.",
            null,
            null,
            true,
            posts
          )
        );
    } else {
      res
        .status(404)
        .json(
          new ServiceResponse(
            `Post with title ${req.body.Title} exists.`,
            null,
            null,
            false,
            null
          )
        );
    }
  } catch (error) {
    console.log('error=>>>>>>>>>>>>>>>>>>>>', error)
    res
      .status(500)
      .json(new ServiceResponse("Server error.", null, error, false, null));
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll();
    if (posts) {
      res
        .status(200)
        .json(
          new ServiceResponse(
            "All posts successfully loaded.",
            null,
            null,
            true,
            posts
          )
        );
    } else {
      res
        .status(404)
        .json(new ServiceResponse("Posts not found.", null, null, false, null));
    }
  } catch (error) {
    res
      .status(500)
      .json(new ServiceResponse("Server error.", null, error, false, null));
  }
};

exports.getPostById = async (req, res, next) => {
  const { id } = req.body;
  try {
    const post = await Post.findOne({
      where: { id: id },
    });
    if (post) {
      res
        .status(200)
        .json(
          new ServiceResponse(
            "Post successfully loaded.",
            null,
            null,
            true,
            post
          )
        );
    } else {
      res
        .status(200)
        .json(new ServiceResponse("Post not found.", null, null, false, null));
    }
  } catch (error) {
    res
      .status(500)
      .json(new ServiceResponse("Server error.", null, error, false, null));
  }
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const post = await Post.findOne({ where: { id: postId } });
    if (post) {
      await Post.destroy({
        where: { id: postId },
      });
      const posts = await Post.findAll();
      res
        .status(200)
        .json(
          new ServiceResponse(
            "Post successfully deleted.",
            null,
            null,
            true,
            posts
          )
        );
    } else {
      res
        .status(200)
        .json(new ServiceResponse("Post not found.", null, null, false, null));
    }
  } catch (error) {
    res
      .status(500)
      .json(new ServiceResponse("Server error.", null, error, false, null));
  }
};

exports.updatePost = async (req, res, next) => {
  const filename = decode_base64(req.body.Image);
  try {
    const updatedPost = {
      id: req.body.id,
      Title: req.body.Title,
      ShortDescription: req.body.ShortDescription,
      Description: req.body.Description,
      CategoryId: req.body.CategoryId,
      Image: filename,
      UserId: req.body.UserId,
    };
    const result = await Post.update(updatedPost, {
      where: { id: req.body.id },
    });

    if (!result) {
      res
        .status(200)
        .json(new ServiceResponse("Post not updated.", null, null, true, null));
    } else {
      const posts = await Post.findAll();
      res
        .status(200)
        .json(
          new ServiceResponse(
            "Post successfully updated.",
            null,
            null,
            true,
            posts
          )
        );
    }
  } catch (error) {
    res
      .status(500)
      .json(new ServiceResponse("Server error.", null, error, false, null));
  }
};
