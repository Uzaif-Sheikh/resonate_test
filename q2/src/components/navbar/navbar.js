import { AppBar, Button } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css"


const NavBar = () => {
    
    return (
        <AppBar sx={{ background: 'white' }} className="app-bar">
			<div className="header-container">
				<div className="header-contains" onClick={() => console.log()}>
                    Resonate Test
				</div>
				<div className="header-contains-2">
					{/* <Link className="links-btn" to={"/budget"}>budgetPage</Link>
					<Link className="links-btn" to={"/goal-settings"}>Goals Settings</Link> */}
				</div>
			</div>
		</AppBar>
    );

}

export default NavBar;
