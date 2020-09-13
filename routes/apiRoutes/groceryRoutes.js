const router = require('express').Router();
const authMiddleware = require('./../../middlewares/authMiddlewares');
const changesControllers = require("./../../controllers/changesController")
const groceryControllers = require('./../../controllers/GroceryController');

router.route('/new_gl')
  .post(authMiddleware.requireAuth, groceryControllers.newGroceryList);

router.route("/getall")
    .post(authMiddleware.requireAuth, groceryControllers.getAllGroceryList)

router.route("/get_list")
    .post(authMiddleware.requireAuth, groceryControllers.getGroceryList)

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
    .post(authMiddleware.requireAuth, groceryControllers.getSplit)

router.route("/get_all_split")
    .post(authMiddleware.requireAuth, groceryControllers.getAllSplit)

router.route("/addmultiple")
    .post(authMiddleware.requireAuth, groceryControllers.addMultiple)

router.route("/gtime")
    .post(changesControllers.migrate_new_list)

router.route('/getCalculation')
    .post(groceryControllers.calculatePersonalOwning)

router.route("/username")
    .post(authMiddleware.requireAuth, groceryControllers.getUserName)

module.exports = router;