import { useState } from "react"
import { useNavigate } from "react-router"
import AUTHAPI from "../utils/API"
function Login() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault()
    try {
      const res = await AUTHAPI.post("/login", { email, password })
      localStorage.setItem("token", res.data.token)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <>
      <div>Login</div>
      <form action="">
        <input onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder="Enter Email" />
        <input onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Enter Password" />
        <button type="submit" disabled={loading} onClick={handleSubmit}>Login</button>
      </form>
    </>
  )
}

export default Login
