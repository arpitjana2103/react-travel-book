import { NavLink } from "react-router";
import Logo from "./Logo";
import style from "../styles/nav.module.css";

function Nav() {
    return (
        <nav className={style.nav}>
            <div>
                <NavLink to="/">
                    <Logo />
                </NavLink>
            </div>

            <ul>
                <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
                <li>
                    <NavLink to="/product">Product</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;
