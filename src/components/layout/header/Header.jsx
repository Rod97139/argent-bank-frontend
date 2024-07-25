import "./Header.scss"

import {Link} from "react-router-dom";
import argentBankLogo from "../../../assets/icons/argentBankLogo.png";
import '@fortawesome/fontawesome-free/css/all.css'
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../../../service/authService";
import { useEffect, useState } from "react";

const Header = () => {

    const { userInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')

    // automatically authenticate user if token is found
    const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    // perform a refetch every 15mins
        pollingInterval: 900000,
    })



    data && console.log(data.body.firstName) // user object

    // useEffect(() => {
    //         if (data.body.firstName) {
    //             const { firstName } = data.body
    //             setUserName(firstName)
    //         }
    //     }, []
    // )


    return (

        <header className="header">
           <nav className="main-nav">
            <Link className="main-nav-logo" to={"/"}>
                <img
                className="main-nav-logo-image"
                src={argentBankLogo}
                alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            {
                data  ? (
                    <div>
                        <Link className="main-nav-item" to={"/profile"}>
                        <i className="fa fa-user-circle"></i>
                        Tony
                        </Link>
                        <Link className="main-nav-item" to={"/"}>
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                        </Link>
                </div>
                    )
                        : (
                <div>
                    <Link className="main-nav-item" to={"/sign-in"}>
                    <i className="fa fa-user-circle"></i>
                    Sign In
                    </Link>
                </div>
                )
            }
        </nav>
        </header>
    );

}

export default Header;