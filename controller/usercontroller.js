const bcrypt =require('bcrypt')
const db =require('../model/server')
const session =require('express-session')






const loginpageView = (req,res)=>{

    console.log('login-session')

    if(req.session.loginuser){
        
        console.log('HomeReached')
        res.redirect('/userhome')
    
        }else{
            console.log('else-session')
            res.render('login')
        }
    
        req.session.loginerror = false
}






const postlogin = async (req,res)=>{

    const{email,password} = req.body

    console.log(req.body)

    let user = await db.get().collection('userdetails').findOne({email})

    console.log(user)

    if(user){

        bcrypt.compare(password,user.password,(err,data)=>{

            if(err) {
                console.log(err)
            }
            else if(data){
                console.log("login usser succsfull")

               req.session.loginuser=true;
               res.redirect('/userhome')
            }else{
                req.session.loginerror  = true

                console.log("password wrong")
                 res.redirect('/')
            }
        })
    }
    else{
        res.redirect('/')
        console.log("wrong usser")
        
    }
}






const signupView =(req,res) =>{
   if(req.session.loginuser){
    res.redirect('/')
   }else{
    res.render('signup')
   }
    
}




let toy = [{
    img :"https://res.cloudinary.com/graham-media-group/image/upload/f_auto/q_auto/c_thumb,w_700/v1/media/gmg/GE6XGX7QSFFPFDC6MZ244XWFBM.jpg?_a=ATO2Bfe0",
    car :"Italian cheese",
    desc :"it may be a good option for you",
},
{
    img :"https://res.cloudinary.com/graham-media-group/image/upload/f_auto/q_auto/c_thumb,w_700/v1/media/gmg/GE6XGX7QSFFPFDC6MZ244XWFBM.jpg?_a=ATO2Bfe0",
    car :"Italian cheese",
    desc :"it may be a good option for you",
},
{
    img :"https://res.cloudinary.com/graham-media-group/image/upload/f_auto/q_auto/c_thumb,w_700/v1/media/gmg/GE6XGX7QSFFPFDC6MZ244XWFBM.jpg?_a=ATO2Bfe0",
    car :"Italian cheese",
    desc :"it may be a good option for you",
},
{
    img :"https://res.cloudinary.com/graham-media-group/image/upload/f_auto/q_auto/c_thumb,w_700/v1/media/gmg/GE6XGX7QSFFPFDC6MZ244XWFBM.jpg?_a=ATO2Bfe0",
    car :"Italian cheese",
    desc :"it may be a good option for you",
},
{
    img :"https://res.cloudinary.com/graham-media-group/image/upload/f_auto/q_auto/c_thumb,w_700/v1/media/gmg/GE6XGX7QSFFPFDC6MZ244XWFBM.jpg?_a=ATO2Bfe0",
    car :"Italian cheese",
    desc :"it may be a good option for you",
},
{
    img :"https://res.cloudinary.com/graham-media-group/image/upload/f_auto/q_auto/c_thumb,w_700/v1/media/gmg/GE6XGX7QSFFPFDC6MZ244XWFBM.jpg?_a=ATO2Bfe0",
    car :"Italian cheese",
    desc :"it may be a good option for you",
}]


const homepageView =(req,res)=>{
    console.log('home-session')
     if(req.session.loginuser) 
       res.render('userhome',{toy})
     else res.redirect("/")
     
 }






const postuserview =async (req,res)=>{

    
    let name =req.body.username
    let email =req.body.emailaddress
    let hashedpassword = await bcrypt.hash(req.body.password,10)
    let hashedconfirmpassword = await bcrypt.hash(req.body.conpassword,10)

    console.log('register')

    let data ={
       'name' : name,
       'email': email,
       'password': hashedpassword,
       'confirmpassword': hashedconfirmpassword
    }


db.get().collection('userdetails').insertOne(data,(err,collection)=>{
    console.log(req.body)
    if(err) throw err;
   
    console.log('insertion')
})



res.redirect('/')


   

}

const logout = (req,res)=>{
    req.session.destroy()
    res.redirect('/')
}



module.exports = {
    loginpageView,
    homepageView,
    signupView,

    postuserview,
    postlogin,
    logout,
}