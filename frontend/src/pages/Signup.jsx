import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export const Signup = () => {
  const navigate = useNavigate()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); //set state for password

    return <div className="bg-slate-300 h-screen flex justify-center  ">
    <div className="flex flex-col justify-center items-center h-screen w-full ">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 shadow-lg  shadow-slate-400  ">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e=>{
          setFirstName(e.target.value) // to get current value of input box to send to backend
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={e=>{
          setLastName(e.target.value)
        }}placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={e=>{
          setEmail(e.target.value)
        }} placeholder="harsh@gmail.com" label={"Email"} />
        <InputBox onChange={e=>{
          setPassword(e.target.value)  //populate password state to actual password value
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async()=>{
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              firstName: firstName,
              lastName: lastName,
              username: email,
              password: password
            })
            localStorage.setItem("token", response.data.token)
          navigate("/dashboard")
            }
            
          } label={"Sign up"} />

        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}