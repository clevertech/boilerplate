import ForgotPasswordLink from '../../atoms/ForgotPasswordLink'
import HaveAccountLink from '../../atoms/HaveAccountLink'

const SignupLinks = () => {
  return <div className="signup-links">
    <div className="level">
      <div className="level-item has-text-centered">
        <ForgotPasswordLink/>
      </div>
      <div className="level-item has-text-centered">
        <HaveAccountLink/>
      </div>
    </div>
  </div>
}

export default SignupLinks