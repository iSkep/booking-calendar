import { useHttp } from '../hooks/http.hook';

const useBookingService = () => {
    const { request } = useHttp();

    const getAllBookedDays = async () => {
        const allDays = await request(`http://localhost:3001/days?_embed=times`);
        return allDays;
    };

    const getDayBookedTime = async (id) => {
        const dayTimes = await request(`http://localhost:3001/times?dayId=${id}`);
        return dayTimes.map(_transformTime);
    };

    const _transformTime = (time) => {
        return {
            id: time.id,
            time: time.time,
        };
    };

    const deleteBookedTime = async (id) => {
        const del = await request(`http://localhost:3001/times/${id}`, 'DELETE');
        return del;
    };

    const deleteBookedDay = async (id) => {
        const day = await request(`http://localhost:3001/days/${id}`, 'DELETE');
        return day;
    };

    const postNewTime = async ({ dayExists, dayId, timeId, date, time }) => {
        const newTime = await request(
            `http://localhost:3001/times/`,
            'POST',
            JSON.stringify({ id: timeId, dayId, time })
        );

        if (!dayExists) {
            const newDay = await request(
                `http://localhost:3001/days/`,
                'POST',
                JSON.stringify({ id: dayId, day: date })
            );
        }
    };

    return {
        getAllBookedDays,
        getDayBookedTime,
        deleteBookedTime,
        deleteBookedDay,
        postNewTime,
    };
};

export default useBookingService;
