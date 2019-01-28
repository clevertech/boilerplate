import React from 'react';
import { ConfigureTwoFactor } from './ConfigureTwoFactor';

const noop = () => {};

describe('<ConfigureTwoFactor />', () => {
  test('should render <ConfigureTwoFactor /> without errors', () => {
    const wrapper = shallow(
      <ConfigureTwoFactor
        location={{ search: '' }}
        getTwoFactorStatus={noop}
        disableTwoFactor={noop}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the disabled message', () => {
    const wrapper = shallow(
      <ConfigureTwoFactor
        location={{ search: '?disabled' }}
        getTwoFactorStatus={noop}
        disableTwoFactor={noop}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render after loading the twoFactorStatus and it is enabled', () => {
    const wrapper = shallow(
      <ConfigureTwoFactor
        location={{ search: '' }}
        getTwoFactorStatus={noop}
        disableTwoFactor={noop}
        twoFactorStatus={{ twofactor: 'qr' }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render after loading the twoFactorStatus and it is disabled', () => {
    const wrapper = shallow(
      <ConfigureTwoFactor
        location={{ search: '' }}
        getTwoFactorStatus={noop}
        disableTwoFactor={noop}
        twoFactorStatus={{ twofactor: null }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
