import { NavLink, Link, useNavigate, NavigateFunction } from "react-router-dom";
import './style.scss'
import { useContext, useState } from "react";
import { AuthContext } from "src/AuthContext";
import ProfileIcon from "../profileIcon";
import api from "src/api/axiosConfig";

export const logout = (navigate: NavigateFunction, setRole: Function) => {
	if (confirm("Are you sure you want to log out?")){
		api.get("/users/logout")
		.then(() => {
			setRole(null)
			navigate('/')
		})
	}
}

const Header = () => {
	const navigate = useNavigate()
    const { setIsAdmin } = useContext(AuthContext)
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [Search, setSearch] = useState("");
	const [menuOpened, setMenuOpened] = useState(false);

	const toggleMenu = (isActive: boolean) => {
		if (!isActive) {
			setMenuOpened(false);
			document.body.classList.remove("burger-menu");
		}
		else {
			setMenuOpened(true)
			document.body.classList.add("burger-menu");
		}

	}

	const { isAdmin } = useContext(AuthContext)


	const OnSearchSubmit = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			navigate(`/catalog/${Search}`)
		}
	}


	return (
		<header className={"header"} >
			<div className={"header-container" + (isCollapsed ? "" : " searchActive")}>
				<div className="container">
					<span className="logo">
						<svg
							onClick={() => toggleMenu(true)}
							width="30" height="30"
							viewBox="0 0 29 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M1 12H28" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M1 23H28" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M1 1H28" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
						</svg>

						<NavLink to='/'>
							TRQN
						</NavLink>
					</span>
					<nav className="navlinks">
						<NavLink to='/catalog/sneakers' className="navlinks-link">
							Sneakers
						</NavLink>
						<NavLink to='/catalog/highTops' className="navlinks-link">
							High-Tops
						</NavLink>
						<NavLink to='/catalog/retro' className="navlinks-link">
							Retro
						</NavLink>
						<NavLink to='/catalog/skate' className="navlinks-link">
							Skate
						</NavLink>
					</nav>
				</div>

				<div className="container icons">
					<div className={isCollapsed ? "search collapsed" : "search opened"} >
						<div className="search_field container">
							<input className="" value={Search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => OnSearchSubmit((e as unknown) as KeyboardEvent)} />
							<svg onClick={() => { setIsCollapsed(true); setSearch("") }} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M7 17L16.8995 7.10051" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M7 7.00001L16.8995 16.8995" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</div>
						<span className="search iconwrapper" onClick={() => setIsCollapsed(false)}>
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M8.75004 14.1667C11.7416 14.1667 14.1667 11.7416 14.1667 8.75004C14.1667 5.7585 11.7416 3.33337 8.75004 3.33337C5.7585 3.33337 3.33337 5.7585 3.33337 8.75004C3.33337 11.7416 5.7585 14.1667 8.75004 14.1667Z" stroke="black" strokeLinejoin="round" />
								<path d="M16.372 16.9614C16.5347 17.124 16.7986 17.124 16.9613 16.9614C17.124 16.7986 17.124 16.5348 16.9613 16.372L16.372 16.9614ZM16.9613 16.372L12.7947 12.2054L12.2053 12.7947L16.372 16.9614L16.9613 16.372Z" fill="black" />
							</svg>
						</span>
					</div>
					{isAdmin ? null :
						<Link to="/cart" className="cart">
							<span className="iconwrapper">
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M4.4444 5H16.556C17.0572 5 17.4451 5.43932 17.3829 5.93669L16.7579 10.9367C16.7057 11.3537 16.3512 11.6667 15.931 11.6667H13.7962H7.87032H6.66662" stroke="black" strokeLinejoin="round" />
									<path d="M1.66675 3.33344H3.5281C3.9049 3.33344 4.23482 3.58628 4.33278 3.95013L6.91738 13.5501C7.01534 13.9139 7.34526 14.1668 7.72206 14.1668H15.8334" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M8.33333 17.5001C8.79357 17.5001 9.16667 17.127 9.16667 16.6668C9.16667 16.2065 8.79357 15.8334 8.33333 15.8334C7.8731 15.8334 7.5 16.2065 7.5 16.6668C7.5 17.127 7.8731 17.5001 8.33333 17.5001Z" stroke="black" strokeLinejoin="round" />
									<path d="M14.5833 17.5001C15.0436 17.5001 15.4167 17.127 15.4167 16.6668C15.4167 16.2065 15.0436 15.8334 14.5833 15.8334C14.1231 15.8334 13.75 16.2065 13.75 16.6668C13.75 17.127 14.1231 17.5001 14.5833 17.5001Z" stroke="black" strokeLinejoin="round" />
								</svg>
							</span>
						</Link>
					}
					<ProfileIcon />
					{
						isAdmin ?
							<span className="iconwrapper" style={{transform: "scaleX(-1)"}}>
								<svg onClick={() => logout(navigate, setIsAdmin)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
									<g  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
										<path d="M2184 4461 c-44 -27 -60 -77 -41 -124 31 -72 -37 -67 942 -67 747 0 889 -2 938 -15 103 -27 167 -82 216 -185 l26 -55 0 -1455 0 -1455 -26 -55 c-37 -80 -81 -125 -157 -162 l-67 -33 -911 -5 c-873 -5 -913 -6 -933 -24 -33 -30 -45 -78 -27 -119 29 -71 -24 -67 968 -67 984 0 961 -1 1082 62 78 41 183 146 224 224 65 124 62 42 62 1634 0 1592 3 1510 -62 1634 -41 78 -146 183 -224 224 -121 63 -98 62 -1084 62 -865 0 -896 -1 -926 -19z" />
										<path d="M1554 3614 c-40 -20 -900 -882 -909 -912 -19 -63 -14 -68 458 -540 449 -449 453 -452 493 -452 74 0 128 71 104 136 -6 16 -163 181 -353 372 l-342 342 1164 0 c1067 0 1165 1 1191 17 58 34 68 116 21 164 l-29 29 -1173 0 -1173 0 346 348 c268 268 347 354 353 379 9 44 -18 97 -60 117 -41 20 -52 20 -91 0z" />
									</g>
								</svg>
							</span>
							: null
					}
				</div>
			</div>

			<div className={menuOpened ? "BurgerMenu active" : "BurgerMenu inactive"}>
				<div className="header">
					<NavLink to='/' onClick={() => toggleMenu(false)} className="logo">
						TRQN
					</NavLink>
					<svg
						onClick={() => toggleMenu(false)}
						width="29" height="29"
						viewBox="0 0 29 29"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<g id="Close">
							<path id="Vector" d="M1 28L28 1.27136" stroke="#D9D9D9" strokeLinecap="round" strokeLinejoin="round" />
							<path id="Vector_2" d="M1 1L28 27.7287" stroke="#D9D9D9" strokeLinecap="round" strokeLinejoin="round" />
						</g>
					</svg>
				</div>
				<nav className="navlinks">
					<NavLink to='/catalog/sneakers' onClick={() => toggleMenu(false)} className="navlinks-link">
						Sneakers
					</NavLink>
					<NavLink to='/catalog/highTops' onClick={() => toggleMenu(false)} className="navlinks-link">
						High-Tops
					</NavLink>
					<NavLink to='/catalog/retro' onClick={() => toggleMenu(false)} className="navlinks-link">
						Retro
					</NavLink>
					<NavLink to='/catalog/skate' onClick={() => toggleMenu(false)} className="navlinks-link">
						Skate
					</NavLink>
					{
						isAdmin == null ?
							<NavLink to='/auth' onClick={() => toggleMenu(false)} className='navlinks-link login'>
								Log in
							</NavLink> : 
							<a onClick={() => {logout(navigate, setIsAdmin);toggleMenu(false)}} className='navlinks-link login'>
								Log out
							</a>
					}
				</nav>
			</div>
		</header>
	)
}

export default Header