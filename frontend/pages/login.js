import MainTemplate from '../templates/MainTemplate'
import LoginForm from '../components/organisms/LoginForm'
import LoginLinks from '../components/molecules/LoginLinks'
import NarrowContainer from '../components/molecules/NarrowContainer'

function Login() {
  return <MainTemplate appBar="false">
    <NarrowContainer>
      <LoginForm />
      <LoginLinks />
    </NarrowContainer>
  </MainTemplate>
}

export default Login
