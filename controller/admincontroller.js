const {objectid, ObjectId} =require('mongodb')
const db =require('../model/server')




const getadminlog =(req,res)=>{
    req.session.adminlogin = true
    console.log('Admin login reached')
    res.render('adminlogin')
}

const adminemail = "sayeed@gmail.com"
const adminpassword = 123456

const adminhomeview =(req,res)=>{
    console.log(req.body);
  let email = req.body.email
  let password = req.body.password

  let data = {
    'email' : email,
    'password':password
   }
    if (adminemail== data.email&&adminpassword==data.password){
    console.log('admin home reached')
    res.render('adminhome')
    }else{
    res.redirect('/admin')
    }
}
 console.log("1")
const getusers = async(req,res)=>{

    let userdetails = await db.get().collection('userdetails').find().toArray()
    console.log(userdetails);

console.log("2")
    res.render('viewall',{userdetails})
}
 


let search = async (req,res)=>{
    console.log("i")

    console.log(req.body.searchData)
    
     let regExp = new RegExp(req.body.searchData,'i')
     let matcheduser = await db.get().collection('userdetails').find({
        $or:[
            {
                name:{regex:regExp}
            },
            {email:{$regex:regExp}}
        ]
     }).toArray()
      console.log(matcheduser)
      console.log("IILLL")

      res.render('viewall',{matcheduser})
}
console.log("II")

let deleteuser = async (req,res)=>{
         let id1=req.params.id
         console.log(req.params.id) 
         let del = await db.get().collection('userdetails').deleteOne({_id:ObjectId(id1)})
         res.redirect('/admin/getusers')
}


let edituser =async(req,res) =>{
    let userIdpass =req.params.id
    let matcheduser = await db.get().collection("userdetails").find({_id:ObjectId(userIdpass)}).toArray()
    console.log("edituser",matcheduser)
    res.render('edit',{matcheduser:matcheduser[0]})
}

let updateuser =async(req,res)=>{
    let updateId =req.params.id
    let updatedname =req.body.updatename
    let updatedemail = req.body.email

    console.log(req.body)
    console.log(updatedemail)

    let updateuser = await db.get().collection("userdetails").updateOne(
        {
            _id:ObjectId(updateId)
        },
        {
            $set:{
                name : updatedname,
                email : updatedemail
            }
        }
    )
    res.redirect("/admin/getusers")
}


// const postlogadmin = (req,res)=>{

//     res.redirect('/adminhome')
// }


module.exports = {
    getadminlog,
    adminhomeview,
    getusers,
    search,
    deleteuser,
    edituser,
    updateuser,
}