const express = require("express");
const cors = require("cors");
const app = express();
const rootRouter = require("./routes/index.js");

//middleware
app.use(cors());
app.use(express.json()); //body parser middleware
app.use('/api/v1',rootRouter);



app.listen(3000 , ()=>{
    console.log("Server is running on port 3000");
});