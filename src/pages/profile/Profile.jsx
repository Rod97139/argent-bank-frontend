import { useSelector } from "react-redux";
import "./Profile.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EditProfile from "../../components/profile/editProfile/EditProfile";

const Profile = () => {
    const { userInfo, userToken } = useSelector((state) => state.auth)
    const [isEditing, setIsEditing] = useState(false)
    const navigate = useNavigate()
    // useEffect(() => {
    //     if (!userToken) {
    //         navigate('/sign-in')
    //     }
    // }, [userToken, navigate])

    const handleEdit = () => {
        setIsEditing(true)
    }


    return (
        <main className="main bg-dark">
            <div className="header-profile">
                {userInfo ? <h1>Welcome back<br />{!isEditing && `${userInfo?.firstName} ${userInfo?.lastName} !`}</h1> : <div className="loader"></div>}

                
                
                {!isEditing ? (
                    <button className="edit-button" onClick={handleEdit}
                >Edit Name</button> ) : (
                <EditProfile isEditing={isEditing} setIsEditing={setIsEditing} />
                )}
                
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </main>
    )
}

export default Profile
