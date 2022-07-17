// import fs from "fs/promises" // ES6

// const subcommand = process.argv[2]; // Setup the location to reach to the file we set

// switch (subcommand) {
//   // Read the pets.json file to parse the data, then console log it ( STEP 1);
//   // Create and add the index that must read the correct record ( STEP 2);
//   // If the given index is out of bound, display standard error usage with a non zero exit code
//   case "read": {
//     fs.readFile("pets.json", "utf-8", (error, data) => {
//       if (error) {
//         console.log(error);
//       } else {
//         var index = process.argv[3];
//         var petsArr = JSON.parse(data);
//         if (!index) {
//           console.log(petsArr);
//         } else if (index >= petsArr.length) {
//           console.log("Usage: node pets.js read INDEX");
//           process.exit(1);
//         } else {
//           console.log(petsArr[index]);
//         }
//       }
//     });
//   }
//   case "create": {
//     const age = parseInt(process.argv[3]); // Create age, kind, name variable that contain the given index.
//     const kind = process.argv[4];
//     const name = process.argv[5];
//     let obj = { age, kind, name }; // Create obj include age, kind, name.

//       fs.readFile("pets.json", "utf-8", (error, data) => {
//         petsArr = JSON.parse(data);
//         if (age === undefined || kind === undefined || name === undefined) {
//           if (error) {
//             console.log(error);
//           }
//           console.error("Usage: node pets.js create AGE KIND NAME");
//           process.exit(1);
//         } else {
//           petsArr.push(obj);
//           fs.writeFile("pets.json", JSON.stringify(petsArr), (error) => {
//             if (error) {
//               console.log(error);
//             }
//             console.log(petsArr);
//           });
//         }
//       });
//   }
//   case "update":

//   case "destroy":

//   default: {
//     console.error("Usage: node pets.js [read | create | update | destroy]");
//   }
// }

//// More clean and pretty code

const fs = require("fs"); // ES5
const petsPath = "pets.json";

fs.readFile(petsPath, "utf-8", (err, petsJSON) => {
  const subcommand = process.argv[2];
  const pets = JSON.parse(petsJSON);
  const index = process.argv[3];

  if (subcommand === "read") {
    if (!index) {
      console.log(pets);
    } else if (index < 0 || index >= pets.length) {
      console.error("Usage: node pets.js read INDEX");
      process.exit(1);
    } else {
      console.log(pets[index]);
    }
  }

  if (subcommand === "create") {
    const age = parseInt(process.argv[3]);
    const kind = process.argv[4];
    const name = process.argv[5];
    let newPet = { age, kind, name };

    if (age && kind && name) {
      pets.push(newPet);
      fs.writeFile(petsPath, JSON.stringify(pets), (error) => {
        if (error) {
          console.log(error);
        }
        console.log(pets);
      });
    } else {
      console.error('Usage: node pets.js create AGE KIND NAME');
      process.exit(1);
    }
  }

  if (!subcommand) {
    console.error("Usage: node pets.js [read | create | update | destroy]");
  }
});
