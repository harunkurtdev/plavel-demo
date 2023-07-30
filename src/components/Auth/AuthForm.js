import { useState } from 'react';
import { StyleSheet, View, Text, TextStyle } from 'react-native';

import Button from '../ui/Button';
import Input from './Input';

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredNamesEmail, setEnteredNamesEmail] = useState('');
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const {
    email: emailIsInvalid,
    // confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    // phonesDontMatch: phoneIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'confirmEmail':
        setEnteredNamesEmail(enteredValue);
        break;
      case 'phoneNumber':
        setEnteredPhoneNumber(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      names: enteredNamesEmail,
      phoneNumber: enteredPhoneNumber,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.form} >
      {isLogin ? (<Text style={styles.textStyle}>
        Login
      </Text>) : (<Text style={styles.textStyle}>
        Register
      </Text>)}
      <View>
        <Input
          label="Enter your Email"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
        // isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Enter your name&surname"
            onUpdateValue={updateInputValueHandler.bind(this, 'confirmEmail')}
          value={enteredNamesEmail}
          // keyboardType="email-address"
          // isInvalid={emailsDontMatch}
          />
        )}
        {!isLogin && (
          <Input
            label="Enter your mobile number"
            onUpdateValue={updateInputValueHandler.bind(this, 'phoneNumber')}
            value={enteredPhoneNumber}
            keyboardType="phone-pad"
          // isInvalid={phonesDontMatch} 
          />
        )}
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              'confirmPassword'
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>

          <Button onPress={submitHandler}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </View>
      </View>
    </View >
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 25,
    color: 'black',
  },
});
