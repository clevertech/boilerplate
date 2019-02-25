import React from 'react';
import { ConfigureTwoFactorSMS } from './ConfigureTwoFactorSMS';

const noop = () => {};

describe('<ConfigureTwoFactorSMS />', () => {
  test('should render <ConfigureTwoFactorSMS /> without errors', () => {
    const wrapper = shallow(
      <ConfigureTwoFactorSMS
        location={{ search: '' }}
        generateTwoFactorSMS={noop}
        configureTwoFactorSMS={noop}
        user={{}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the confirm message', () => {
    const wrapper = shallow(
      <ConfigureTwoFactorSMS
        location={{ search: '?confirm' }}
        generateTwoFactorSMS={noop}
        configureTwoFactorSMS={noop}
        user={{}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the ok message', () => {
    const wrapper = shallow(
      <ConfigureTwoFactorSMS
        location={{ search: '?sent' }}
        generateTwoFactorSMS={noop}
        configureTwoFactorSMS={noop}
        user={{}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
