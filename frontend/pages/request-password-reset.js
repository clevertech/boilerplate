import MainTemplate from '../templates/MainTemplate'
import RequestPasswordResetForm from '../components/organisms/RequestPasswordResetForm'
import NarrowContainer from '../components/molecules/NarrowContainer'

function RequestPasswordReset() {
  return <MainTemplate>
    <NarrowContainer>
      <RequestPasswordResetForm/>
    </NarrowContainer>
  </MainTemplate>
}

export default RequestPasswordReset

