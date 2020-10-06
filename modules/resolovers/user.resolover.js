const User = require("../schema/userschema");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { getUser } = require("./merge");
const jwt = require("jsonwebtoken")

const userQyery = {
  getUserById: async ({userId}) => {
    const user = await getUser(  userId);
    return {...user}
  },
  login : async({email , password })=>{
    const user =  await User.findOne({email});
    if(!user){
      throw new Error("USER IS NOT EXISIST")
    }
    const isEqual = await bcrypt.compare(password , user.password )

    if(!isEqual){
      throw Error("Password is incorrect")
    }
    const token = await jwt.sign({userId : user._id, email:user.email } , "Passwordiscorrect" , {expiresIn : "1h"} )

    return { 
      userId : user._id,
      token,
      tokenExpriration:1,
      email : user.email,
      displayName : user.displayName

    }




  }
  
};




const userMutation = {
    createUser: async ({ email, password, displayName, photo, date }) => {
      try {
        const checkUserExist = await User.findOne({ email });
        if (checkUserExist) {
          throw new Error("user is already exist");
        }
  
        const hashedpassword = await bcrypt.hash(password, saltRounds);
  
        const newUser = new User({
          email,
          password: hashedpassword,
          date: new Date(),
          displayName,
          photo,
        });
        const saveuser = await newUser.save();
        return {
          ...saveuser._doc,
          password: null,
        };
      } catch (error) {
        throw error;
      }
    },
  };





module.exports = { 
    ...userMutation,
    ...userQyery
}
