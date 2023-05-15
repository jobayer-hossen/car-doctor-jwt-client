import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import BookingRow from './BookingRow';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBooking] = useState([]);
    const navigate = useNavigate();
    const url = `https://car-doctor-server-nu-five.vercel.app/bookings?email=${user?.email}`
    useEffect(() => {
        fetch(url,{
            method:'GET',
            headers:{
                'authorization':`Bearer ${localStorage.getItem('car-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                
                if(!data.error){
                    setBooking(data)
                }else{
                    // navigate('/')
                }
            })
    }, [url])
    const handleDelete =(id)=>{
        const proceed = confirm('Are you sure delete it ?');
        if(proceed){
            fetch(`https://car-doctor-server-nu-five.vercel.app/bookings/${id}`,{
                method:'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.deletedCount > 0){
                    const remaining = bookings.filter(booking => booking._id !== id);
                    setBooking(remaining)
                }
            })
        }
        }
    const handleBookingConfirm =(id)=>{
        fetch(`https://car-doctor-server-nu-five.vercel.app/bookings/${id}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({status: 'confirm'})
        })
        .then(res=>res.json())
        .then(data =>{
            if(data.modifiedCount>0){
                const remaining = bookings.filter(booking => booking._id !== id);
                const update = bookings.find(booking => booking._id === id);
                update.status = 'confirm';
                const newBooking =[update , ...remaining];
                setBooking(newBooking);
            }
        })
    }
    return (
        <div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>{user.email}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                       {
                        bookings.map(booking => <BookingRow
                        key={booking._id}
                        booking={booking}
                        handleDelete={handleDelete}
                        handleBookingConfirm={handleBookingConfirm}
                        ></BookingRow>)
                       }
                        
                    </tbody>
                   

                </table>
            </div>
        </div>
    );
};

export default Booking;