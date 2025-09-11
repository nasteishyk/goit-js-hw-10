import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delay = form.elements.delay;

form.addEventListener('submit', handle);

function handle(e) {
  e.preventDefault();
  const promise = new Promise((resolve, reject) => {
    const delayValue = Number(delay.value);
    const selected = form.elements.state.value;
    setTimeout(() => {
      if (selected === 'fulfilled') {
        resolve(delayValue);
      } else {
        reject(delayValue);
      }
    }, delayValue);
  })
    .then(delay =>
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        color: '#91ee97',
        position: 'topRight'
      })
    )
    .catch(delay =>
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        color: '#da5d63',
        position: 'topRight'
      })
    );
}
