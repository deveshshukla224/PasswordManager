const express = require('express')
const app = express()
const PORT = 3001;
const cors = require('cors')
const mysql = require('mysql');

const{encrypt,decrypt}=require('./EncryptionHandler');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"Dvi851@#",
    database:"PasswordManager"
});
app.post("/addpassword",(req,res)=>{
    const{password,plateform}=req.body;
    const hashedPassword= encrypt(password);
    db.query("INSERT INTO passwords(password,platform,iv) VALUES (?,?,?)",[
        hashedPassword.password,
        plateform,hashedPassword.iv],(err,result)=>{
            if(err)
            {
                console.log(err);
            }else{
                res.send("Sucsess");
            }
        });
});

app.get("/showpasswords",(req,res)=>{
db.query("SELECT * FROM passwords",(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        res.send(result)
    }
})
});

app.post('/decryptpassword',(req,res)=>{
    res.send(decrypt(req.body))
});

app.listen(PORT,()=>{
    console.log("server is running");
    
});