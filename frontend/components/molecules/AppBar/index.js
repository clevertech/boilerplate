import Logo from '../../atoms/Logo'
import Link from 'next/link'

const AppBar = () => (
  <div className="primary-nav">
    <div className="level">
      <div className="level-left">
        <Link href="/"><a><Logo /></a></Link>
      </div>
      <div className="level-item has-text-centered">
        <Link href="/dashboard"><a>Dashboard</a></Link>
      </div>
      <div className="level-item has-text-centered">
        <Link href="/posts"><a>Posts</a></Link>
      </div>
      <div className="level-item has-text-centered">
        <Link href="/logout"><a>Logout</a></Link>
      </div>
    </div>
  </div>
)

export default AppBar
