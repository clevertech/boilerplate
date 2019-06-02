import MainTemplate from '../templates/MainTemplate'
import SignupForm from '../components/organisms/SignupForm'
import NarrowContainer from '../components/molecules/NarrowContainer'

const Signup = () => {
  return <MainTemplate>
    <NarrowContainer>
      <SignupForm />
    </NarrowContainer>
  </MainTemplate>
}

export default Signup

