const client = require("../models");
const uuid = require("uuid");
require("dotenv").config();

module.exports = {
    migrate_new_list : async (req, res) => {
        try{
            const query = "SELECT * FROM grocery_item"
            await client.Client.query(
                query, 
                (err, result) => {
                    if (err) console.log(err); 
                    else {
                        console.log(result);
                        result.map((item, index) => {
                            module.exports.addToNewList(item, index)
                        })
                        res.json({done: "done"})
                    }
                }
            )
        }catch(e){
            console.log(e)
            return res.status(500).json(e)
        }
    },
    addToNewList: async(data, index) => {
        try{
            const query = "INSERT INTO grocery_items SET ?";
            await client.Client.query(
                query, 
                {
                    id: data.id,
                    shopper:  data.shopper,
                    total: data.total,
                    store: data.store,
                    shop_date: data.shop_date,
                    payto: data.payto,
                    creator_id: data.user_id,
                    time_created: data.time_created
                    
                },
                (err, result) => {
                    if(err) console.log(err);
                }
            )
        }catch(e) {
            if (e) console.log(e);
        }
    },
    getTime: async(req, res) => {
        let date = Date.now()
        console.log(date)
        
        res.json({date: date})
    }
}