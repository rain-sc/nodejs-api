const express = require('express');
const cors = require('cors');
const qs = require('querystring')
const app = express();
const port = 3007  
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const joi = require('joi')
 
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use((req,res,next)=>{
  res.cc = function(err,status= 1){
    res.send({
      status,
      message:err instanceof Error ? err.message : err
    })
  }
  next()
})

const userRouter = require('./router/user')
app.use(userRouter)

app.use((err,req,res,next)=>{
  if(err instanceof joi.ValidationError){
    return res.cc(err)
  }
  res.cc(err)
})

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`);
  }
)