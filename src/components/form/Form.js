import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import Button from '../button/Button';
import useBookingService from '../../services/BookingService';
import { useState, useEffect } from 'react';

import './form.css';

const Form = ({ selectedDay, bookedDays, setBookedDays }) => {
    const { getDayBookedTime, postNewTime, getAllBookedDays } = useBookingService();
    const [bookedTimeSlots, setBookedTimeSlots] = useState([]);
    const [activeBtn, setActiveBtn] = useState(-1);
    const [activeTime, setActiveTime] = useState();
    const timeSlots = ['10:00', '12:00', '16:00', '18:00'];
    let activeDayId = '';

    try {
        const searchTerm = format(selectedDay, 't');
        activeDayId = bookedDays.find((item) => format(new Date(item.day), 't') === searchTerm).id;
    } catch {}

    useEffect(() => {
        getDayBookedTime(activeDayId).then(onTimeLoaded);
        // eslint-disable-next-line
    }, [selectedDay, bookedDays]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newBookedTime = {
            dayExists: !!activeDayId,
            dayId: activeDayId || uuidv4(),
            timeId: uuidv4(),
            date: format(selectedDay, 'yyyy, MM, dd'),
            time: activeTime,
        };

        postNewTime(newBookedTime).then(() =>
            getAllBookedDays()
                .then((data) => setBookedDays(data))
                .then(() => setActiveBtn(-1))
        );
    };

    const onTimeLoaded = (bookedTimeSlots) => {
        setBookedTimeSlots(bookedTimeSlots);
    };

    const setActiveTimeSlot = (index, time) => {
        setActiveBtn(index);
        setActiveTime(time);
    };

    function renderBtns(arr) {
        const buttons = arr.map((item, i) => {
            const booked = bookedTimeSlots.find((elem) => elem.time === item) ? true : false;
            const timeId = booked ? bookedTimeSlots.find((elem) => elem.time === item).id : null;

            return (
                <Button
                    key={i}
                    time={item}
                    timeId={timeId}
                    activeDayId={activeDayId}
                    booked={booked}
                    selectedDay={selectedDay}
                    bookedDays={bookedDays}
                    setBookedDays={setBookedDays}
                    bookedTimeSlots={bookedTimeSlots}
                    setBookedTimeSlots={setBookedTimeSlots}
                    activeBtn={activeBtn}
                    btnIndex={i}
                    onChange={setActiveTimeSlot}
                />
            );
        });

        return buttons;
    }

    return (
        <form className="time-form" onSubmit={onSubmitHandler}>
            {renderBtns(timeSlots)}
            <p className="time-text">{format(selectedDay, 'd MMMM yyy') + ' ' + activeTime}</p>
            <button className="time-submit" type="submit" disabled={activeBtn === -1}>
                Підтвердити
            </button>
        </form>
    );
};

export default Form;
