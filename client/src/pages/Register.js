
import React from 'react'
import Template from '../components/auth/Template'
import signupImg from "../assets/signup.webp"

const RegisterPage = () => {
  return (
    <Template
        title='Join the millions learning to code with StudyNotion for free'
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={signupImg}
        formType="signup"
    />
  )
}

export default RegisterPage
