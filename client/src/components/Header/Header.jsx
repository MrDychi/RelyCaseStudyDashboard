import relyLogo from '../../assets/rely.svg'
import './Header.css'

const Header = () => {
    return (
        <>
            <div className="header">
                <a className="logoLink" href="http://www.relyhealth.care" target="blank_">
                    <img className="logo" src={relyLogo} alt="logo"/>
                </a>
            </div>
        </>
    )
}

export default Header