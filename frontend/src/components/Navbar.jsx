import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div>
        <ul className="bg-amber-900">
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/task"}>Task</Link></li>
        </ul>
    </div>
  )
}

export default Navbar