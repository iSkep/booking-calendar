import React, { useState, useEffect } from 'react';
import { uk } from 'date-fns/locale';
import { setDefaultOptions } from 'date-fns';

import { DayPicker } from 'react-day-picker';
import useBookingService from '../../services/BookingService';
import Form from '../form/Form';
import CustomCaption from '../customCaption/CustomCaption';

import './calendar.css';

export default function Calendar() {
    const [selectedDay, setSelectedDay] = useState();
    const [bookedDays, setBookedDays] = useState([]);
    const { getAllBookedDays } = useBookingService();
    const bookedStyle = { backgroundColor: '#70c05b' };

    useEffect(() => {
        getAllBookedDays().then((data) => setBookedDays(data));
        // eslint-disable-next-line
    }, []);

    setDefaultOptions({ locale: uk });

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    const footer = selectedDay ? (
        <Form selectedDay={selectedDay} bookedDays={bookedDays} setBookedDays={setBookedDays} />
    ) : (
        <p className='footer__text'>Виберіть день.</p>
    );

    return (
        <DayPicker
            mode="single"
            onDayClick={handleDayClick}
            selected={selectedDay}
            modifiers={{ booked: bookedDays.map((data) => new Date(data.day)) }}
            modifiersStyles={{ booked: bookedStyle }}
            showOutsideDays
            locale={uk}
            footer={footer}
            components={{ Caption: CustomCaption }}
        />
    );
}
