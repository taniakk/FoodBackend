import food from "../models/food.model.js";
import Rating from "../models/rating.js";
import user from "../models/user.model.js";

export async function addRating(req, res) {
    const {foodId, rating, review} = req.body;
    const {id} = req.user
    // console.log(req.body)
    try {
        const fetchdetail = await user.findOne({_id:id})
        if (!fetchdetail) {
            return res.status(400).send("Please Login First")

        }
        const option = new Rating({
            userId:id,
            foodId,
            rating,
            review:review?review:null
        })
        await option.save()
       return res.status(201).send("Review Added Successfully")
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
    
}


export async function getRating() {
    try {
        const fetch = await Rating.find()
        console.log({fetch})
        if (fetch.length === 0) {
            return res.status(404).send("NOT Found")
        }
        return res.status(200).send(fetch)
    } catch (error) {
        console.log(error)
        return res.status(500).send("INTERNAL SERVER ERROR")
    }
}

export async function getRatingByID(req,res) {
    const {id} = req.params
    try {
        const fetch = await Rating.find({foodId:id}).populate('userId')
        if (fetch.length === 0) {
            return res.status(404).send("NOT Found")
        }
        return res.status(200).send(fetch)
    } catch (error) {
        console.log(error)
        return res.status(500).send("INTERNAL SERVER ERROR")
    }
}