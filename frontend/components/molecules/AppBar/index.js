import Link from 'next/link'

const PrimaryNav = () => (
  <div class="primary-nav">
    <div class="level">
      <div class="level-left">
        <Logo />
      </div>
      <div class="level-item has-text-centered">
        <Link href="/login"><a>Login</a></Link>
      </div>
      <div class="level-item has-text-centered">
        <Link href="/login"><a>Signup</a></Link>
      </div>
      <div class="level-item has-text-centered">
        <Link href="/login"><a>Reset Password</a></Link>
      </div>
      <div class="level-item has-text-centered">
        <Link href="/login"><a>Homepage</a></Link>
      </div>
    </div>
  </div>
)
