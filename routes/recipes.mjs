import express from "express";
import Recipe from "../models/recipes.mjs";



const router = express.Router();
//get all the recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.status(200).send(recipes);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Create a single recipe 
router.post("/", async (req, res) => {
    let newDocument = req.body;

    try{
      const recipe = new Recipe(newDocument)
      await recipe.save();
      res.status(201).send(recipe);
  
    }catch (error){
      res.status(400).send(error.message)
    }
  
  });

    // Updating recipe
  router.patch("/:id", async (req, res) => {
    try{
      const recipe = await Recipe.findByIdAndUpdate(
        req.params.id, 
        {$set: req.body },
        {new:true}
      )  ;
      if(!recipe){
        res.status(404).send("Not found")
      }else{
        res.status(200).send(recipe)
      }
    }catch (error){
      res.status(400).send(error)
    };
  
  });

  //Delete a single recipe
  router.delete("/:id", async (req, res) => {
    try{
      const result = await Recipe.findByIdAndDelete(
        req.params.id
      )  ;
      if(!result){
        res.status(404).send("Not found")
      }else{
        res.status(200).send(result)
      }
    }catch (error){
      res.status(400).send(error)
    };
  
  });
  
export default router;