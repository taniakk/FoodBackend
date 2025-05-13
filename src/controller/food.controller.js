// import foodCategory from "../models/foodCategory.model.js";
import subCategory from "../models/subCategory.model.js";
import food from "../models/food.model.js";
import cloudinary from "../config/cloudinary.js";
export async function foodCreate(req, res) {
  const { subCategoryName, foodName, foodIngredients, price } = req.body;
  console.log(req.body);
  console.log(req.file);

  try {
    // Decode Base64 and upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path);

    const subCategoryData = await subCategory.findOne({ Subcategory_name: subCategoryName });
    if (!subCategoryData) {
      return res.status(400).send({ message: "Subcategory not found" });
    }

    const foodOption = new food({
      subCategoryId: subCategoryData._id,
      foodName,
      foodIngredients,
      price,
      image: uploadResult.secure_url,
    });
    console.log(foodOption);

    await foodOption.save();
    res.status(201).send(foodOption);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
};

export async function foodRead(req, res) {
    
  try {
    const check = await food.find().populate('subCategoryId')
    // console.log(check)
    if (check.length == 0) {
      return res.status(400).send("Not found");
    } 
  
    res.status(201).send(check);
  } catch (error) {
    console.log(error);
    res.status(500).send("SERVER ERROR");
  }
}

export async function subcategoryReadByIdForFood(req,res){
  try {
    const {subCategoryId}=req.params
    console.log(subCategoryId)
    const subcategoryExists= await subCategory.findOne({_id:subCategoryId})
    console.log({subcategoryExists})
    if(!subcategoryExists){
      return res.status(400).send("Subcategory not found")
    }
    const filterFoods= await food.find({subCategoryId:subcategoryExists._id})
    if(!filterFoods){
      return res.status(400).send("Not found")
    }
    res.status(200).send(filterFoods)
  } catch (error) {
    console.log(error)
    res.status(404).send('No food found for this category')
    
  }
}
export async function getAllFood(req,res) {
  try {
    const data = await food.find()
    if(!data){
      return res.status(404).send("Not Found")
    }
    res.status(200).send(data)
    
  } catch (error) {
    res.status(500).send("Internal Server Error")
    
  }
  
}


export async function getSuggestionFood(req,res) {
  try {
    const data = await food.find().limit(8)
    if(!data){
      return res.status(404).send("Not Found")
    }
    res.status(200).send(data)
    
  } catch (error) {
    res.status(500).send("Internal Server Error")
    
  }
  
}
export async function foodDetail(req,res) {
  console.log(req.params);
  
  try{
      const foodId = req.params.id
      console.log({foodId})
   const fetchData = await food.findOne({_id:foodId})
   console.log(fetchData)
      res.status(200).send(fetchData)
  }catch(error){
      console.log(error)
      return res.status(500).send("server error")
  }
}


export async function getsevenFood(req,res) {
  try {

    const data = await food.find().limit(7)
    console.log(data)
    if(!data){
      return res.status(404).send("Not Found")
    }
    res.status(200).send(data)
    
  } catch (error) {
    res.status(500).send("Internal Server Error")
    
  }
  
}



export async function deleteFood(req,res) {
  const {id} = req.params
  try {

    const data = await food.findByIdAndDelete(id)
   
    res.status(200).send("Delete SuccessFully")
    
  } catch (error) {
    res.status(500).send("Internal Server Error")
    
  }
  
}


// Update food item
export async function UpdateFood(req, res) {
  const { id } = req.params;

  try {
    // Find the existing food item by ID
    const existingFood = await food.findById(id);
    if (!existingFood) {
      return res.status(404).json({ message: "Food item not found" });
    }


      const updateData = {
        foodName: req.body.foodName,
        foodIngredients: req.body.foodIngredients,
        price: req.body.price,
       
      };

      // If a new image is uploaded, save the image URL to Cloudinary
      if (req.file) {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "food_images",
        });
        updateData.image = uploadResult.secure_url; // Store the Cloudinary URL in the data
      }

      // Update the food item with the new data
      const updatedFood = await food.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true, // Ensure validation rules are applied
      });

      res.status(200).json({
        message: "Food updated successfully",
        data: updatedFood,
      });
    

  } catch (error) {
    console.error("Error updating food:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
