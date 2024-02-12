/*** function to validate email input *************/

// to show messages on the screen
import { showMessage } from 'react-native-flash-message';

export const validateEmail = (email:string) => {
    const EmailExpReg =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
   
     if (email == "" || email == undefined || email == null) {
       
       showMessage({type: "warning", message: "Please, Enter Email"}) 
        return false;}
        
        else if (!EmailExpReg.test(email)){
  
            showMessage({type: "warning", message: "Please, Enter a Valid Email"}) 
             return false;} else 
        if(EmailExpReg.test(email)){
         
          return true;
  
             }}
             
     /*** End funtion Block  to validate password input */