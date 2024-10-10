import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../utils/AuthContext"

export default function Dashboard() {
    const {logout} = useAuth();

    const handleSignOut = () => {
        logout()
    }

    return(
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleSignOut}>Sign out</button>
        </div>
    )
}