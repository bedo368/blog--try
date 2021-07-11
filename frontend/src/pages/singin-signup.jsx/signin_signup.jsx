import React, { useState } from 'react'
import SignUp from '../../components/sign-up/signup'
import SignIn from '../../components/signin/signin'
import "./signin_signup.scss"
const SignIn_SignUp= ()=> {
    const [pagestate , updatepagestate] = useState(false)
    const changepagestate = ()=>{
        updatepagestate(preval => !preval)
    }
    return (
        <div className="signin_signup" >
            
          {pagestate ?   <SignUp changepagestate={changepagestate} /> : <SignIn  changepagestate={changepagestate} />}
            
        </div>
    )
}

export default SignIn_SignUp
