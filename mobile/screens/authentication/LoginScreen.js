import React from 'react';
import { Button, Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../styles/constants';
import forms from '../styles/forms';
import Header from './Header';

export default class LoginScreen extends React.Component {
  submit = () => {
    this.props.navigation.navigate('App');
  };
  signup = () => {
    this.props.navigation.navigate('Signup');
  };
  render() {
    return (
      <KeyboardAwareScrollView>
        <Header />
        <TextInput
          placeholder="Email"
          style={forms.input}
          keyboardType="email-address"
          onSubmitEditing={this.submit}
        />
        <TextInput
          placeholder="Password"
          style={forms.input}
          onSubmitEditing={this.submit}
          secureTextEntry
        />
        <Button onPress={this.submit} title="Log in" color={colors.primary} />
        <Text style={{ textAlign: 'center' }}>or...</Text>
        <Button onPress={this.signup} title="Create a new account" color={colors.secondary} />
      </KeyboardAwareScrollView>
    );
  }
}
