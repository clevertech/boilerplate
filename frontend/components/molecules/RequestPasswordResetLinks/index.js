import NeedAccountLink from '../../atoms/NeedAccountLink'
import HaveAccountLink from '../../atoms/HaveAccountLink'

const RequestPasswordResetLinks = () => {
  return <div className="forgot-password-links">
    <div className="level">
      <div className="level-item has-text-centered">
        <NeedAccountLink/>
      </div>
      <div className="level-item has-text-centered">
        <HaveAccountLink/>
      </div>
    </div>
  </div>
}

export default RequestPasswordResetLinks