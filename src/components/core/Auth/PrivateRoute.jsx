import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth)

  // 🔥 FIXED
  if (!token) {
    return <Navigate to="/login" />
  }

  return children
}

export default PrivateRoute