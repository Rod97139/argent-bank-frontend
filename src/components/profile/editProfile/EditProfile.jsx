import { useState } from "react"
import { userUpdate } from "../../../actions/authActions"
import { useDispatch, useSelector } from "react-redux"
import "./EditProfile.scss"

const EditProfile = ({setIsEditing}) => {
    const { userInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            let updateData = {
                firstName,
                lastName
            }
            dispatch(userUpdate(updateData))
            setIsEditing(false)

        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className="edit-container">
        <form className="edit-form" onSubmit={(e) => handleSubmit(e)} >
            <input placeholder={userInfo.firstName} type="text" id="firstName" name="firstName" value={firstName} required
            onChange={(e) => setFirstName(e.target.value)}
            />
            <input placeholder={userInfo.lastName} type="text" id="lastName" name="lastName" value={lastName} required
            onChange={(e) => setLastName(e.target.value)}
            />
            <button className="edit-button btn-save" type="submit" 
            >Save</button>
            <button className="edit-button btn-cancel" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      
    </div>
  )
}

export default EditProfile
