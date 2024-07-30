import "./Header.scss"

import {Link, useNavigate} from "react-router-dom";
import argentBankLogo from "../../../assets/icons/argentBankLogo.png";
import '@fortawesome/fontawesome-free/css/all.css'
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../../../service/authService";
import { useEffect } from "react";
import { logout, setCredentials, setIsSearchingUser, setLoading } from "../../../slices/authSlice";

const Header = () => {

    const { userInfo, userToken } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // automatically authenticate user if token is found
    const { refetch } = useGetUserDetailsQuery('userDetails', { 
        skip: !userToken
    })

    useEffect(() => {
        dispatch(setIsSearchingUser(true))
        dispatch(setLoading(true))
        if (userToken) {
          refetch().then(({ data }) => {
            dispatch(setCredentials(data))
          }).then(() => {
            dispatch(setIsSearchingUser(false))
          })
        } else {
          dispatch(setIsSearchingUser(false))
          dispatch(setLoading(false))
        }
      }, [userToken, refetch]);


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