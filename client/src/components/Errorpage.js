import React from 'react';
import Navbar from '../components/navbar';
import {NavLink } from 'react-router-dom';

const Errorpage = () => {
    return (
        <>
        <Navbar />
        <div id='notfound'>
            <div className='notfound'> 
                <div className='notfound-404'> 
                  <h1> 404 </h1>
                </div>
                <h2> Page Not found! </h2>
                <p  className='mb-5'>
                    The Page you are looking for might have been removed or is temporarily unavailable..
                </p>
                {/* <NavLink to='/'> Back to Home page </NavLink> */}
            </div>

        </div>

        </>
    ) ;
}

export default Errorpage;