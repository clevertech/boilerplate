import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ConfigureTwoFactor } from './ConfigureTwoFactor';
Enzyme.configure({ adapter: new Adapter() });

const noop = () => {};

describe('<ConfigureTwoFactor />', () => {
  test('should render <ConfigureTwoFactor /> without errors', () => {
    const wrapper = Enzyme.shallow(
      <ConfigureTwoFactor
        location={{ search: '' }}
        getTwoFactorStatus={noop}
        disableTwoFactor={noop}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the disabled message', () => {
    const wrapper = Enzyme.shallow(
      <ConfigureTwoFactor
        location={{ search: '?disabled' }}
        getTwoFactorStatus={noop}
        disableTwoFactor={noop}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render after loading the twoFactorStatus and it is enabled', () => {
    const wrapper = Enzyme.shallow(
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
    const wrapper = Enzyme.shallow(
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
