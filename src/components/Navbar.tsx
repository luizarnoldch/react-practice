import { Link } from "react-router"

const Navbar = () => {
  return (
    <div className="w-full h-16">
      <nav className="mx-auto container h-full w-full">
        <div className="w-full h-full flex justify-center items-center gap-2">
          <Link to="/">
            Home
          </Link>
          <Link to="/hooks">
            Hooks
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar