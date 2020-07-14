const router = require('express').Router();
const authMiddleware = require('./../../middlewares/authMiddlewares');

const groceryControllers = require('./../../controllers/GroceryController');

router.route('/new_gl')
  .post(authMiddleware.requireAuth, groceryControllers.newGroceryList);

router.route("/getall")
    .get(authMiddleware.requireAuth, groceryControllers.getAllGroceryList)

router.route("/getlist")
    .post(authMiddleware.requireAuth, groceryControllers.getSingleGroceryList)

router.route("/delete_list")
    .post(groceryControllers.deleteGroceryList)

router.route('/new_item')
  .post(groceryControllers.addNewItem);

router.route("/update_item")
    .post(groceryControllers.updateItem)

router.route("/delete_item")
    .post(groceryControllers.deteleItem)

router.route("/new_split") 
    .post(groceryControllers.newSplit)

router.route("/update_split") 
    .post(groceryControllers.updateSplit)

router.route("/get_split")
    .post(groceryControllers.getSplit)
router.route("/get_all_split")
    .get(authMiddleware.requireAuth, groceryControllers.getAllSplit)

module.exports = router;