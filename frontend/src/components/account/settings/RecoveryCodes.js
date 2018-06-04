import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const textToCopy = (codes, email, url) => {
  return ['Boilerplate', 'Two-Factor Authentication Backup Codes', 'Email: ' + email, '']
    .concat(codes)
    .join('\n');
};

const RecoveryCodes = ({ codes, email }) => {
  return (
    <Fragment>
      <div className="alert alert-primary text-left" role="alert">
        If you lose access to your authentication device, you can use one of these backup codes to
        login to your account. Each code may be used only once. Make a copy of these codes, and
        store it somewhere safe.
      </div>
      <p className="card-text text-center">
        {codes.map(code => (
          <code key={code}>
            {code}
            <br />
          </code>
        ))}
      </p>
      <p className="card-text text-right">
        <button className="btn btn-primary" onClick={() => window.print()}>
          Print codes
        </button>{' '}
        <CopyToClipboard text={textToCopy(codes, email)}>
          <button className="btn btn-primary">Copy codes</button>
        </CopyToClipboard>
      </p>
    </Fragment>
  );
};

RecoveryCodes.propTypes = {
  email: PropTypes.string.isRequired,
  codes: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default RecoveryCodes;
