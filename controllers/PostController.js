const Post = require("../data/models/Post");
const ServiceResponse = require("../services/ServiceResponse");

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { Title: req.body.Title } });
    if (!post) {
      await new Post({
        Title: req.body.Title,
        ShortDescription: req.body.ShortDescription,
        Description: req.body.Description,
        CategoryId: req.body.CategoryId,
        Image: req.body.Image,
        UserId: req.body.UserId,
      }).save();

      res
        .status(200)
        .json(
          new ServiceResponse(
            "Post successfully created.",
            null,
            null,
            true,
            null
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
  const { id } = req.body;
  try {
    const post = await Post.findOne({ where: { id: id } });
    console.log("Post -> ", post);
    if (post) {
      console.log("post ===> ", post);
      await Post.destroy({
        where: { id: id },
      });
      res
        .status(200)
        .json(
          new ServiceResponse(
            "Post successfully deleted.",
            null,
            null,
            true,
            null
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
  console.log(req.body);
  try {
    const updatedPost = {
      id: req.body.id,
      Title: req.body.Title,
      ShortDescription: req.body.ShortDescription,
      Description: req.body.Description,
      CategoryId: req.body.CategoryId,
      Image: req.body.Image,
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
      res
        .status(200)
        .json(
          new ServiceResponse(
            "Post successfully updated.",
            null,
            null,
            true,
            updatedPost
          )
        );
    }
  } catch (error) {
    res
      .status(500)
      .json(new ServiceResponse("Server error.", null, error, false, null));
  }
};
