const Express= require('express');
const MyRouter = Express.Router();

const multer= require('multer');
// const app= express();


// const upload= multer({
// 	storage: multer.diskStorage({
// 		destination:function(req,file,cb)
// 		{
// 			cb(null,"uploads")

// 		},
// 		filename:function(req,file,cb){
// 			cb(null, file.fieldname + "-" + Date.now() + ".pdf")
// 		}
// 	})
// }).single("pdfFile");

// app.post("/upload",upload,(req, resp)=>{

// resp.send("file uploaded"+" emailClient: "+ req.body.emailClient)
// })

MyRouter.post("/",(req, resp)=>{

	resp.send("file uploaded Test")
	})

	MyRouter.get("/",(req, resp)=>{

		resp.send("file uploaded Test")
		})




module.exports = MyRouter;
