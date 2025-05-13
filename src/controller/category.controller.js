import category from "../models/category.model.js";
import subCategory from "../models/subCategory.model.js";
import food from "../models/food.model.js";

export async function categoryCreate(req,res) {
  const {Category} = req.body
  // const {authType}= req.user

  // if (authType != "Owner") {
  //   return res.status(401).send("UnAuthorized")
  // }

  try {
    const check = await category.findOne({Category})
    if(check){
      return res.status(400).send("Category Already Exist")
    }
    
    const option = await new category({
      Category
    })
    await option.save()
    res.status(201).send(option)
  } catch (error) {
    console.log(error)
    res.status(500).send("SERVER ERROR")
  }
}

export async function categoryRead(req, res) {
    
    try {
      const check = await category.find()
      if (!check) {
        return res.status(404).send("Not Found");
      } 
    
      res.status(201).send(check);
    } catch (error) {
      console.log(error);
      res.status(500).send("SERVER ERROR");
    }
  }

  export async function cascadingDelete(req, res) {
    try {
      const categoryId = req.params.id;
      console.log(categoryId)

      //find subcategories linked to the category
      const subcategories = await subCategory.find({categoryId});

      //get all subcategory IDs
      const subcategoryIds = subcategories.map((sub) => sub._id);

      //delete foods linked to the subcategories
      await food.deleteMany({subCategoryId: { $in: subcategoryIds}});

      //delete the subcategories
      await subCategory.deleteMany({categoryId});

      //delete the category
      await category.findByIdAndDelete(categoryId);

      res.status(200).send("Category and related data deleted successfully")
      
    } catch (error) {
      console.log(error)
      res.status(500).send('Error deleting category');
      
    }
    
  }
  