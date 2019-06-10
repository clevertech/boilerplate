import SubmitButton from '../../atoms/SubmitButton'
import LabeledInput from '../../atoms/LabeledInput'
import RequestPasswordResetLinks from '../../molecules/RequestPasswordResetLinks'

const RequestPasswordResetForm = () => {
  return <div className="request-password-reset-form">
    <LabeledInput type="email" id="email" label="Enter email" required="true" />
    <SubmitButton />
    <RequestPasswordResetLinks />
  </div>
}

export default RequestPasswordResetForm