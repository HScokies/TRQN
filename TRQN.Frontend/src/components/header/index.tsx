import { NavLink } from "react-router-dom";
import './style.scss'
import { useState } from "react";

const Header = ({ isAdmin = true }: Props) => {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [Search, setSearch] = useState("");
	const [menuOpened, setMenuOpened] = useState(false);

	const toggleMenu = (isActive: boolean) => {
		if (!isActive){
			setMenuOpened(false);
			document.body.classList.remove("burger-menu");
		}
		else{
			setMenuOpened(true)
			document.body.classList.add("burger-menu");
		}

	}

	return (
		<header className={"header"} >
			<div className={"header-container"+(isCollapsed?"":" searchActive")}>
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
							<input className="" value={Search} onChange={(e) => setSearch(e.target.value)} />
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

					<div className="cart">
						<span className="iconwrapper">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4.4444 5H16.556C17.0572 5 17.4451 5.43932 17.3829 5.93669L16.7579 10.9367C16.7057 11.3537 16.3512 11.6667 15.931 11.6667H13.7962H7.87032H6.66662" stroke="black" strokeLinejoin="round" />
								<path d="M1.66675 3.33344H3.5281C3.9049 3.33344 4.23482 3.58628 4.33278 3.95013L6.91738 13.5501C7.01534 13.9139 7.34526 14.1668 7.72206 14.1668H15.8334" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M8.33333 17.5001C8.79357 17.5001 9.16667 17.127 9.16667 16.6668C9.16667 16.2065 8.79357 15.8334 8.33333 15.8334C7.8731 15.8334 7.5 16.2065 7.5 16.6668C7.5 17.127 7.8731 17.5001 8.33333 17.5001Z" stroke="black" strokeLinejoin="round" />
								<path d="M14.5833 17.5001C15.0436 17.5001 15.4167 17.127 15.4167 16.6668C15.4167 16.2065 15.0436 15.8334 14.5833 15.8334C14.1231 15.8334 13.75 16.2065 13.75 16.6668C13.75 17.127 14.1231 17.5001 14.5833 17.5001Z" stroke="black" strokeLinejoin="round" />
							</svg>
						</span>
					</div>
					{
						!isAdmin ? null :
							<div className="profile">
								<span className="iconwrapper">
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M12.7666 10.4078L12.4587 9.9053C12.2594 10.0259 12.15 10.2514 12.1793 10.4814C12.2084 10.7113 12.3707 10.9028 12.5939 10.9705L12.7666 10.4078ZM7.23338 10.4078L7.40605 10.9705C7.6292 10.9028 7.79154 10.7113 7.82079 10.4814C7.84992 10.2514 7.74051 10.0259 7.54122 9.9053L7.23338 10.4078ZM14.7362 5.88235C14.7362 7.58587 13.8256 9.07859 12.4587 9.9053L13.0744 10.9102C14.7795 9.87894 15.9203 8.01329 15.9203 5.88235H14.7362ZM10 1.17647C12.6157 1.17647 14.7362 3.28336 14.7362 5.88235H15.9203C15.9203 2.63362 13.2697 0 10 0V1.17647ZM5.26378 5.88235C5.26378 3.28336 7.38425 1.17647 10 1.17647V0C6.73033 0 4.07973 2.63362 4.07973 5.88235H5.26378ZM7.54122 9.9053C6.17441 9.07859 5.26378 7.58588 5.26378 5.88235H4.07973C4.07973 8.01329 5.22052 9.87894 6.92555 10.9102L7.54122 9.9053ZM7.06072 9.84506C3.32297 10.9775 0.50816 14.2122 0.0130841 18.1649L1.18807 18.3102C1.62451 14.8256 4.10797 11.9696 7.40605 10.9705L7.06072 9.84506ZM0.0130841 18.1649C-0.117765 19.2096 0.753247 20 1.71163 20V18.8235C1.36216 18.8235 1.1574 18.5552 1.18807 18.3102L0.0130841 18.1649ZM1.71163 20H18.2884V18.8235H1.71163V20ZM18.2884 20C19.2468 20 20.1178 19.2096 19.9869 18.1649L18.8119 18.3102C18.8425 18.5552 18.6378 18.8235 18.2884 18.8235V20ZM19.9869 18.1649C19.4919 14.2122 16.677 10.9775 12.9392 9.84506L12.5939 10.9705C15.892 11.9696 18.3754 14.8256 18.8119 18.3102L19.9869 18.1649Z" fill="black" />
									</svg>
								</span>
							</div>
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
					<NavLink to='/catalog/sneakers'onClick={() => toggleMenu(false)} className="navlinks-link">
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
				</nav>
			</div>
		</header>
	)
}

export interface Props {
	isAdmin: boolean
}

export default Header