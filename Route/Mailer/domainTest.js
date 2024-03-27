const Express = require("express");
const MyRouter = Express.Router();
const path = require('path'); // Don't forget to require the 'path' module
const AdviserModal = require("../../Model/Adviser/Adviser");

let myURl;
MyRouter.use(Express.static(__dirname));

// Middleware function to log full URL
const logFullUrl = (req, res, next) => {
  // console.log("Full URL:", req.originalUrl);
  myURl = req.originalUrl;
  next(); // Call the next middleware in the stack
};

// Apply middleware to log full URL for all routes
MyRouter.use(logFullUrl);

MyRouter.get("/SampleTest", async (req, res) => {


  // If you want to send the HTML file separately
  res.sendFile(path.join(__dirname, 'template.html'));
});




function Doc(address, title, obj) {
  const htmlContent = `
  <!doctype html>
  <html lang="en">
    <head>
      <title>`+ title + `</title>
      <!-- Required meta tags -->
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      <!-- Bootstrap CSS v5.2.1 -->
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossorigin="anonymous"
      />

      <style>
      iframe{
          width:100%;
          height:100%;
      }
      </style>

    </head>

    <body class="p-0 m-0 vh-100 overflow-hidden">

    <iframe src="`+ address + `" class="p-0 m-0" onLoad="sendMassage()" ></iframe>

      <!-- Bootstrap JavaScript Libraries -->
      <script
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
        crossorigin="anonymous"
      ></script>

      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
        integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
        crossorigin="anonymous"
      >
        
      </script>
      
      
      <script>
      function sendMassage(){
        // Get the iframe element
        var iframe = document.querySelector('iframe');

        // Check if the iframe is not null
        if (iframe) {
            // Access the contentWindow of the iframe
            var iframeWindow = iframe.contentWindow;

            // Check if the contentWindow is not null
            if (iframeWindow) {
              let Data = {
                ID:"`+ obj._id + `",
                Domain:"`+ obj.Domain + `"
              }
                // Send a message to the iframe
                iframeWindow.postMessage(Data, iframe.src);
            }
        }
      }
      </script>


    </body>
  </html>
`;
  return (htmlContent)
}



MyRouter.get("/:Domain/LIHC", async (req, res) => {

  // console.log("LIHC 12345", myURl);

  var url = myURl;
  var parts = url.split("/");
  // Assuming that "domain_test" is always the second part in the URL
  var desiredData = parts[1];
  console.log("desiredData 14567890", desiredData); // This will output "domain_test"

  const UserDomain = req.params.Domain;
  console.log("Got From UserDomain: ", UserDomain); // This will output "domain_test"

  const Adviser = await AdviserModal.findOne({ Domain: UserDomain });

  if (!Adviser) {
    res.sendFile(path.join(__dirname, "..", '..', 'view', '404.html'));
    // return res.status(404).send({ message: "User not found" });
  }
  else {

    console.log(Adviser);

    let UI = Doc('https://calculators.denarolink.com.au/21-Nov-V1/LIHC/', "Commonwealth seniors health care card calculator", Adviser);
    // let UI = Doc('http://127.0.0.1:5500/LIHC/index.html',"Low Income Health Care Card",Adviser);
    // console.log(UI)
    res.send(UI);
  }


});

MyRouter.get("/:Domain/CSHC", async (req, res) => {

  var url = myURl;
  var parts = url.split("/");
  // Assuming that "domain_test" is always the second part in the URL
  var desiredData = parts[1];
  console.log("desiredData 14567890", desiredData); // This will output "domain_test"

  const UserDomain = req.params.Domain;
  console.log("Got From UserDomain: ", UserDomain); // This will output "domain_test"

  const Adviser = await AdviserModal.findOne({ Domain: UserDomain });

  if (!Adviser) {
    res.sendFile(path.join(__dirname, "..", '..', 'view', '404.html'));
    // return res.status(404).send({ message: "User not found" });
  }
  else {


    let UI = Doc('https://calculators.denarolink.com.au/21-Nov-V1/CSHC/', "Commonwealth seniors health care card calculator", Adviser);
    // let UI = Doc('http://127.0.0.1:5500/CSHC/index.html',"Commonwealth seniors health care card calculator",Adviser);

    res.send(UI);
  }
});

MyRouter.get("/:Domain/Age-Pension", async (req, res) => {

  var url = myURl;
  var parts = url.split("/");

  // Assuming that "domain_test" is always the second part in the URL
  var desiredData = parts[1];
  console.log("desiredData 14567890", desiredData); // This will output "domain_test"



  const UserDomain = req.params.Domain;
  console.log("Got From UserDomain: ", UserDomain); // This will output "domain_test"

  const Adviser = await AdviserModal.findOne({ Domain: UserDomain });

  if (!Adviser) {
    res.sendFile(path.join(__dirname, "..", '..', 'view', '404.html'));
    // return res.status(404).send({ message: "User not found" });
  }
  else {

    let UI = Doc('https://calculators.denarolink.com.au/21-Nov-V1/Age-Pension/', "Age pension calculator");
    // let UI = Doc('http://127.0.0.1:5500/Age-Pension/index.html',"Age pension calculator",Adviser);

    res.send(UI);
  }

});

module.exports = MyRouter;
