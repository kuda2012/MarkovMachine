/** Command-line tool to generate Markov text. */

const fs = require("fs");
const { MarkovMachine } = require("./markov");
const axios = require("axios");
const process = require("process");

function file(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log("Error:", err);
      process.kill(1);
    }
    createText(data);
  });
}

async function URL(link) {
  await axios
    .get(link)
    .then((resp) => {
      createText(resp.data);
    })
    .catch((err) => {
      console.log(err);
      process.kill(1);
    });
}

function createText(text) {
  let mm = new MarkovMachine(text);
  const sentence = mm.makeText();
  console.log(sentence);
}

if (process.argv[2] == "file") {
  file(process.argv[3]);
} else {
  URL(process.argv[3]);
}
