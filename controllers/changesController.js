const client = require("../models");
const uuid = require("uuid");
require("dotenv").config();

module.exports = {
    migrate_new_list : async (req, res) => {
        try{
            const query = "SELECT * FROM grocery_overviews"
            await client.Client.query(
                query, 
                (err, result) => {
                    if (err) console.log(err); 
                    else {
                        console.log(result);
                        result.map((item, index) => {
                            module.exports.addToNewList(item)
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
    addToNewList: async(data) => {
        try{
            const query = "INSERT INTO grocery_overview SET ?";
            await client.Client.query(
                query, 
                {
                    id: data.id,
                    shopper: data.shopper,
                    total: data.total,
                    store: data.store,
                    shop_date: data.shop_date,
                    payto: data.payto,
                    creator_id: data.creator_id,
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
        try{
            const query = "SELECT * FROM auth WHERE user_id = ?"
            await client.Client.query(
                query,
                ['9304d9ee-aa90-4318-a946-eec795e46c1d'],
                (err, result) => {
                    if (err) console.log(err)
                    else{
                        console.log(result)
                        res.json(
                            {data: result[0].user_name}
                        )
                    }
                }
            )
        }catch(e){
            console.log(e)
        }
    }
}