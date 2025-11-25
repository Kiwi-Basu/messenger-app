import {jwtDecode} from "jwt-decode";

function TokenDecoder () {
  const token = localStorage.getItem("token");
  
  if(!token) {
    return null;
  }
  try {
    const decodedToken : any = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    return null;
  }
}


export default TokenDecoder
