 const path = require("path");
 const perentData = path.join(__dirname, "", "Parent.json");
 const childData = path.join(__dirname, "", "Child.json");

 const findPaidAmount = (id, childData) => {
  let paidAmount = 0;
  for (let key of childData) {
    if (key?.parentId == id) paidAmount += key?.paidAmount;
  }
  return paidAmount;
};

module.exports = { perentData, childData, findPaidAmount };
