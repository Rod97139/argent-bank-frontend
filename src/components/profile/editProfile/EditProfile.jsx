import { useState } from "react"
import { userUpdate } from "../../../actions/authActions"
import { useDispatch } from "react-redux"

const EditProfile = ({setIsEditing}) => {
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
    <div>
        <form onSubmit={(e) => handleSubmit(e)} >
            <input type="text" id="firstName" name="firstName" value={firstName} required
            onChange={(e) => setFirstName(e.target.value)}
            />
            <input type="text" id="lastName" name="lastName" value={lastName} required
            onChange={(e) => setLastName(e.target.value)}
            />

            
            <button type="button" onClick={() => setIsEditing(false)}>cancel</button>

            <button type="submit" 
            >edit profile</button>
        </form>
      
    </div>
  )
}

export default EditProfile
