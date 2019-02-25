import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const LayoutShell = (props) => (
  <div>
    <nav className="navbar is-transparent">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img
            src="/clevertech.svg"
            alt="Clevertech React Boilerplate"
            width="112"
            height="28"
          />
        </Link>
        <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div id="navbarExampleTransparentExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Home
          </Link>
          <NavLink className="navbar-item" to="/books">
            Books
          </NavLink>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              {props.user && (
                <p className="control">
                  <NavLink className="button is-light" to="/account/settings">
                    <span className="icon">
                      <i className="fas fa-cogs" />
                    </span>
                    <span>Settings</span>
                  </NavLink>
                </p>
              )}
              {!props.user && (
                <p className="control">
                  <NavLink className="button is-primary" to="/account/login">
                    <span className="icon">
                      <i className="fas fa-sign-in-alt" />
                    </span>
                    <span>Login</span>
                  </NavLink>
                </p>
              )}
              {props.user && (
                <p className="control">
                  <a href="#!" onClick={props.logout} className="navbar-item">
                    Log Out
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div className="content">{props.children}</div>
  </div>
)

export default LayoutShell
