function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
let backgrounColorID = null;

const getBackgraundColor = () => {
    backgrounColorID = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
       buttonStart.setAttribute('disabled', 'true')  
    }, 1000)
      
}; 


const stopAction = () => {
    clearInterval(backgrounColorID);
     buttonStart.removeAttribute('disabled', 'true')
};
buttonStart.addEventListener('click', getBackgraundColor)
buttonStop.addEventListener('click', stopAction)
