const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { perentData, childData, findPaidAmount } = require("../utils");

router.get("/", (req, res) => {
  let { page } = req.query; //query data
  try {
    // if no page number or invalid page number
    if (!page || +page <=0) {
      res.status(400).send({
        message: "Please add valid page number",
      });
      return;
    }
    fs.readFile(perentData, "utf8", (err, parent) => {
      if (err) {
        res.status(400).send({
          message: err || "Somthing went wrong",
        });
        return;
      }
      fs.readFile(childData, "utf8", (err, child) => {
        if (err) {
          res.status(400).send({
            message: err || "Somthing went wrong",
          });
          return;
        }
        parent = JSON.parse(parent)?.data;
        child = JSON.parse(child)?.data;
        let respArr = [];
        for (let key of parent) {
          respArr.push({
            ...key,
            totalPaidAmount: findPaidAmount(key?.id, child),
          });
        }
        const totalRespDataCount = respArr?.length;
        //if got 
        if ((+page - 1) * 2 > totalRespDataCount) {
          res.status(400).send({
            message: "No data found",
          });
          return;
        }
        res.status(200).send({
          message: "success",
          data: respArr
            .sort((a, b) => a.id - b.id)
            .slice((page - 1) * 2, page * 2),
          total: totalRespDataCount,
          totalPage: Math.ceil(totalRespDataCount / 2),
        });
      });
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
