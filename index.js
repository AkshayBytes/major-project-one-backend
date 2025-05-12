const { initializeDatabase } = require("./db/db.connect");
//const fs = require("fs");
const Product = require("./models/product.models");
const Category = require("./models/categories.model");

initializeDatabase();
require("dotenv").config();
const express = require("express");
const { error } = require("console");
const app = express();
app.use(express.json())

//const jsonData = fs.readFileSync('products.json','utf-8')
//const productsData = JSON.parse(jsonData);

//const jsonData2 = fs.readFileSync('categories.json','utf-8')
//const categoriesData2 = JSON.parse(jsonData2)

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// async function seedCategories() {
//     try {
//         for (const categoryData of categoriesData2) {
//             const newCategory = new Category({
//                 category: categoryData.catagory
//             });
//             await newCategory.save();
//         }
//         console.log("Categories seeded successfully");
//     } catch (error) {
//         console.log("Error seeding categories:", error);
//     }
// }

// async function seedProducts() {
//     try {
//         // First get all categories
//         const categories = await Category.find();
//         const categoryMap = {};
//         categories.forEach(cat => {
//             categoryMap[cat.category] = cat._id;
//         });

//         for (const productData of productsData) {
//             const categoryId = categoryMap[productData.category];
//             if (!categoryId) {
//                 console.log(`Category not found for product: ${productData.productName}`);
//                 continue;
//             }

//             const newProduct = new Product({
//                 category: categoryId,
//                 productImgUrl: productData.productImgUrl,
//                 productName: productData.productName,
//                 productStarRating: productData.productStarRating,
//                 productPrice: productData.productPrice,
//                 productActualPrice: productData.productActualPrice,
//                 quantity: productData.quantity,
//                 productSize: productData.productSize,
//                 description: productData.description
//             });

//             await newProduct.save();
//         }
//         console.log("Products seeded successfully");
//     } catch (error) {
//         console.log("Error seeding products:", error);
//     // }
// }

// // Seed data
// async function seedData() {
//     await seedCategories();
//     await seedProducts();
// }

//seedData();

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log("Server is running on port", PORT)
// })


// to get the product by its id

// function seedData2(){
//     try {
//         for(const categoriesData  of categoriesData2   ){
//             const newCategory = new theCatagry({
//                 catagory : categoriesData.catagory
//             })
//             //console.log(newCategory.catagory);
//             newCategory.save()

//         }
//     } catch (error) {
//         console.log("Error seeding the data.", error)
//     }
// }

// seedData2();

async function readProductByIt(productId) {
try {
    const theProduct = await Product.findOne({_id: productId })
    return theProduct
} catch (error) {
    throw error
}    
}

app.get("/api/products/:productId",async(req,res)=>{
  try {
    const thePerticularProduct = await readProductByIt(req.params.productId)
    if(thePerticularProduct){
        res.json(thePerticularProduct)
    }else{
        res.status(404).json({error:"No product found"})
    }
    
  } catch (error) {
    res.status(500).json({error:"failed while fething the products"})
  }
})
  

    


//readProductByIt("680b5d3a3ceb691158faa1ec")



async function readAllProducts(){
    try {
        const allProducts = await Product.find().populate("category");
        return allProducts
    } catch (error) {
        console.log(error)
    }
}

//readAllProducts()

app.get("/", (req, res) => {
    res.send("Hello express")
})

app.get("/api/products", async(req, res) => {
    try {
        const product = await readAllProducts()
        if(product.length != 0){
            res.json(product)
        }else{
            res.status(404).json({error: "No product found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch movie."})
    }
})

async function readAllCategories(){
    try {
        const allCategories = await Category.find();
        return allCategories
    } catch (error) {
        console.log(error)
    }
}


app.get("/api/categories", async(req, res) => {
    try {
        const theCategory = await readAllCategories()
        if(theCategory.length != 0){
            res.json(theCategory)
        }else{
            res.status(404).json({error: "No category found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch category."})
    }
})




async function getCategoryByCategoryId(categoryId) {
    try {
        const specificCategory = await Category.findOne({_id: categoryId})
        return specificCategory
    } catch (error) {
        throw error
    }
}

//getCategoryByCategoryId("6815eb34e973f8d33a22aeb1")


app.get("/api/:categoryId", async(req, res) => {
    try {
        const actualCategory = await getCategoryByCategoryId(req.params.categoryId)
        if(actualCategory){
            res.json(actualCategory)
        }else{
            res.status(404).json({error:"No category found"})
        }
        
    } catch (error) {
        res.status(500).json({error: "Failed to fetch category."})
    }
})



    


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})

