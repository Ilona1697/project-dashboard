const Category = require("../data/models/Category");
const Post = require("../data/models/Post");
const ServiceResponse = require("../services/ServiceResponse");

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    if (categories) {
      res
        .status(200)
        .json(
          new ServiceResponse(
            "All categories successfully loaded.",
            null,
            null,
            true,
            categories
          )
        );
    } else {
      res
        .status(404)
        .json(
          new ServiceResponse("Categories not found.", null, null, false, null)
        );
    }
  } catch (error) {
    res
      .status(500)
      .json(new ServiceResponse("Server error.", null, error, false, null));
  }
};

exports.updateCategory = async (req, res, next) => {
  const id = req.body.id;
  const Name = req.body.name;
  const updatedCategory = {
    id,
    Name,
  };
  try {
    const result = await Category.update(updatedCategory, {
      where: { id: id },
    });
    if (!result) {
      res
        .status(400)
        .json(
          new ServiceResponse("Category not updated.", null, null, false, null)
        );
    } else {
      res
        .status(200)
        .json(
          new ServiceResponse(
            "Category successfully updated.",
            null,
            null,
            true,
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

exports.deleteCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findOne({ where: { id: categoryId } });
    if (category) {
      await Post.update({ CategoryId: null }, { where: { CategoryId: categoryId } })

      await Category.destroy({
        where: { id: categoryId },
      });
      const categories = await Category.findAll();
      res
        .status(200)
        .json(
          new ServiceResponse(
            "Category successfully deleted.",
            null,
            null,
            true,
            categories
          )
        );
    } else {
      res
        .status(200)
        .json(
          new ServiceResponse("Category not found.", null, null, false, null)
        );
    }
  } catch (error) {
    res
      .status(500)
      .json(new ServiceResponse("Server error.", null, error, false, null));
  }
};

exports.createCategory = async (req, res, next) => {
  const { Name } = req.body;
  try {
    const category = await Category.findOne({
      where: { Name: Name },
    });
    if (!category) {
      const newCategory = new Category({
        Name,
      });
      await newCategory.save();
      const categories = await Category.findAll();
      res
        .status(200)
        .json(
          new ServiceResponse(
            "Category successfully created.",
            null,
            null,
            true,
            categories
          )
        );
    } else {
      res
        .status(200)
        .json(
          new ServiceResponse(
            `Category ${Name} exists.`,
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

exports.getCategoryById = async (req, res, next) => {
  const { id } = req.body;
  try {
    const category = await Category.findOne({
      where: { id: id },
    });
    if (category) {
      res
        .status(200)
        .json(
          new ServiceResponse(
            "Category successfully loaded.",
            null,
            null,
            true,
            category
          )
        );
    } else {
      res
        .status(200)
        .json(
          new ServiceResponse("Category not found.", null, null, false, null)
        );
    }
  } catch (error) {
    res
      .status(500)
      .json(new ServiceResponse("Server error.", null, error, false, null));
  }
};
