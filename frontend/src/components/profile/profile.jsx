import { useEffect, useState } from "react"
import { decodeToken } from "../../utils/JwtToken"
import { useAuth } from "../../utils/AuthContext"


export default function ProfilePage() {
    const { jwtToken } = useAuth();
    const [user, setUser] = useState(null)
    useEffect(() => {
        const decodedToken = decodeToken(jwtToken)
        setUser({id: decodedToken.id, username: decodedToken.username})
        console.log(decodedToken)
    }, []) 


    if(!user) {
        return (
            <div>Loading...</div>
        )
    }

    return(
        <div>
            <h1>Profile Page!</h1>
            {user.id}
        </div>
    )
}