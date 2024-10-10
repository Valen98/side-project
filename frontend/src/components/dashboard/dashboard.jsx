import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
    const navigate = useNavigate
    useEffect(() => {
        if(!localStorage.getItem('TOKEN')) {
            navigate('/login')
        }
    })

    return(
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}