import {NavLink} from "react-router-dom";
import './TabNavigation.css'

export function TabNavigation() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink
                        to="/"
                        className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                    >
                        Todos
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                        className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                    >
                        About me
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default TabNavigation;