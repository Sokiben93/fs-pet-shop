const fs = require("fs"); // ES5
// import fs from "fs/promises" // ES6

const subcommand = process.argv[2]; // Setup the location to reach to the file we set

switch (subcommand) {
  // Read the pets.json file to parse the data, then console log it ( STEP 1);
  // Create and add the index that must read the correct record ( STEP 2);
  // If the given index is out of bound, display standard error usage with a non zero exit code
  case "read": {
    fs.readFile("pets.json", "utf-8", (error, data) => {
      if (error) {
        console.log(error);
      } else {
        var index = process.argv[3];
        var petsArr = JSON.parse(data);
        if (!index) {
          console.log(petsArr);
        } else if (index >= petsArr.length) {
          console.log("Usage: node pets.js read INDEX");
          process.exit(1);
        } else {
          console.log(petsArr[index]);
        }
      }
    });
  }
  case "create": {
    const age = parseInt(process.argv[3]); // Create age, kind, name variable that contain the given index.
    const kind = process.argv[4];
    const name = process.argv[5];
    let obj = { age, kind, name }; // Create obj include age, kind, name.

      fs.readFile("pets.json", "utf-8", (error, data) => {
        petsArr = JSON.parse(data);
        if (age === undefined || kind === undefined || name === undefined) {
          if (error) {
            console.log(error);
          }
          console.error("Usage: node pets.js create AGE KIND NAME");
          process.exit(1);
        } else {
          petsArr.push(obj);
          fs.writeFile("pets.json", JSON.stringify(petsArr), (error) => {
            if (error) {
              console.log(error);
            }
            console.log(petsArr);
          });
        }
      });
  }
  case "update":

  case "destroy":

  default: {
    console.error("Usage: node pets.js [read | create | update | destroy]");
  }
}
