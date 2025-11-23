import { useState } from "react"
import API from "../utils/api"
import { useNavigate } from "react-router"

function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await API.post("/register",
        { username, email, password })
      if (res.data.success) {
        navigate("/otp", { state: { email } })
      }
    } catch (error) {
      console.log(error);
    }
    setUsername("")
    setEmail("")
    setPassword("")
    setLoading(false)
  }
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="border-2 ">
          <h1>Register</h1>
          <form action="" className="flex flex-col p-5 gap-5" >
            <input type="text" value={username} placeholder="Enter Username" className="input-box" onChange={(e) => { setUsername(e.target.value) }} />
            <input type="email" value={email} placeholder="Enter Email" className="input-box" onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" value={password} placeholder="Enter Password" className="input-box" onChange={(e) => { setPassword(e.target.value) }} />
            <button type="submit" disabled={loading} onClick={handleRegister} className="bg-blue-500 text-white p-2" >Register</button>
          </form>
        </div>

      </div>
    </>
  )
}

export default Register