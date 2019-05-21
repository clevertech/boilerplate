import Logo from '../../atoms/Logo'
import Link from 'next/link'

const AppBar = () => (
  <div className="primary-nav">
    <div className="level">
      <div className="level-left">
        <Logo />
      </div>
      <div className="level-item has-text-centered">
        <Link href="/login"><a>Login</a></Link>
      </div>
      <div className="level-item has-text-centered">
        <Link href="/login"><a>Signup</a></Link>
      </div>
      <div className="level-item has-text-centered">
        <Link href="/login"><a>Reset Password</a></Link>
      </div>
      <div className="level-item has-text-centered">
        <Link href="/login"><a>Homepage</a></Link>
      </div>
    </div>
  </div>
)

export default AppBar
