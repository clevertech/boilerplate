import MainTemplate from '../templates/MainTemplate'
import PasswordResetForm from '../components/organisms/PasswordResetForm'
import NarrowContainer from '../components/molecules/NarrowContainer'

const PasswordReset = () => {
  // todo: retrieve from url params and verify password reset token
  // todo: shows password reset form only if password reset token is valid
  // todo: supplies password reset token to password reset form for submission
  return <MainTemplate appBar="false">
    <NarrowContainer>
      <PasswordResetForm/>
    </NarrowContainer>
  </MainTemplate>
}

export default PasswordReset

