import Product from "../models/ProductModel.js";

// Get All Product
export const getProducts = async (req, res) => {
    try {
        const response = await Product.findAll({
            attributes:['uuid', 'name', 'desc', 'budget', 'image', 'author']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

//Create Product
export const createProduct = async(req, res, next) =>{
    if (!req.file) {
        res.status(400).json({msg: "Input value tidak sesuai"});
    }
    const {name, desc, budget, author} = req.body;
    const image = req.file.path;

    // const Upload = new Product({
    //     name: name,
    //     desc: desc,
    //     budget: budget,
    //     author: author,
    //     image: image
    // })
    
    // Upload.save()
    // .then(result =>{
    //     res.status(201).json({
    //         message: 'Create Product success',
    //         data: result
    //     });
    // })
    // .catch(error) 
    //     res.status(500).json({msg: error.message})
    

    try {
        await Product.create({
            name: name,
            desc: desc,
            budget: budget,
            image: image,
            author: author
        });
        res.status(201).json({msg: "Product Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// Delete Product
export const deleteProduct = async(req, res) =>{
    const product = await Product.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!product) return res.status(404).json({msg: "Products not found!"});
    try {
        await Product.destroy({
            where:{
                id: product.id
            }
        });
        res.status(200).json({msg: "Product Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

