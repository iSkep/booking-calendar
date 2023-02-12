import { useEffect } from 'react';
import useBookingService from '../../services/BookingService';

import './button.css';

const Button = ({
    booked,
    selectedDay,
    time,
    timeId,
    activeDayId,
    bookedTimeSlots,
    setBookedTimeSlots,
    setBookedDays,
    btnIndex,
    onChange,
    activeBtn,
}) => {
    const { deleteBookedTime, deleteBookedDay, getAllBookedDays } = useBookingService();

    useEffect(() => {
        onChange(-1, '');
        // eslint-disable-next-line
    }, [selectedDay]);

    const handleBtnClick = (index) => (e) => {
        e.preventDefault();
        if (booked) {
            if (window.confirm('Удалить запись?')) {
                const updatedSlots = bookedTimeSlots.filter((slot) => slot.time !== time);

                deleteBookedTime(timeId)
                    .then(() => setBookedTimeSlots(updatedSlots))
                    .then(() => onChange(-1, ''));

                if (!updatedSlots.length) {
                    deleteBookedDay(activeDayId).then(() => getAllBookedDays().then((data) => setBookedDays(data)));
                }
            }
        } else {
            onChange(index, time);
        }
    };

    const bookedBtnClass = booked ? ' booked' : '';
    const activeBtnClass = activeBtn === btnIndex ? ' active' : '';

    return (
        <button className={`time-pick${bookedBtnClass + activeBtnClass}`} onClick={handleBtnClick(btnIndex)}>
            {time}
        </button>
    );
};

export default Button;
