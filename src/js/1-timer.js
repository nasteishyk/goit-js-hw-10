import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btnStart = document.querySelector('.start-btn');

const timer = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0]

    if (new Date() > selectedDates[0]) {
      iziToast.show({
        message: 'Please choose a date in the future',
        color: '#f8365c',
        position: 'topRight'
      });
    } else {
      btnStart.disabled = false;
    }
  }
};

const datetimePicker = flatpickr('input#datetime-picker', options);

btnStart.disabled = true;

btnStart.addEventListener('click', (e) => {
  e.preventDefault()

  datetimePicker.input.disabled = true;
  btnStart.disabled = true;

  const timerId = setInterval(() => {
    const leftTime = convertMs(userSelectedDate - new Date());

    timer.days.textContent = addLeadingZero(leftTime.days);
    timer.hours.textContent = addLeadingZero(leftTime.hours);
    timer.minutes.textContent = addLeadingZero(leftTime.minutes);
    timer.seconds.textContent = addLeadingZero(leftTime.seconds);

    if (userSelectedDate - new Date() <= 0) {
      clearInterval(timerId);
      Object.values(timer).forEach(item => item.textContent = '00');
      datetimePicker.input.disabled = false;
    }
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
