import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";


const checkAvailableRoom = async (startDate, endDate) => {
    const reservationRef = collection(db, "reservations");
    const querySnapshot = await getDocs(reservationRef);
    
    const reservedRooms = querySnapshot.docs
        .map(doc => doc.data())
        .filter(reservation => {
            const checkIn = reservation.checkIn.toDate();
            const checkOut = reservation.checkOut.toDate();

            return !(checkIn > endDate || checkOut < startDate);
        })
        .map(reservation => reservation.roomId);

    console.log("Camere rezervate în intervalul ales:", reservedRooms);
    return reservedRooms;
};

export default checkAvailableRoom;