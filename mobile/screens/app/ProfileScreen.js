import React from 'react';
import { SafeAreaView, Text } from 'react-native';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    drawerLabel: 'Profile'
  };
  render() {
    console.log('props', this.props.navigation.state.params);
    return (
      <SafeAreaView>
        <Text>Profile</Text>
      </SafeAreaView>
    );
  }
}
