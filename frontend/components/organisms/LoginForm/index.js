import LabeledInput from '../../atoms/LabeledInput'
import SubmitButton from '../../atoms/SubmitButton'

const LoginForm = () => {
  return <div className="login-form container">
    <LabeledInput type="text" id="username" label="Username" required="true" />
    <LabeledInput type="password" id="password" label="Password" required="true" />
    <SubmitButton />
  </div>
}

export default LoginForm