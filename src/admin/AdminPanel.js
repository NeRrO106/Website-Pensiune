import React, {useState} from 'react';
import RoomsManager from './RoomManager';
import ReservationsList from './ReservationList';
import './admin.scss';

const AdminPanel = () =>{
    const [activeTab, setActiveTab] = useState('rooms');

    return(
        <div className = "admin-panel">
            <h2>Panou administrator</h2>
            <div className='tabs'>
                <button
                    className={activeTab==='rooms' ? 'active' : ''}
                    onClick={()=>setActiveTab('rooms')}
                >
                    Camere
                </button>
                <button
                    className={activeTab==='reservations' ? 'active' : ''}
                    onClick={()=>setActiveTab('reservations')}
                >
                    Rezervari
                </button>
            </div>
            <div className="tab-content">
                {activeTab === 'rooms' && <RoomsManager />}
                {activeTab === 'reservations' && <ReservationsList />}
            </div>
        </div>
    );
}
export default AdminPanel;