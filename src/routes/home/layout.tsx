import { Outlet } from "react-router"
import Navbar from "../../components/Navbar"

const LayoutHome = () => {
  return (
    <div className='w-full min-h-screen'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default LayoutHome