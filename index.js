import express from "express";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Request accepted");
  res.send(
    "How to use file system API<br>" +
      " to create file user = /createfile<br>" +
      "to get file list use = /getfileList"
  );
});

// when user enters "createfile" this function will get called and
//file with current date-time will be created with timestamp as body of file

app.get("/createfile", (req, res) => {
  const { fileName, timestamp } = getFileDate();
  fs.writeFile(`./Backup/${fileName}.txt`, JSON.stringify(timestamp), (err) => {
    if (err) throw err;
    console.log("file created "+ fileName);
  });
  res.send({ filename: `${fileName}.txt` });
});

app.get("/getfileList", (req, res) => {
    fs.readdir("./Backup/", (err, files) => {
        if(files.length == 0){
            res.send("No files in directory!");
        } else{
            var myJsonString = JSON.stringify(files);
            res.send(myJsonString);
        }
    })
})

function getFileDate() {
  var timestamp = new Date().getTime();
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hrs = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  let fileName =
    date + "-" + month + "-" + year + " " + hrs + "_" + minutes + "_" + seconds;
  return { fileName, timestamp };
}

app.listen(process.env.PORT, () => {
  console.log(`Server is up in ${process.env.PORT}`);
});
