import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { createUserWithEmailAndPassword ,auth } from "../firebase/config";
import { AppStyles } from "./AppStyles";
// Icons to hide and show password
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
// In addition to other imports:
import PropTypes from 'prop-types';
// functions to validate password and Email
import { validatePassword } from "functions/auth/ValidatePasswordFunct";
import { validateEmail } from "functions/auth/ValidateEmailFunct";

RegisterScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  replace: PropTypes.object.isRequired,
};
 
function RegisterScreen(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  // State variable to track password visibility 
  const [showPassword, setShowPassword] = useState(false); 

// Function to toggle the password visibility state 
const toggleShowPassword = () => { 
  setShowPassword(!showPassword); 
}; 

  const handleSubmit = () => {
    //IF DATA IS OK(VALIDATED) ENTER TO FIREBASE AND SAVE USER INPUT DATA    
   if (validateEmail(email) && validatePassword(password)) {
    setResult(email); 
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        props.navigation.replace("Login");
      })
      .catch((reult) => {
        showMessage({
          type: 'warning',
          icon: 'warning',
          message: 'There is an Error: '+err
      })
      })
  };}

  const handlePushLogin=()=>{
    props.navigation.replace("Login");
    }

  return (
<View style={styles.container}>
<Text style={styles.registerText}>SIGN UP FORM </Text>
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
      <TouchableOpacity onPress={handleSubmit}  style={styles.pushSignUpText}>
        <button style={styles.signUpButton}>
        <Text style={styles.signUpText}>REGISTER</Text>
        </button>
      </TouchableOpacity>

      <View>
      <Text style={{marginTop:20, marginBottom: 0, fontSize: 15, fontWeight:'bold', color:'white'}} >Already have an acount ? click for:</Text>
      </View>

      <TouchableOpacity onPress={handlePushLogin} style={styles.pushSignUpText}>
      <button style={styles.signUpButton}>
        <Text style={styles.signUpText}>BACK LOGIN</Text>
        </button>
      </TouchableOpacity>

      <Text>{result}</Text>
    </View>
 
  );
}
export default RegisterScreen;

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
  registerText: {
    color: AppStyles.textColor,
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: -10,
    marginBottom: 30,
  },
  InputContainer: {
    width: '80%',
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.solidColor,
    borderRadius: AppStyles.borderRadiusMain,
    backgroundColor: AppStyles.textInputBackgroundColor,
  },
  InputEyeContainer:
  { 
    //width: 1015,
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
  
});



