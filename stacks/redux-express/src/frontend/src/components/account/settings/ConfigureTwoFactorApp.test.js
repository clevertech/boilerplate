import { shallow } from 'enzyme';
import React from 'react';
import { ConfigureTwoFactorApp } from './ConfigureTwoFactorApp';

const noop = () => {};
const email = 'user@example.com';

describe('<ConfigureTwoFactorApp />', () => {
  test('should render <ConfigureTwoFactorApp /> without errors', () => {
    const wrapper = shallow(
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
    const wrapper = shallow(
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
