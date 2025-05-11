import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:3000/api/v1/user/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data.user) {
          navigate("/dashboard");
        }
      } catch (e) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      }
    };

    checkUser();
  }, [navigate]);

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center items-center h-screen w-full ">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 shadow-lg shadow-slate-400">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />

          <InputBox 
            placeholder="harsh@gmail.com" 
            label={"Email"} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <InputBox 
            placeholder="123456" 
            label={"Password"} 
            onChange={(e) => setPassword(e.target.value)} 
          />

          <div className="pt-4">
            <Button 
              label={"Sign in"} 
              onClick={async () => {
                try {
                  const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                    username: email,
                    password: password
                  });

                  const token = response.data.token;
                  localStorage.setItem("token", token);

                  const decoded = jwtDecode(token);
                  localStorage.setItem("userId", decoded.userid);

                  window.location.href = "/dashboard";
                } catch (error) {
                  console.error("Login failed:", error);
                  alert("Invalid credentials or server error");
                }
              }} 
            />
          </div>

          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  );
};
