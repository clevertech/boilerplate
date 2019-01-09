import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ConfigureTwoFactorApp } from './ConfigureTwoFactorApp';
Enzyme.configure({ adapter: new Adapter() });

const noop = () => {};
const email = 'user@example.com';

describe('<ConfigureTwoFactorApp />', () => {
  test('should render <ConfigureTwoFactorApp /> without errors', () => {
    const wrapper = Enzyme.shallow(
      <ConfigureTwoFactorApp
        location={{ search: '' }}
        generateTwoFactorQR={noop}
        configureTwoFactorQR={noop}
        user={{ email }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the success message', () => {
    const wrapper = Enzyme.shallow(
      <ConfigureTwoFactorApp
        location={{ search: '?ok' }}
        generateTwoFactorQR={noop}
        configureTwoFactorQR={noop}
        user={{ email }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
