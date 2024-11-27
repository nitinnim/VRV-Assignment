
import React from 'react'
import Template from '../components/auth/Template'
import signupImg from "../assets/signup.webp"

const RegisterPage = () => {
  return (
    <Template
        title='Join the millions learning to code with StudyNotion for free'
        description1="Welcome aboard – your journey to success starts here!"
        description2="Join us and make an impact from day one!"
        image={signupImg}
        formType="signup"
    />
  )
}


export default RegisterPage
