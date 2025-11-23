import { useRef, useState } from "react";
import API from "../utils/api"
import { useLocation, useNavigate } from "react-router";


function Otp() {
  const navigate = useNavigate();
  const location = useLocation();
  const otpRef = useRef<(HTMLInputElement | null)[]>([])


  const email = location.state?.email;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault();
    try {
      const finalOTP = otp.join("")
      await API.post("/verify-otp", { otp: finalOTP, email })
      navigate("/")

    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form className="flex flex-col gap-2" >
          <div className="flex gap-2">
            {otp.map((digit, i) => (

              <input key={i}
              className="input-box"
                type="text"
                ref={(el) => {otpRef.current[i] = el}}
                maxLength={1}
                value={digit}

                onKeyDown={(e)=>{
                  if(e.key=='Backspace' && i>0 && !otp[i]){
                    otpRef.current[i-1]?.focus()
                  }
                }}


                onChange={(e) => {
                  const val = e.target.value

                  if (!/^[0-9]?$/.test(val)) return;

                  const newOtp = [...otp];
                  newOtp[i] = val;
                  setOtp(newOtp);
    
                  if (val && i < otp.length - 1) {
                    otpRef.current[i + 1]?.focus();
                  }
                }
                }

              />
            ))}

          </div>
          <button onClick={handleSubmit} disabled={loading} className="input-box">Submit</button>
        </form>
      </div>
    </>
  )
}


export default Otp