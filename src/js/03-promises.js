import Notiflix from 'notiflix';


import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';

const form = document.querySelector(".form");
const button = form.querySelector("button");
const delayInput = form.querySelector('input[name="delay"]');
const stepInput = form.querySelector('input[name="step"]');
const amountInput = form.querySelector('input[name="amount"]');


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const onPromiseCreate = (event) => {
  event.preventDefault();
  const valueDelay = Number(delayInput.value);
  const valueStep = Number(stepInput.value);
  const valueAmount = Number(amountInput.value);

  for (let i = 1; i <= valueAmount; i++) {
    const position = i;
    const delay = valueDelay + (i - 1) * valueStep;

    createPromise(position, delay)
      .then(({ position, delay }) => {
       Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);;
      });
  }
}

button.addEventListener('click', onPromiseCreate);