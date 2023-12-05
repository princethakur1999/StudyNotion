const category = require('../models/category');
const courseSchema = require('../models/course');

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}


exports.createCategory = async (req, res) => {

  try {

    const { name, description } = req.body;

    //check if any of the fields are empty
    if (!name || !description) {

      return res.status(400).json({

        success: false,
        message: 'All fields are required'
      });
    }

    //create entry in DB
    const categoryDetails = await category.create({ name, description });

    return res.status(200).json({
      success: true,
      message: 'Category created successfully'
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error while creating Category',
      error
    });
  }
}

//get all categories
exports.showAllCategories = async (req, res) => {

  try {
    const allCategories = await category.find({}, { name: true, description: true });

    if (!allCategories) {

      return res.status(404).json({

        success: false,
        message: 'No categories found',
      });
    }

    return res.status(200).json({

      success: true,
      message: 'All categories fetched',
      allCategories,
    });

  } catch (error) {

    console.error('Error while retrieving Categories:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message, // Send the error message for debugging purposes.
    });
  }
};


exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    console.log("PRINTING CATEGORY ID: ", categoryId);

    // Get courses for the specified category
    const selected_Category = await category.findById(categoryId);

    console.log("####selected_Category", selected_Category)

    // Handle the case when the category is not found
    if (!selected_Category) {
      console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    }

    let selectedCategory = {
      name: selected_Category.name,
      description: selected_Category.description
    };

    selectedCategory.courses = await courseSchema.find({ status: 'Published', category: categoryId })
      .populate("ratingAndReviews")
      .populate("instructor")
      .exec();


    // Handle the case when there are no courses
    if (selectedCategory.courses.length === 0) {

      console.log("No courses found for the selected category.");

      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      })
    }


    // Get courses for other categories
    const categoriesExceptSelected = await category.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = {
      courses: []
    };


    try {
      const randomCategoryIndex = getRandomInt(categoriesExceptSelected.length);
      const randomCategoryId = categoriesExceptSelected[randomCategoryIndex]._id;

      const course = await courseSchema.findOne({ status: 'Published', category: randomCategoryId })
        .populate("ratingAndReviews")
        .populate("instructor")
        .exec();

      if (course) {

        differentCategory.courses.push(course);

      } else {

        console.error('No published course found for the selected category.');
      }

    } catch (error) {

      console.error('Error querying the database:', error);
    }


    console.log("JAY SHREE RAM");

    // Get top-selling courses across all categories
    const allCategories = await courseSchema.find({ status: 'Published' })
      .populate("ratingAndReviews")
      .populate("instructor")
      .exec();



    const allCourses = allCategories.flatMap((category) => category);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);


    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}
