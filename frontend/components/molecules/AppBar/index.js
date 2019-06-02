import Logo from '../../atoms/Logo'
import Link from 'next/link'

const AppBar = () => (
  <div className="primary-nav">
    <div className="level">
      <div className="level-left">
        <Link href="/"><a><Logo /></a></Link>
      </div>
      <div className="level-item has-text-centered">
        <Link href="/login"><a>Login</a></Link>
      </div>
      <div className="level-item has-text-centered">
        <Link href="/signup"><a>Signup</a></Link>
      </div>
      <div className="level-item has-text-centered">
        <Link href="/password-reset"><a>Reset Password</a></Link>
      </div>
    </div>
  </div>
)

export default AppBar
