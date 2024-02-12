import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,

} from "react-native";

// to show messages on the screen
import { showMessage } from 'react-native-flash-message';

import { auth, signInWithEmailAndPassword } from "../firebase/config";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userReducer';
import { AppStyles } from "./AppStyles";
// Icons to hide and show password
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
// In addition to other imports:
import PropTypes from 'prop-types';
import { validatePassword } from "functions/auth/ValidatePasswordFunct";
import { validateEmail } from "functions/auth/ValidateEmailFunct";


LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  replace: PropTypes.object.isRequired,
};

function LoginScreen( props, ) {
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // local const to handle password validation
  const [PasswordError, setPasswordError] = useState("")
  const [result, setResult] = useState("");
  const dispatch = useDispatch();
  // State variable to track password visibility 
  const [showPassword, setShowPassword] = useState(false); 
  
   // Function to toggle the password visibility state 
   const toggleShowPassword = () => { 
    setShowPassword(!showPassword); 
}; 


  const handleSubmit = () => {

    
    
  //IF DATA IS OK(VALIDATED) ENTER TO FIREBASE AND VALIDATE INPUT DATA    
   if (validateEmail(email) && validatePassword(password)) {

    setResult(email);
    // GO INSIDE FIREBASE WITH signInWithEmailAndPassword FUNCTION
    signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      /***SHOW A SUCCESS MESSAGE IF ALL IS OK */
      showMessage({
        type: 'success',
        icon: 'success',
        message: 'Login sucessfully'})
      /** SAVE NEW STATE IN STORE */
      dispatch(setUser(result))
      // GO HOME PAGE
      props.navigation.replace("Home");
    })

    .catch((err) => {
      
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Incorrect Password/Emailerror: '+err
    })
     
    })
  ;}}

  const handlePushRegister=()=>{
    props.navigation.replace("Register");
  }
  
  return (
    
    <View style={styles.container}> {/* page container*/}

<Text style={styles.loginText}>SIGN IN FORM </Text>

    {/*** email block begining */}
    <View style={styles.InputContainer}>
      
      <TextInput
        onChangeText=
        {(email) => {
          setEmail(email)
          validateEmail(email)
      }}
        value={email}
        style={styles.body}
        placeholder="Email"
      />
      </View> 
      {/*** email block End */}

      {/*** Password block begining */}
      <View style={styles.InputEyeContainer}>
    
      <TextInput
      // Set secureTextEntry prop to hide  
      //password when showPassword is false 
      secureTextEntry={!showPassword} 
        onChangeText={(password) => {
          setPassword(password)
          validatePassword(password)
      }}
        value={password}
        style={{outline:'none', height:40}}
        placeholder="Password"
        
      />
    
    
      <MaterialCommunityIcons 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={24} 
                    color="#aaa"
                    style={styles.icon} 
                    onPress={toggleShowPassword} 
                /> 
     
      </View>
      {/*** Password block End */}
     {/*** button login block begining */}
      <TouchableOpacity onPress={handleSubmit} style={styles.pushSignUpText}>
      <button style={styles.signUpButton}>
        <Text style={styles.signUpText}>LOGIN</Text>
        </button>
      
      </TouchableOpacity>
     {/*** button login block End */}
       
      <View>
      <Text style={{marginTop:20, marginBottom: 0, fontSize: 15, fontWeight:'bold', color:'white'}} >Don't you have an acount ? click for:</Text>
      </View>
      

      <TouchableOpacity onPress={handlePushRegister} >
      <button style={styles.signUpButton}>
        <Text style={styles.signUpText}>REGISTER</Text>
        </button>
      </TouchableOpacity>

      
    </View>

    
  );
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(111, 174, 175)',
    borderWidth:20,
    borderColor:'lightblue'
    
  },
  signUpButton: {
    width: AppStyles.buttonWidth / 2,
    height: AppStyles.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.secondaryColor,
    borderRadius: AppStyles.borderRadiusMain,
    padding: 10,
    marginTop: 30,
  },
  signUpText: {
    color: AppStyles.textColor,
  },
  title: {
    fontSize: AppStyles.titleFontSize,
    fontWeight: 'bold',
    color: AppStyles.titleColor,
    marginTop: 20,
    marginBottom: 20,
  },
  loginContainer: {
    width: AppStyles.buttonWidth,
    height: AppStyles.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.secondaryColor,
    borderRadius: AppStyles.borderRadiusMain,
    marginTop: 30,
  },
  loginText: {
    color: AppStyles.textColor,
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: -10,
    marginBottom: 30,
  },
  InputContainer: {
    width: AppStyles.textInputWidth,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.solidColor,
    borderRadius: AppStyles.borderRadiusMain,
    backgroundColor: AppStyles.textInputBackgroundColor,   
  },
  InputEyeContainer:
  { 
   // width: 1015,
    width: 970,
    marginTop: 30,
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 14, 
    justifyContent:'space-between',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.solidColor,
    borderRadius: AppStyles.borderRadiusMain,
    backgroundColor: AppStyles.textInputBackgroundColor,
}, 


  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.inputTextColor,
  },
  bodyWithIcon: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.inputTextColor,
    width: 800,
  },


  icon: { 
    position:'relative',
    left:-10
}, 

  
});


