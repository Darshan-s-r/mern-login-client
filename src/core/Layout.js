import React, {Fragment} from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import { isAuth, signOut } from '../auth/helpers'

function Layout (props){
    const location = useLocation(); 
    const navigate = useNavigate();
    const isActive = path =>{
        return location.pathname === path ? { color: '#000' } : { color: '#fff' };
     }

    function nav(){
       return (<ul className="nav nav-tabs bg-primary">
        {isAuth() && (
             <li className="nav-item">
             <Link to='/' className=" nav-link" style={isActive('/')}>
                 Home
             </Link>
         </li>
        )}
           
           {!isAuth() && (
            <Fragment>
            <li>
                <Link to='/signin' className=" nav-link" style={isActive('/signin')}>
                    signIn
                </Link>
            </li>
            <li>
                <Link to='/signup' className=" nav-link" style={isActive('/signup')}>
                    signUp
                </Link>
            </li>
            </Fragment>
           )}


        {isAuth() && (
            <li className="nav-item">
                <span className="nav-link" style={{cursor: 'pointer', color: 'white'}} onClick={()=>{
                    signOut(()=>{
                        navigate('/signin');
                    });
                }}>signOut</span>
            </li>
           )}

{isAuth() && (
            <li className="nav-item" style={{marginLeft: 'auto'}}>
                <span className="nav-link" style={{cursor: 'pointer', color: 'white'}}>{isAuth().name}</span>
            </li>
           )}
            
        </ul>
       )
    }; 

    return (
        <Fragment>
            {nav()}
            <div className="container">
                {props.children}
            </div>
        </Fragment>
    )
}

export default Layout;