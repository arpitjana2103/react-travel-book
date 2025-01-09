import { NavLink } from "react-router";
import Logo from "./Logo";

function Nav() {
    return (
        <ul>
            <div>
                <NavLink to="/">
                    <Logo />
                </NavLink>
            </div>

            <div>
                <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
                <li>
                    <NavLink to="/product">Product</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
            </div>
        </ul>
    );
}

export default Nav;
