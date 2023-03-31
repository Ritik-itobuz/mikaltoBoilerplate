const http = require("http");
const port = 8000;
const path = require("path");
const fs = require("fs/promises");
const fsx = require("fs");
const  {parse}  = require("querystring")

const filePath = path.join(__dirname + "/db.json");
const data = JSON.parse(fsx.readFileSync(filePath, "utf-8"));



http
  .createServer((req, res) => {
    try {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");
      let formData = "";
      req.on("data", (dataStream) => {
        formData = dataStream.toString();
      });
      req.on("end", () => {
        if (Object.keys(formData).length !== 0) {
          combineData(parse(formData))
        }
      });
    res.end(JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  })
  .listen(port, () => {
    console.log(`Listening to port ${port} `);
  });

  async function combineData(formData) {
    const dataFromFile = await fs.readFile("./data.txt", "utf8");
    const fileData = JSON.parse(dataFromFile)
    fileData.push(formData)
    await fs.writeFile("./data.txt", JSON.stringify(fileData));
  }
