const express = require("express");
let app = express();
let port = 3000

app.use("/", express.static("./"));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});