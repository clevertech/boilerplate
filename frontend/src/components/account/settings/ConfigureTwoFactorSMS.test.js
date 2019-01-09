import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ConfigureTwoFactorSMS } from './ConfigureTwoFactorSMS';
Enzyme.configure({ adapter: new Adapter() });
const noop = () => {};

describe('<ConfigureTwoFactorSMS />', () => {
  test('should render <ConfigureTwoFactorSMS /> without errors', () => {
    const wrapper = Enzyme.shallow(
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
    const wrapper = Enzyme.shallow(
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
    const wrapper = Enzyme.shallow(
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
