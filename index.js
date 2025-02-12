import axios from "axios";
import bodyParser from "body-parser";
import express from "express";


const app = express();
const token="";

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.listen(3000,()=>{
    console.log("Server Created Successfully");
})


app.get("/",(req,res)=>{

    res.render("index.ejs")
})

app.post("/get", async(req,res)=>{
    try {
var id= req.body.id;
const response= await axios.get(`https://secrets-api.appbrewery.com/secrets/${id}`,{headers:{Authorization:`Bearer ${token}`}});
res.render("index.ejs",{get:response.data})
        
    } catch (error) {
        console.log(error.message)
        if(error.status===404)
        {
            res.render("index.ejs",{error1:"Cannot Find data for this id"})
        }

    }
})

app.post("/post", async (req,res)=>{
    try {
     const   identity = req.body.id;
     const   iScore = req.body.score;
     const   iSecret = req.body.secret;

const response =await axios.post(`https://secrets-api.appbrewery.com/secrets`,{
   id: identity,
    score:iScore,
    secret:iSecret

},  {headers:{Authorization:`Bearer ${token}`}}

)

res.render("index.ejs")

        
    } catch (error) {
        console.log(error.message)
    }
})

app.post("/put", async (req,res)=>{
    try {
        const   identity = req.body.id;
     const   iScore = req.body.score;
     const   iSecret = req.body.secret;
        const response = await axios.put(`https://secrets-api.appbrewery.com/secrets/${identity}`,{
            score:iScore,
            secret:iSecret
        },
        {headers:{Authorization:`Bearer ${token}`}}
        )

res.render("index.ejs")
    } catch (error) {
        console.log(error.message)
    }
})

app.post("/patch", async (req,res)=>{
    try {
        const   identity = req.body.id;
     const   iScore = req.body.score;
     const   iSecret = req.body.secret;
        const response = await axios.patch(`https://secrets-api.appbrewery.com/secrets/${identity}`,{
            score:iScore,
            secret:iSecret
        },
        {headers:{Authorization:`Bearer ${token}`}}
        )

res.render("index.ejs")
    } catch (error) {
        console.log(error.message)
    }
})
app.post("/delete", async (req,res)=>{
    try {
        const   identity = req.body.id;
     
        const response = await axios.delete(`https://secrets-api.appbrewery.com/secrets/${identity}`,
        {headers:{Authorization:`Bearer ${token}`}}
        )

res.render("index.ejs")
    } catch (error) {
        console.log(error.message)
    }
})