import { useState } from 'react'
import './Main.css'
import TextField from '@material-ui/core/TextField'
import DirectionsIcon from '@material-ui/icons/Directions'
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, MyReservations } from '../views/client'
import Checkout from '../views/client/reservation/Checkout'
import { Parking } from '../views/client/Parking'
import { UserLogin, UserRegistration, ResetPassword, EditUser } from '../views/auth'
import { NavBar } from '../components/Navbars'
import AdminLayout from "../layouts/Admin.js"



export const Mainsection = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Main} />
                {/* <Route path="/:temp" component={Temp} /> Component name */}
                <Route path="/api/:temp" component={Parking} />
                {/* <Route path="/Profile/:id" component /> */}
                <Route path="/login" component={UserLogin} />
                <Route path="/register" component={UserRegistration} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/ResetPassword" component={ResetPassword} />
                <Route path="/myreservations" component={MyReservations} />
                <Route path = "/EditUser" component= {(localStorage.getItem("token")) != null ? EditUser : UserLogin}/>                             
                <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
            </Switch>
            
        </Router >

    )
}

const STYLES = ['btn--primary', 'btn--outline', 'btn--test']

const SIZES = ['btn--medium', 'btn--large']

const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
    goTo
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0]

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return (
        <Link to={goTo} className='btn-mobile' >
            <button
                className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                onClick={onClick}
                type={type}
            >
                {children}
            </button>
        </Link>
    )
}

const Main = () => {
    const [query, setQuery] = useState('')

    return (
        <div>
            <NavBar />        
            <div className='hero-container'>
                <video className='hero-video' src='https://static.videezy.com/system/resources/previews/000/010/643/original/4K_UHD_Drone_Portland_Oregon_Zoo_Gods_Eye_View_Parking_Lot_Building_Fernando.mp4' autoPlay loop muted />
                <h1>Prishtina Parking</h1>
                <p>What do you do when your parking brake is frozen?</p>

                <div className='search-field'>
                    <TextField id="filled-basic" label="Filled" variant="filled" fullWidth={true} onChange={e => setQuery(e.target.value)} />

                    <Button
                        className='btns'
                        buttonStyle='btn--outline'
                        buttonSize='btn--large'
                        goTo={`/api/${query}`}
                    >
                        Search
                           <DirectionsIcon />
                    </Button>
                </div>
            </div >
            <Home />
        </div >
    )
}