
import { Appbar } from "../components/AppBar"
import { useState } from "react"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useEffect } from "react"
import axios from "axios"
export const Dashboard = () => {
   
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
               
                setBalance(response.data.balance);  // Update balance state with fetched value
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
    }, []); 
    

    return <div>

        <Appbar />
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center w-1/2 bg-white shadow-lg rounded-lg p-6">
                <Balance value={balance} />
                <Users />
            </div>
        </div>    
    </div>
 
}