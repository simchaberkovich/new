const
express=require('express'),
app=express(),
jwt=require('jsonwebtoken'),
secret='1234'


const users=[{
    _id:'12234',
    name:'avi',
    email:'a@a',
    pass:'1234'
}]

function Creatoken(id){
    const token=jwt.sign({_id:id},secret,{expiresIn:'15m'})
    return token
}

function authtoken(token){
    const decode=jwt.verify(token,secret)
    const id=decode._id
    const foundUser=users.find(u => u._id===id)
    return foundUser
}

function login(email,pass){
    const foundUser=users.find(u=>u.email===email)
    if(!foundUser||foundUser.pass !==pass) throw 'not auth'
    const token=Creatoken(foundUser._id)
    return token
}

function log(){
    try{
      const token=  login('a@a','1234')
      const res=authtoken(token)
      console.log(res)
    }catch (error){
        console.log(error);
    }
}

app.listen(3210, () =>console.log('server is up'))