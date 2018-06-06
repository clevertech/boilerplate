import React from 'react';
import { Button, Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../styles/constants';
import forms from '../styles/forms';
import Header from './Header';

export default class SignupScreen extends React.Component {
  submit = () => {
    this.props.navigation.navigate('App');
  };
  login = () => {
    this.props.navigation.navigate('Login');
  };
  render() {
    return (
      <KeyboardAwareScrollView>
        <Header />
        <TextInput placeholder="Username" style={forms.input} onSubmitEditing={this.submit} />
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
        <TextInput
          placeholder="Confirm Password"
          style={forms.input}
          onSubmitEditing={this.submit}
          secureTextEntry
        />
        <Button onPress={this.submit} title="Create new account" color={colors.primary} />
        <Text style={{ textAlign: 'center' }}>or...</Text>
        <Button onPress={this.login} title="I already have an account" color={colors.secondary} />
      </KeyboardAwareScrollView>
    );
  }
}
