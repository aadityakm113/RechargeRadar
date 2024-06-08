import "./navbar.css"

const Navbar = () => {
  return (
    <div className='navbar_container'>
        <div className='title'>
            <p>Recharge</p>
            <p>Radar</p>
        </div>
        <div className='nav_links'>
            <a href='/dash'>Find a Charger</a>
            <a href='/admin'>For Business</a>
            <a href='#contact-us'>Contact Us</a>
            <a href='/book'>Book</a>
        </div>
    </div>
  )
}

export default Navbar