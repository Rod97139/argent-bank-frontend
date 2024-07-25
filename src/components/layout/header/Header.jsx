import "./Header.scss"

import {Link, useNavigate} from "react-router-dom";
import argentBankLogo from "../../../assets/icons/argentBankLogo.png";
import '@fortawesome/fontawesome-free/css/all.css'
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../../../service/authService";
import { useEffect, useState } from "react";
import { logout, setCredentials } from "../../../slices/authSlice";

const Header = () => {

    const { userInfo, userToken } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // automatically authenticate user if token is found
    const { data, isFetching, refetch } = useGetUserDetailsQuery('userDetails', { skip: !userToken
    })

    useEffect(() => {
        if (userToken) {
          refetch().then(({ data }) => {
            dispatch(setCredentials(data))
          })
        }
      }, [userToken, refetch]);

    // useEffect(() => {
    //     if (data) dispatch(setCredentials(data))

    //   }, [data, dispatch])


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
                userInfo  ? (
                    <div>
                        <Link className="main-nav-item" to={"/profile"}>
                        <i className="fa fa-user-circle"></i>
                        { userInfo.firstName }
                        </Link>
                        <a className="main-nav-item" onClick={() => {
                            dispatch(logout())
                            navigate('/')
                            }}>
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                        </a>
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