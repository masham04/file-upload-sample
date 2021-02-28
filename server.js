const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
var bodyParser = require('body-parser');
const app = express();
const data = require('./data');
const { dirname } = require("path");

const directory = "./images/";

// app.use(express.static(path.join(__dirname, "client", "build")));

app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.post("/picture", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No files",
      });
    } else {
      const { picture } = req.files;
      picture.name = "abc.jpg";
      fs.readdirSync(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
          fs.unlink(path.join(directory, file), (err) => {
            if (err) throw err;
          });
        }
      });

      picture.mv("./images/" + picture.name);

      res.send({
        status: true,
        message: "File is uploaded",
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

app.use('/get', data);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
