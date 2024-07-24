import "./SignIn.scss";
import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react'
import { userLogin } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
// import { authService } from "../../services/authServices";

const SignIn = () => {

    const { loading, userInfo, error, success } = useSelector(
        (state) => state.auth
      );

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (success) {
          navigate('/profile')
        }
      }, [navigate, success])

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            let loginData = {
                email,
                password
            }
            dispatch(userLogin(loginData))

        } catch (error) {
        }
    };

    


    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form>
                    <div className="input-wrapper">
                        <label htmlFor="email">Username</label
                        ><input id="email" placeholder="email"
                         value={email} onChange={(e)=>setEmail(e.target.value)} 
                         />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label
                        ><input id="password" type='password' placeholder="Password" 
                        value={password} onChange={(e)=>setPassword(e.target.value)} 
                        />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" /><label htmlFor="remember-me"
                        >Remember me</label
                        >
                    </div>
                    <button className="sign-in-button" 
                    onClick={handleLogin}
                    >Sign In</button>
                    {/* <!-- PLACEHOLDER DUE TO STATIC SITE -->
                    <a href="./user.html" className="sign-in-button">Sign In</a>
                    <!-- SHOULD BE THE BUTTON BELOW -->
                    <!-- <button className="sign-in-button">Sign In</button> -->
                    <!--  --> */}
                </form>
            </section>
        </main>
    )
}

export default SignIn
