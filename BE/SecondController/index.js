const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { perentData, childData, findPaidAmount } = require("../utils");

router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    if (!id || id === "0") {
      res.status(400).send({
        message: "Please add page parentId",
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
        const parentObj = parent.filter((e) => e?.id == id)?.[0];
        if (!parentObj) {
          res.status(400).send({
            message: `No data found for parentId: ${id}`,
          });
          return;
        }
        for (let key of child) {
          if (key?.parentId == id) {
            let resp = { ...parentObj };
            resp.id = key?.id;
            resp.paidAmount = key?.paidAmount;
            respArr.push({ ...resp });
          }
        }
        const totalRespDataCount = respArr?.length;
        res.status(200).send({
          message: "success",
          data: respArr.sort((a, b) => a.id - b.id),
          total: totalRespDataCount,
        });
      });
    });
  } catch (err) {
    res.status(500).send(err?.message || "Internal Server Error");
  }
});

module.exports= router;