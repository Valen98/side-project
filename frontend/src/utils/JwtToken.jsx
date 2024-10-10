import { jwtDecode } from "jwt-decode";


export const decodeToken = (jwtToken) => {
    if(jwtToken != null){
        return jwtDecode(jwtToken)
    }
  }