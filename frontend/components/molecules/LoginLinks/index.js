const LoginLinks = () => {
  return <div className="login-links">
    <div className="level">
      <div className="level-item has-text-centered">
        <Link href="/request-password-reset"><a>Forgot password?</a></Link>
      </div>
      <div className="level-item has-text-centered">
        <Link href="/signup"><a>Need an account?</a></Link>
      </div>
    </div>
  </div>
}

export default LoginLinks