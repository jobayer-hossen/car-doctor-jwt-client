import React, { useContext } from 'react';
import img from '../assets/images/login/login.svg'
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Login = () => {
    const {signIn} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate()
    const form = location.state?.from?.pathname || '/'
    const handleLogin =(event) =>{
        event.preventDefault();
        const from = event.target;
        const email = from.email.value;
        const password = from.password.value;
        signIn(email,password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser)
            
            // navigate(form, {replace:true} );
           
        })
        .catch(error=>{
            console.error(error)
        })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row ">
                <div className="text-center lg:text-left w-1/2">

                    <img src={img} alt="" />
                </div>

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-3xl text-center font-bold">Login now!</h1>
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="text" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name='password' type="text" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input  className="btn btn-primary" type="submit" value='Login' />
                            </div>
                        </form>
                        <h4>New to resister here <Link className='text-orange-600 font-bold' to='/signup'>Sign Up</Link> </h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;