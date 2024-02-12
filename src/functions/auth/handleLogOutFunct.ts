import { useState } from 'react';
import { auth, signOut } from "../../firebase/config";
// To show messages on screen
import { showMessage } from "react-native-flash-message";
import { useDispatch } from 'react-redux';
// redux-store
import { setUser } from "../../redux/userReducer";



export const handleLogOut = (dispatch:any) => {
    
    //const [result, setResult] = useState("");
    //const dispatch = useDispatch(); 
  
    auth.signOut()
       .then((result) => {
         /***SHOW A SUCCESS MESSAGE IF ALL IS OK */
       showMessage({
         type: 'success',
         icon: 'success',
         message: 'LogOut sucessfully',
     })
     /** SAVE NEW STATE IN STORE */
     dispatch(setUser(result))
   
   }).catch((err) => showMessage({
     type: 'warning',
     icon: 'warning',
     message: 'There is an Error: '+err
 })
 
 );
       
   };