/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
// we need to install inquirer,qr-image,fs first 
// npm install --save inquirer 
// npm install --save qr-image 
// npm install --save fs 
import inquirer from "inquirer"; // Import the inquirer npm package for user input
import qr from "qr-image"; // Import the qr-image npm package for generating QR codes
import fs from "fs"; // Import the native fs module for working with files

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        message: "Type in your URL: ", // Prompt the user to enter a URL
        name: "URL", // The user's input will be stored in the "URL" property of the answers object
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.URL; // Retrieve the URL entered by the user from the answers object

    // Generate a QR code image based on the user-entered URL
    var qr_svg = qr.image(url);

    // Pipe (write) the QR code SVG data to a file named "qr_img.png"
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));

    // Write the user's URL to a text file named "URL.txt"
    fs.writeFile("URL.txt", url, (err) => {
        if (err) throw err; // Handle any errors that occur during file writing
        console.log("The file has been saved!"); // Log a success message
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
