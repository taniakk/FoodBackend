import subCategory from "../models/subCategory.model.js";
import category from "../models/category.model.js";
import food from "../models/food.model.js";


export async function subCategoryCreate(req, res) {
  const { Subcategory_name, Category } = req.body;
  // const{authType} = req.user

  // if(authType!="Owner"){
  //   return res.status(401).send("UnAuthorized")
  // }
  console.log(req.body)
  try {
    const check = await subCategory.find({ Subcategory_name });
    // console.log(check)
    // if (check.length !==0) {
    //   return res.status(400).send("Subcategory Already Exists");
    // }
    // console.log(check)
    const checkCategory = await category.findOne({ Category })
    // console.log(checkCategory)
    if (!checkCategory) {
      return res.status(400).send(" Category Not Found");
    }
    const checkBoth = await subCategory.find({Subcategory_name, categoryId: checkCategory._id})
    if(checkBoth.length !==0){
      return res.status(404).send("Already Exists")
    }
    const option = new subCategory({
      Subcategory_name,
      categoryId: checkCategory._id
    });
    console.log(option)

    await option.save();
    res.status(201).send(option);
  } catch (error) {
    console.log(error);
    res.status(500).send("SERVER ERROR");
  }
}

export async function subCategoryRead(req, res) {

  try {
    const check = await subCategory.find().populate('categoryId')
    if (!check) {
      return res.status(400).send("Not Found");
    }

    res.status(200).send(check);
  } catch (error) {
    console.log(error);
    res.status(500).send("SERVER ERROR");
  }
}

export async function CategoryReadById(req, res) {
  try{
    const { categoryId } = req.params;
    console.log(categoryId)
    const categoryExists = await category.findOne({_id:categoryId});
    console.log(categoryExists)
    if (!categoryExists) {
      return res.status(400).send("Category not found");
    }
  const filteredSubcategories = await subCategory.find({categoryId:categoryId});
    if (!filteredSubcategories) {
      return res.status(400).send("Not Found");
      
    }
    res.status(200).send(filteredSubcategories);
  } catch(error) {
    console.log(error);
    res.status(404).send( "No subcategories found for this category");
  }
}

export async function CategoryReadByIdForsub(req,res){
  try {
    const {categoryId}=req.params
    console.log(categoryId)
    const categoryExists=await category.findOne({_id:categoryId})
    console.log({categoryExists})
    if(!categoryExists){
      return res.status(400).send("Category not found")
    }
    const filteredSubcategories = await subCategory.find({categoryId:categoryExists._id})
    if(!filteredSubcategories){
      return res.status(400).send("Not found")
    }
    res.status(200).send(filteredSubcategories)

    
  } catch (error) {
    console.log(error)
    res.status(404).send('No Subcategories found for this Category')
    
  }
}

export async function subcategoryDelete(req,res) {
  // console.log(req.params)
  try {
      const subCategoryId = req.params.id;
      console.log({subCategoryId})
       // Delete properties linked to the subcategories
       await food.deleteMany({ subCategoryId});

       await subCategory.findByIdAndDelete({_id:subCategoryId})

       res.status(200).send("Delete successfully")

  } catch (error) {
      console.log(error)
      return res.status(500).send("SERVER ERROR")
  }
  
}
