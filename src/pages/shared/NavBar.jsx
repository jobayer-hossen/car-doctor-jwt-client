import React, { useContext } from 'react';
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const NavBar = () => {
    const {logOut ,user} = useContext(AuthContext);
    const handleLogOut =()=>{
        logOut()
        .then(()=>{
            localStorage.removeItem('car-token');
        })
        .catch(error=>{console.error(error)})
    }
    return (
        <div className="navbar bg-base-100 h-28 mb-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link to='/' >Home</Link></li>
                        <li tabIndex={0}>
                            
                            <ul className="p-2">
                            <li><Link to='/' >Home</Link></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><Link to='/about' >About</Link></li>
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                <li><Link to='/' >Home</Link></li>
                    <li tabIndex={0}>
                     
                        <ul className="p-2">
                            <li><Link to='/' >Home</Link></li>
                            <li><Link to='/about' >About</Link></li>
                           {user?.email ? <li><button>LogOut</button></li>
                            : <li><Link to='/login' >Login</Link></li>}
                        </ul>
                    </li>
                    <li><Link to='/about' >About</Link></li>
                    {user?.email ? <>
                        <li><Link to='/bookings' >My Booking</Link></li>
                        <li><button onClick={handleLogOut}>LogOut</button></li>
                    </>
                            : <li><Link to='/login' >Login</Link></li>}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Get started</a>
            </div>
        </div>
    );
};

export default NavBar;