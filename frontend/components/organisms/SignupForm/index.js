import LabeledInput from '../../atoms/LabeledInput'
import SubmitButton from '../../atoms/SubmitButton'
import SignupLinks from '../../molecules/SignupLinks'

const SignupForm = () => {
  return <div className="signup-form">
    <LabeledInput type="text" id="username" label="Username" required="true" />
    <LabeledInput type="password" id="password" label="Password" required="true" />
    <LabeledInput type="password" id="password-confirm" label="Confirm Password" required="true" />
    <SubmitButton />
    <SignupLinks/>
  </div>
}

export default SignupForm