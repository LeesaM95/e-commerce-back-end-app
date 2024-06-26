const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    // find all categories
    // be sure to include its associated Products
    try {
        const categoryData = await Category.findAll({
            include: [{ model: Product, }]   
        });
        const categories = categoryData.map((data) => data.get({ plain: true }));
        res.json(categories)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/:id', async (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    try {
        const category = await Category.findByPk(req.params.id, {
            include: [ {model: Product, }]   
        });

        if(!category) {
            res.status(404).json({ message: "No category found with this Id"});
            return;
        }
        res.status(200).json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    // create a new category
    try {
        const category = await Category.create(req.body);
        res.json(category);
    } catch (err) {
        console.log(err);
      return res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    // update a category by its `id` value
    try {
        const category = await Category.update(req.body,
            {
                where: { id: req.params.id }
            }
            
        );
        if (!category) {
            res.status(404).json({ message: 'No category with this id!'})
        };
        res.json(category)
    } catch (err) {
        res.status(500).json(err);
    }  
});

// api/categories/:id
router.delete('/:id', async (req, res) => {
    // delete a category by its `id` value
    try {
        const category = await Category.destroy({
            where: { id: req.params.id }
            });
        if (!category) {
            res.status(404).json({ message: 'No category with this id!'})
        };
        res.json({ message: 'Category has been deleted!'})
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
