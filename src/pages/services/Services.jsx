import React, { useEffect, useState } from 'react';
import ServicesCard from './ServicesCard';

const Services = () => {

    const [services , setServices ] = useState([]);

    useEffect(()=>{
        fetch('https://car-doctor-server-nu-five.vercel.app/services')
        .then( res => res.json())
        .then(data => setServices(data))
    },[]);

   


    return (
        <div className="mt-4">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-orange-600">Our Services</h3>
                <h2 className="text-5xl">Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which do not look even slightly believable. </p>
            </div>

           <div className='grid md:grid-cols-3 sm: grid-cols-1 gap-6'>
           {
                services.map(service => <ServicesCard
                key={service._id}
                    service={service}
                ></ServicesCard>)
            }
           </div>
            
        </div>
    );
};

export default Services;