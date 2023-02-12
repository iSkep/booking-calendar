import { format } from 'date-fns';
import { useNavigation } from 'react-day-picker';
import { useTheme } from '../../hooks/theme.hook';

import './customCaption.css';

function CustomCaption(props) {
    const { goToMonth, nextMonth, previousMonth } = useNavigation();
    const { theme, setTheme } = useTheme();

    const handleToggleThemeClick = () => {
        setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
    };

    const monthName = format(props.displayMonth, 'LLLL yyy');

    return (
        <div className="header">
            <div className="header__row">
                <button className="btn btn_theme" onClick={handleToggleThemeClick}>
                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.6729 29C8.50531 28.7147 3.9702 25.8792 1.28379 20.2364C0.159633 17.8725 -0.177726 15.3427 0.0837838 12.7423C0.360011 9.99769 1.32341 7.50534 3.00454 5.32553C5.02077 2.71385 7.62794 0.943181 10.8057 0.0430718C11.2461 -0.0819434 11.6921 0.0714843 11.9344 0.421527C12.188 0.78748 12.1846 1.22162 11.8846 1.60576C11.1872 2.49678 10.6121 3.45485 10.2306 4.52543C9.58757 6.3302 9.37587 8.17701 9.68606 10.075C10.1219 12.7367 11.3593 14.9517 13.4061 16.6951C14.9491 18.0089 16.7344 18.8113 18.737 19.1204C20.8902 19.4522 22.9585 19.1624 24.934 18.2464C25.6959 17.893 26.4114 17.4531 27.068 16.9235C27.2367 16.7872 27.3997 16.6428 27.6023 16.5553C27.9793 16.3916 28.3404 16.4121 28.6653 16.6735C28.9914 16.9349 29.0548 17.2929 28.9597 17.6748C28.3948 19.9489 27.385 21.9946 25.8668 23.7857C24.1597 25.7985 22.0529 27.2293 19.5883 28.1272C18.0114 28.6988 16.3732 28.9841 14.6729 29Z" />
                    </svg>
                </button>
            </div>
            <div className="header__row">
                <h2 className='header__date'>{monthName.charAt(0).toUpperCase() + monthName.slice(1)}</h2>
                <div className="header__buttons">
                    <button
                        className="btn btn_control"
                        disabled={!previousMonth}
                        onClick={() => previousMonth && goToMonth(previousMonth)}
                    ></button>
                    <button
                        className="btn btn_control"
                        disabled={!nextMonth}
                        onClick={() => nextMonth && goToMonth(nextMonth)}
                    ></button>
                </div>
            </div>
        </div>
    );
}

export default CustomCaption;
