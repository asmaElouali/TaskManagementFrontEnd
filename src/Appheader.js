import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Appheader = () => {
    const [displayusername, displayusernameupdate] = useState('');
    const [showmenu, showmenuupdateupdate] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            showmenuupdateupdate(false);
        } else {
            showmenuupdateupdate(true);
            let username = sessionStorage.getItem('username');
            if (username === '' || username === null) {
                usenavigate('/login');
            } else {
                displayusernameupdate(username);
            }
        }

    }, [location])
    return (
        <div>
            {showmenu &&
                <div className="header" style={{backgroundColor: '#E8C178'}}>
                    <Link to={'/'} className="fw-bold" style={{color: '#311A18'}}>Home</Link>
                    <Link to={'/mynotes'}  className="fw-bold" style={{color: '#311A18', marginLeft: '50px'}}>View Notes</Link>
                    <span style={{ marginLeft: '70%' }}  className="fw-bold">Welcome <b>{displayusername}</b></span>
                    <Link style={{ float: 'right' }}  className="fw-bold" to={'/login'}>Logout</Link>
                </div>
            }
        </div>
    );
}

export default Appheader;