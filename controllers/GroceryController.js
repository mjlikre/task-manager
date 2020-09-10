const client = require("../models");
const uuid = require("uuid");
const { set } = require("mongoose");
require("dotenv").config();

module.exports = {
  newGroceryList: async (req, res) => {
    try {
      const query = "INSERT INTO grocery_overview SET ?";
      const id = uuid.v4();
      await client.Client.query(
        query,
        {
          id: id,
          shopper: req.body.shopper,
          total: req.body.total,
          store: req.body.store,
          shop_date: req.body.date,
          payto: req.body.payto,
          creator_id: req.user,
          time_created: Date.now(),
        },
        async (err, result) => {
          if (err) console.log(err);
          await client.Client.query(
            "SELECT * FROM grocery_overview WHERE id = ?",
            [id],
            (err, result) => {
              if (err) console.log(err);
              res.json({ data: result });
            }
          );
        }
      );
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ error: "server error, contact your uncle mike" });
    }
  },
  getGroceryList: async (req, res) => {
    try {
      const query = "SELECT * FROM grocery_overview WHERE shopper_id = ?";
      await client.Client.query(query, [req.user], (err, result) => {
        if (err) console.log(err);
        res.json({ data: result });
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  },
  getSingleGroceryList: async (req, res) => {
    try {
      const query =
        "SELECT * FROM grocery_item WHERE grocery_list_id = ? ORDER BY time_created DESC";
      await client.Client.query(query, [req.body.id], (err, result) => {
        if (err) console.log(err);
        res.json({ data: result });
      });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ err: "Server error, contact your uncle mike" });
    }
  },
  deleteGroceryList: async (req, res) => {
    try {
      const query = "DELETE FROM grocery_overview WHERE id = ?";
      await client.Client.query(query, [req.body.id], async (err, result) => {
        if (err) console.log(err);
        await client.Client.query(
          "SELECT * FROM grocery_overview ",
          (err, result) => {
            if (err) console.log(err);
            res.json({ data: result });
          }
        );
      });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ error: "Server Error, contact uncle mike" });
    }
  },
  getAllGroceryList: async (req, res) => {
    try {
      const query = "SELECT * FROM grocery_overview";

      await client.Client.query(query, async (err, result) => {
        await client.Client.query(
          "SELECT * FROM auth WHERE user_id = ?",
          [req.user],
          (error, results) => {
            if (error) console.log(error);
            else {
              let data = result;
              data.map((element, index) => {
                if (
                  element.creator_id === req.user ||
                  element.payto === results[0].user_name
                ) {
                  element.edit = 1;
                } else {
                  element.edit = 0;
                }
              });
              res.json({ data: data });
            }
          }
        );
      });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ err: "Server error, contact your uncle mike" });
    }
  },
  addNewItem: async (req, res) => {
    try {
      const query = "INSERT INTO grocery_item SET ?";
      const time = Date.now();
      console.log(time);
      await client.Client.query(
        query,
        {
          grocery_list_id: req.body.id,
          id: req.body.index,
          item: req.body.name,
          price: req.body.price,
          TC: req.body.TC,
          MJ: req.body.MJ,
          JC: req.body.JC,
          CO: req.body.CO,
          ER: req.body.ER,
          CW: req.body.CW,
          AL: req.body.AL,
          MW: req.body.MW,
          CY: req.body.CY,
          MR: req.body.MR,
          shareBetween: req.body.shareBetween,
          ppp: req.body.ppp,
          time_created: parseInt(time),
        },
        async (err, result) => {
          if (err) console.log(err);
          else {
            await client.Client.query(
              "SELECT * FROM grocery_item WHERE grocery_list_id = ? ORDER BY time_created DESC",
              [req.body.id],
              (err, result) => {
                if (err) console.log(err);
                res.json({ data: result });
              }
            );
          }
        }
      );
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Server Error, contact uncle mike" });
    }
  },
  updateItem: async (req, res) => {
    try {
      const query =
        "UPDATE grocery_item SET TC = ?, MJ = ?, JC = ?, CO = ?, ER = ?, CW = ?, AL = ?, MW = ?, CY = ?, MR = ?, shareBetween = ?, ppp = ? WHERE grocery_list_id = ? and id = ?";
      console.log(req.body);
      await client.Client.query(
        query,
        [
          req.body.TC,
          req.body.MJ,
          req.body.JC,
          req.body.CO,
          req.body.ER,
          req.body.CW,
          req.body.AL,
          req.body.MW,
          req.body.CY,
          req.body.MR,
          req.body.shareBetween,
          req.body.ppp,
          req.body.grocery_list_id,
          req.body.id,
        ],
        async (err, result) => {
          if (err) console.log(err);
          console.log(result);
          client.Client.query(
            "SELECT * FROM grocery_item WHERE grocery_list_id = ? ORDER BY time_created DESC",
            [req.body.grocery_list_id],
            (err, result) => {
              if (err) console.log(err);
              res.json({ data: result });
            }
          );
        }
      );
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Server Error, contact uncle mike" });
    }
  },
  deteleItem: async (req, res) => {
    try {
      const query =
        "DELETE FROM grocery_item WHERE grocery_list_id = ? AND id = ?";
      await client.Client.query(
        query,
        [req.body.id, req.body.index],
        async (err, result) => {
          if (err) console.log(err);
          client.Client.query(
            "SELECT * FROM grocery_item WHERE grocery_list_id = ? ORDER BY time_created DESC",
            [req.body.id],
            (err, result) => {
              if (err) console.log(err);
              res.json({ data: result });
            }
          );
        }
      );
    } catch (e) {
      console.log(err);
      res.json(500).json({ error: "Server Error, contact uncle mike" });
    }
  },
  newSplit: async (req, res) => {
    try {
      const query = "INSERT INTO cost_split SET ?";
      await client.Client.query(
        query,
        {
          grocery_list_id: req.body.id,
          TC: 0,
          MJ: 0,
          JC: 0,
          CO: 0,
          ER: 0,
          CW: 0,
          MR: 0,
          AL: 0,
          MW: 0,
          CY: 0,
        },
        async (err, result) => {
          if (err) console.log(err);
          client.Client.query(
            "SELECT * FROM cost_split WHERE grocery_list_id = ?",
            [req.body.id],
            (err, result) => {
              if (err) console.log(err);
              res.json({ data: result });
            }
          );
        }
      );
    } catch (e) {
      console.log(err);
      res.json(500).json({ error: "Server Error, contact uncle mike" });
    }
  },
  updateSplit: async (req, res) => {
    try {
      const query =
        "UPDATE cost_split set TC = ?, MJ = ?, JC = ?, CO = ?, ER = ?, CW = ?, AL = ?, MW = ?, CY = ?, MR = ? WHERE grocery_list_id = ?";
      await client.Client.query(
        query,
        [
          parseFloat(req.body.TC),
          parseFloat(req.body.MJ),
          parseFloat(req.body.JC),
          parseFloat(req.body.CO),
          parseFloat(req.body.ER),
          parseFloat(req.body.CW),
          parseFloat(req.body.AL),
          parseFloat(req.body.MW),
          parseFloat(req.body.CY),
          parseFloat(req.body.MR),
          req.body.id,
        ],
        async (err, result) => {
          if (err) console.log(err);
          client.Client.query(
            "SELECT * FROM cost_split WHERE grocery_list_id = ?",
            [req.body.id],
            (err, result) => {
              if (err) console.log(err);
              res.json({ data: result });
            }
          );
        }
      );
    } catch (e) {
      console.log(e);
      res.json(500).json({ error: "Server Error, contact uncle mike" });
    }
  },
  getSplit: async (req, res) => {
    try {
      const query =
        "SELECT * FROM cost_split INNER JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id WHERE cost_split.grocery_list_id = ?";
      await client.Client.query(query, [req.body.id], async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          await client.Client.query(
            "SELECT * FROM auth WHERE user_id = ?",
            [req.user],
            (error, results) => {
              if (error) console.log(error);
              else {
                if (
                  result[0].creator_id === req.user ||
                  req.user === process.env.ADMIN_ID ||
                  results[0].user_name === result[0].payto
                ) {
                  res.json({ data: { ...result, authenticated: true } });
                } else {
                  res.json({ data: { ...result, authenticated: false } });
                }
              }
            }
          );
        }
        // else if (result[0].creator_id === req.user || req.user === process.env.ADMIN_ID)  {
        //   res.json({data: {...result, authenticated: true}})
        // }else{
        //   res.json({data: {...result, authenticated: false}})
        // }
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Server Error, contact uncle mike" });
    }
  },
  getAllSplit: async (req, res) => {
    try {
      const query1 = "SELECT * FROM auth WHERE user_id = ?";

      await client.Client.query(query1, [req.user], async (err, result) => {
        if (err) console.log(err);
        else {
          const username = result[0].user_name;
          const email = result[0].email;
          let query = "";
          if (username === "TC") {
            query =
              "SELECT cost_split.grocery_list_id, cost_split.TC, grocery_overview.shop_date, grocery_overview.total, grocery_overview.payto, grocery_overview.shopper FROM cost_split LEFT JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id WHERE cost_split.TC > 0;";
          } else if (username === "MJ") {
            query =
              "SELECT cost_split.grocery_list_id, cost_split.MJ, grocery_overview.shop_date, grocery_overview.total, grocery_overview.payto, grocery_overview.shopper FROM cost_split LEFT JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id WHERE cost_split.MJ > 0;";
          } else if (username === "CO") {
            query =
              "SELECT cost_split.grocery_list_id, cost_split.CO, grocery_overview.shop_date, grocery_overview.total, grocery_overview.payto, grocery_overview.shopper FROM cost_split LEFT JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id WHERE cost_split.CO > 0;";
          } else if (username === "ER") {
            query =
              "SELECT cost_split.grocery_list_id, cost_split.ER, grocery_overview.shop_date, grocery_overview.total, grocery_overview.payto, grocery_overview.shopper FROM cost_split LEFT JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id WHERE cost_split.ER > 0;";
          } else if (username === "JC") {
            query =
              "SELECT cost_split.grocery_list_id, cost_split.JC, grocery_overview.shop_date, grocery_overview.total, grocery_overview.payto, grocery_overview.shopper FROM cost_split LEFT JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id WHERE cost_split.JC > 0;";
          } else if (username === "CW") {
            query =
              "SELECT cost_split.grocery_list_id, cost_split.CW, grocery_overview.shop_date, grocery_overview.total, grocery_overview.payto, grocery_overview.shopper FROM cost_split LEFT JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id WHERE cost_split.CW > 0;";
          } else if (username === "CY") {
            query =
              "SELECT cost_split.grocery_list_id, cost_split.CY, grocery_overview.shop_date, grocery_overview.total, grocery_overview.payto, grocery_overview.shopper FROM cost_split LEFT JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id WHERE cost_split.CY > 0;";
          } else if (username === "MW") {
            query =
              "SELECT cost_split.grocery_list_id, cost_split.MW, grocery_overview.shop_date, grocery_overview.total, grocery_overview.payto, grocery_overview.shopper FROM cost_split LEFT JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id WHERE cost_split.MW > 0;";
          } else if (username === "AL") {
            query =
              "SELECT cost_split.grocery_list_id, cost_split.AL, grocery_overview.shop_date, grocery_overview.total, grocery_overview.payto, grocery_overview.shopper FROM cost_split LEFT JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id WHERE cost_split.AL > 0;";
          } else if (username === "MR") {
            query =
              "SELECT cost_split.grocery_list_id, cost_split.MR, grocery_overview.shop_date, grocery_overview.total, grocery_overview.payto, grocery_overview.shopper FROM cost_split LEFT JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id WHERE cost_split.MR > 0;";
          }
          await client.Client.query(query, [username], (err, result2) => {
            if (err) console.log(err, "something went wrong");
            res.json({
              data: { user: username, email: email, results: result2 },
            });
          });
        }
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Server Error, contact Uncle mike" });
    }
  },
  sortList: (array, order) => {
    const partition = (array, start, end, order) => {
      let pivot = array[end];
      let left = start;
      let right = end - 1;

      while (left <= right) {
        if (order === 0) {
          while (left <= end && array[left].time_created < pivot.time_created) {
            left++;
          }
          while (
            right >= start &&
            array[right].time_created >= pivot.time_created
          ) {
            right--;
          }
        } else if (order === 1) {
          while (left <= end && array[left].time_created > pivot.time_created) {
            left++;
          }
          while (
            right >= start &&
            array[right].time_created <= pivot.time_created
          ) {
            right--;
          }
        }
        let tempSmall = array[right];
        let tempBig = array[left];
        if (left < right) {
          array[right] = tempBig;
          array[left] = tempSmall;
        } else {
          array[end] = tempBig;
          array[left] = pivot;
        }
      }
      return left;
    };
    const quickSub = (array, start, end, order) => {
      if (start === end || start > end) {
        return;
      }
      let pivot = partition(array, start, end, order);
      quickSub(array, start, pivot - 1, order);
      quickSub(array, pivot + 1, end, order);
    };
    quickSub(array, 0, array.length - 1, order);
    return array;
  },
  addMultiple: async (req, res) => {
    try {
      let data = [];
      req.body.string.split("\n").map((item, index) => {
        let tempData = {};
        tempData.grocery_list_id = req.body.id;
        (tempData.id = uuid.v4()), (tempData.item = item.split(",")[0]);
        (tempData.price = parseFloat(item.split(",")[1])),
          (tempData.TC = 1),
          (tempData.MJ = 1),
          (tempData.JC = 1),
          (tempData.CO = 1),
          (tempData.ER = 1),
          (tempData.CW = 1),
          (tempData.AL = 1),
          (tempData.MW = 1),
          (tempData.CY = 1),
          (tempData.MR = 1),
          (tempData.shareBetween = 10),
          (tempData.ppp = parseFloat((tempData.price / 10).toFixed(2))),
          (tempData.time_created = parseInt(Date.now()) + index);
        data[index] = tempData;
      });
      console.log(data);
      const query = "INSERT INTO grocery_item SET ?";
      data.map(async (item, index) => {
        await client.Client.query(query, item, (err, result) => {
          if (err) console.log(err);
          console.log(result);
        });
      });
      await client.Client.query(
        "SELECT * FROM grocery_item WHERE grocery_list_id = ? ORDER BY time_created DESC",
        [req.body.id],
        (err, result) => {
          if (err) console.log(err);
          res.json({ data: result });
        }
      );
    } catch (e) {
      console.log(e);
      res.json(500).json({ error: "Server Error, contact uncle mike" });
    }
  },
  calculatePersonalOwning: async (req, res) => {
    const query =
      "SELECT cost_split.TC, cost_split.MJ, cost_split.CO, cost_split.JC, cost_split.ER, cost_split.CW, cost_split.MR, cost_split.CY, cost_split.MW, cost_split.AL, grocery_overview.payto FROM cost_split inner join grocery_overview on cost_split.grocery_list_id = grocery_overview.id";
    let accounting = {
      MJ: [
        "MJ",
        0,
        "TC",
        0,
        "AL",
        0,
        "ER",
        0,
        "JC",
        0,
        "CO",
        0,
        "CW",
        0,
        "CY",
        0,
        "MW",
        0,
        "MR",
        0,
      ],
      TC: [
        "MJ",
        0,
        "TC",
        0,
        "AL",
        0,
        "ER",
        0,
        "JC",
        0,
        "CO",
        0,
        "CW",
        0,
        "CY",
        0,
        "MW",
        0,
        "MR",
        0,
      ],
      AL: [
        "MJ",
        0,
        "TC",
        0,
        "AL",
        0,
        "ER",
        0,
        "JC",
        0,
        "CO",
        0,
        "CW",
        0,
        "CY",
        0,
        "MW",
        0,
        "MR",
        0,
      ],
      ER: [
        "MJ",
        0,
        "TC",
        0,
        "AL",
        0,
        "ER",
        0,
        "JC",
        0,
        "CO",
        0,
        "CW",
        0,
        "CY",
        0,
        "MW",
        0,
        "MR",
        0,
      ],
      JC: [
        "MJ",
        0,
        "TC",
        0,
        "AL",
        0,
        "ER",
        0,
        "JC",
        0,
        "CO",
        0,
        "CW",
        0,
        "CY",
        0,
        "MW",
        0,
        "MR",
        0,
      ],
      CO: [
        "MJ",
        0,
        "TC",
        0,
        "AL",
        0,
        "ER",
        0,
        "JC",
        0,
        "CO",
        0,
        "CW",
        0,
        "CY",
        0,
        "MW",
        0,
        "MR",
        0,
      ],
      MW: [
        "MJ",
        0,
        "TC",
        0,
        "AL",
        0,
        "ER",
        0,
        "JC",
        0,
        "CO",
        0,
        "CW",
        0,
        "CY",
        0,
        "MW",
        0,
        "MR",
        0,
      ],
      CW: [
        "MJ",
        0,
        "TC",
        0,
        "AL",
        0,
        "ER",
        0,
        "JC",
        0,
        "CO",
        0,
        "CW",
        0,
        "CY",
        0,
        "MW",
        0,
        "MR",
        0,
      ],
      CY: [
        "MJ",
        0,
        "TC",
        0,
        "AL",
        0,
        "ER",
        0,
        "JC",
        0,
        "CO",
        0,
        "CW",
        0,
        "CY",
        0,
        "MW",
        0,
        "MR",
        0,
      ],
      MR: [
        "MJ",
        0,
        "TC",
        0,
        "AL",
        0,
        "ER",
        0,
        "JC",
        0,
        "CO",
        0,
        "CW",
        0,
        "CY",
        0,
        "MW",
        0,
        "MR",
        0,
      ],
    };
    try {
      await client.Client.query(query, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        result.map((item, index) => {
          if (item.MJ !== 0 && item.payto !== "MJ") {
            let payToIndex = accounting.MJ.indexOf(item.payto);
            accounting.MJ[payToIndex + 1] += item.MJ;
          }
          if (item.TC !== 0 && item.payto !== "TC") {
            let payToIndex = accounting.TC.indexOf(item.payto);
            accounting.TC[payToIndex + 1] += item.TC;
          }
          if (item.CO !== 0 && item.payto !== "CO") {
            let payToIndex = accounting.CO.indexOf(item.payto);
            accounting.CO[payToIndex + 1] += item.CO;
          }
          if (item.JC !== 0 && item.payto !== "JC") {
            let payToIndex = accounting.JC.indexOf(item.payto);
            accounting.JC[payToIndex + 1] += item.JC;
          }
          if (item.MW !== 0 && item.payto !== "MW") {
            let payToIndex = accounting.MW.indexOf(item.payto);
            accounting.MW[payToIndex + 1] += item.MW;
          }
          if (item.MR !== 0 && item.payto !== "MR") {
            let payToIndex = accounting.MR.indexOf(item.payto);
            accounting.MR[payToIndex + 1] += item.MR;
          }
          if (item.ER !== 0 && item.payto !== "ER") {
            let payToIndex = accounting.ER.indexOf(item.payto);
            accounting.ER[payToIndex + 1] += item.ER;
          }
          if (item.CW !== 0 && item.payto !== "CW") {
            let payToIndex = accounting.CW.indexOf(item.payto);
            accounting.CW[payToIndex + 1] += item.CW;
          }
          if (item.AL !== 0 && item.payto !== "AL") {
            let payToIndex = accounting.AL.indexOf(item.payto);
            accounting.AL[payToIndex + 1] += item.AL;
          }
          if (item.CY !== 0 && item.payto !== "CY") {
            let payToIndex = accounting.CY.indexOf(item.payto);
            accounting.CY[payToIndex + 1] += item.CY;
          }
        });
        accounting_pre = Object.entries(accounting);
        const balancing = (list) => {
          let accountings = list;
          for (let i = 0; i < accountings.length; i++) {
            for (let j = 0; j < accountings.length; j++) {
              for (let k = 0; k < 20; k += 2) {
                if (
                  accountings[i][0] === accountings[j][1][k] &&
                  accountings[j][1][k + 1] > 0
                ) {
                  let thisIndex = accountings[i][1].indexOf(accountings[j][0]);
                  if (
                    accountings[j][1][k + 1] > accountings[i][1][thisIndex + 1]
                  ) {
                    accountings[j][1][k + 1] =
                      accountings[j][1][k + 1] -
                      accountings[i][1][thisIndex + 1];
                    accountings[i][1][thisIndex + 1] = 0;
                  } else if (
                    accountings[j][1][k + 1] > accountings[i][1][thisIndex + 1]
                  ) {
                    accountings[i][1][thisIndex + 1] =
                      accountings[i][1][thisIndex + 1] -
                      accountings[j][1][k + 1];
                    accountings[j][1][k + 1] = 0;
                  }
                }
              }
            }
          }
        };
        balancing(accounting_pre);
        res.json({ data: accounting_pre });
      });
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};
