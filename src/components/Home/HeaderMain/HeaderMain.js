import React from 'react';
import { useHistory } from 'react-router-dom';
import chair from '../../../images/chair.png'
import './HeaderMain.css'

const HeaderMain = () => {
    const history = useHistory();
    const loginPageNavigation =() => {
        history.push('/login');
    }
    return (
        <main style ={{height: '600px'}} className="row d-flex align-items-center header">
            <div className="col-md-4 offset-md-1">
                <h1 style={{color:'#3A4256'}}>Your New Smile <br/>Starts Here</h1>
                <p className="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius atque, deleniti laborum cum doloremque nobis!</p>
                <button onClick={loginPageNavigation} className="btn btn-primary">Get Appointment</button>

            </div>
            <div className="col-md-6">
                <img src={chair} alt="" className="img-fluid"/>
            </div>
            
        </main>
    );
};

export default HeaderMain;