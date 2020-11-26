import React from 'react';
import chair from '../../../images/chair.png'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';

const AppointmentHeader = ({handleDateChange}) => {

   
    return (
        <main style ={{height: '600px'}} className="row d-flex align-items-center header">
            <div className="col-md-4 offset-md-1">
                <h4 style={{color:'#3A4256', paddingLeft:'27px'}}>Select Appointment Date</h4>
                <Calendar
                    onChange={handleDateChange}
                    value={new Date()}
                />  
            </div>
            <div className="col-md-6">
                <Link to="/dashboard/appointment"><h4 style={{color:'#3A4256', paddingLeft:'250px'}}>Go back to Dashboard</h4></Link>
                <img src={chair} alt="" className="img-fluid"/>
            </div>
            
        </main>
    );
};

export default AppointmentHeader;