const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send(`
  <div>
  <h1>Welcome !!</h1>
    <h3>routes----> </h3>
    <br>
     /parent-data?page=1 
     <br>
     /child-data/1
  </div>
  `);
});
app.use("/parent-data", require("./FirstController/index"));
app.use("/child-data", require("./SecondController/index"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
