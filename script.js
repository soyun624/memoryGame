let clickedCard = null;
let preventClick = false;
let combosFound = 0;
const theTimer = document.querySelector(".timer");
var timer = [0,0,0,0];
var interval;
var timeRunning = false;

const colors = [
    'pink',
    'yellow',
    'green',
    'red',
    'purple',
    'skyblue',
    'orange',
    'blue'
];

const cards = [...document.querySelectorAll('.card')];
for(let color of colors){
    const cardAIndex = parseInt(Math.random() * cards.length);
    const cardA = cards[cardAIndex];
    cards.splice(cardAIndex, 1);
    cardA.className += ` ${color}`;
    cardA.setAttribute('data-color', color);

    const cardBIndex = parseInt(Math.random() * cards.length);
    const cardB = cards[cardBIndex];
    cards.splice(cardBIndex, 1);
    cardB.className += ` ${color}`;
    cardB.setAttribute('data-color', color);
}

function leadingZero(time){
    if(time <= 9){
        time = "0" + time;
    }
    return time;
}

function runTimer(){
    let currentTime = leadingZero(timer[0])+":"+leadingZero(timer[1]);
    theTimer.innerHTML = currentTime;
    timer[3]++;
    timer[0] = Math.floor((timer[3]/100)/60); //convert millisecond to minute
    timer[1] = Math.floor((timer[3]/100)-timer[0]*60);
    timer[2] = Math.floor(timer[3] - (timer[1]*100)- timer[0]*6000);
}

function onCardClicked(e){
    const target = e.currentTarget;
   
    if(timeRunning !== true){
        timeRunning = true;
        interval = setInterval(runTimer, 10);
    }
   
    

    if(preventClick || target === clickedCard || target.className.includes('done')){
        return;
    }
    target.className = target.className.replace('color-hidden', '').trim();

    target.className += ' done';
    console.log(target.getAttribute('data-color'));

    if(!clickedCard){
        //if we haven't clicked a card, keep track of the card, display it's color
        clickedCard = target;
    }else if (clickedCard){
        //if we have already clicked a card, check if the new card matches the old card color
      
        if(clickedCard.getAttribute('data-color') !== target.getAttribute('data-color')){
            preventClick = true;
            setTimeout(() => {
                console.log('card not equal');
                clickedCard.className = clickedCard.className.replace('done','').trim() + ' color-hidden';
                target.className = target.className.replace('done','').trim() + ' color-hidden';
                clickedCard = null;
                preventClick = false;
            }, 500);
        }else{
            
            combosFound++;
            clickedCard = null;
            if(combosFound === 8){
                alert("Your record is : " + theTimer.textContent);
                timeRunning = false;
                document.location.reload();
                clearInterval(interval);
                

            }
            
        }
    }

}
