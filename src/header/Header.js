import './Header.css'

function Header(props) {
  const { headerOptions } = props
  return (
    <header>
      <nav>
        <ul className="header__rates">
          {Object.keys(headerOptions).map((name, index) => {
            return (
              <li key={index}>
                {name} - {headerOptions[name]}
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

export default Header
