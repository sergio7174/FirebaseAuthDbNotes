/*** funtion to validate password input *************/
// to show messages on the screen
import { showMessage } from 'react-native-flash-message';

export const validatePassword = (password:string) => { 

    const passReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,16}$/;

    if (password == "" || password == undefined || password == null) {
      
        showMessage({type: "warning", message: "Enter your password!"}) 
      
        return false;
    }
   
     else if (password.length<6 ){
      showMessage({type: "warning", message: "Password must be at least 6 characters long"}) 
       
        return false;
    } else if (password != "" || password != undefined || password != null || passReg.test(password) || password.length<6 ){
      return true;
    }
}
   /*** End funtion Block  to validate password input */