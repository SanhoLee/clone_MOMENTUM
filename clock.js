const clockContainer = document.querySelector(".js-clock"),
 clockTitle = clockContainer.querySelector("h1");


function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const sec = date.getSeconds();
    clockTitle.innerHTML = `${hours < 10 ? `0${hours}`:hours} :
                            ${minutes < 10 ? `0${minutes}`:minutes} :
                            ${sec < 10 ? `0${sec}`:sec}`;
}

function init(){
    setInterval(getTime, 1000);
}

init();






