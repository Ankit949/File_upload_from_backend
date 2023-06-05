const { urlencoded } = require("express")
const express = require("express")
const fileUpload = require("express-fileupload")
const cloudinary = require("cloudinary").v2;

const app = express()

cloudinary.config({
    // cloud_name: processs.env.CLOUD_NAME
    cloud_name: "xxxxxx",
    api_key: "xxxxxxx",
    api_secret: "xxxxxxx"
});

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send(" <H1> Hello Ankit </H1>")
})

app.post("/mypost", async (req, res) => {
    console.log(req.body)
    console.log(req.files)

    // let result;
    // let imageArray = [];

    // case - multiple images

    // if (req.files) {
    //     for (let index = 0; index < req.files.samplefile.length; index++) {
    //         let result = await cloudinary.uploader.upload(
    //             req.files.samplefile[index].tempFilePath,
    //             {
    //                 folder: "users"
    //             }
    //         );


    //         imageArray.push({
    //             public_id: result.public_id,
    //             secure_url: result.secure_url
    //         });
    //     }
    // }

    // ### use case for single image
    let file = req.files.samplefile;
    result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "users",
    });

    console.log(result);

    let details = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        result
    };
    console.log(details);

    res.send(details);
});

app.get("/getform", (req, res) => {
    res.render("getform")
})

app.get("/mypostform", (req, res) => {
    res.render("postforms");
});

app.listen(3000, (req, res) => {
    console.log(`APP listening at port 3000`)
})

