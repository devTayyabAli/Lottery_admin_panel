
import { Outlet, Navigate } from 'react-router-dom'
const PrivateRoutes = () => {
    let isuser= localStorage.getItem("UserAuth")

 
    return (
        !isuser ? <Navigate to="/" /> : <Outlet />
    )
}
export default PrivateRoutes