
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

// one by one
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';

const button = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const refs = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  }
let timer = null;

const startTimer = () => {

 timer =  setInterval(() => {
  const selectedDater = new Date(input.value).getTime();
  const result = selectedDater - Date.now();
  
   
   
   if (result <= 0) {
     stopTimer(timer);

     return
   }
     let { days, hours, minutes, seconds } = convertMs(result)
  
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
   refs.seconds.textContent = addLeadingZero(seconds);
   input.setAttribute('disabled', 'true');
   button.setAttribute('disabled', 'true');
     }, 1000)
}
 const stopTimer =() =>{
   clearInterval(timer);
   
  }

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const time = new Date();
      const selectedDate = selectedDates[0]
    if (selectedDate < time) { 
      Notiflix.Notify.failure('Please choose a date in the future');
      button.setAttribute('disabled', 'true');
    };
    if (selectedDate > time) {
        button.removeAttribute('disabled', 'true');
    
      
  }
    
  }
}

function convertMs(result) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = Math.floor(result / day);
  const hours = Math.floor((result % day) / hour);
  const minutes = Math.floor(((result % day) % hour) / minute);
  const seconds = Math.floor((((result % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
console.log(convertMs(2000));
console.log(convertMs(140000));
console.log(convertMs(24140000));

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

let calendar = flatpickr(input,options)
button.addEventListener('click', startTimer);


