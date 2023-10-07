import { NavLink } from "react-router-dom";
import './style.scss'

const Header = ({ page }: Props) => (
	<header className={"header " + page}>
		<div className="container">
			<NavLink to='/' className="logo">
				TRQN
			</NavLink>
			<nav className="navlinks">
				<NavLink className="navlinks-link">
					Sneakers
				</NavLink>
				<NavLink className="navlinks-link">
					High-Tops
				</NavLink>
				<NavLink className="navlinks-link">
					Retro
				</NavLink>
				<NavLink className="navlinks-link">
					Skate
				</NavLink>
			</nav>
		</div>
	</header>
)

export interface Props {
	page: string;
}

export default Header