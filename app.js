const qwerty=document.getElementById('qwerty');
const phrase=document.getElementById('phrase');
const srtButton=document.getElementsByClassName('btn__reset')[0];
const overlay=document.getElementById('overlay');
let missed=0;
const phrases=['just do it', 'now', 'take action', 'again', 'lets go']
const ul=document.querySelector('#phrase ul');
const choosenPhrase=getRandomPhrase(phrases);
const selectedPhraseDisplay=addPhraseToDisplay(choosenPhrase);

srtButton.addEventListener('click', ()=>{
    overlay.style.display='none';
});

/*get a random phrase from phrase list*/
function getRandomPhrase(array){
    const randomIndex=Math.floor(Math.random()*array.length);
    const randomSelected=array[randomIndex].toLowerCase();
    const randomSplit=randomSelected.split('');
    return randomSplit;
}

function addPhraseToDisplay(phrase){
    for(let i=0; i<phrase.length; i++){
        const list=document.createElement('li');
        list.textContent=phrase[i];
        ul.appendChild(list);

        if(phrase[i]===' '){
            list.className='space';
        }else{
            list.className='letter';
        }
    }
}

function checkLetter(button){
    const letterList=document.querySelectorAll('.letter');
    let matchLetter=null;

    for(let i=0;i<letterList.length;i++){
        if(button.textContent===letterList[i].textContent){
            letterList[i].classList.add('show');
            letterList[i].style.transition='1s ease-in';
            matchLetter=true;
        }
    }
    return matchLetter;
}

qwerty.addEventListener('click',(e)=> {
    if(e.target.tagName==='BUTTON'){
        e.target.className='chosen';
        e.target.setAttribute('disabled','');
        let matchLetter=checkLetter(e.target);
        if(matchLetter===null){
            document.querySelectorAll('img')[missed].src='images/lostHeart.png';
            e.target.className='mismatch';
            missed++;
        }
        checkWin();
    }
})

function checkWin(){
    const letterClass=document.getElementsByClassName('letter');
    const showClass=document.getElementsByClassName('show');

    if(letterClass.length===showClass.length){
        overlay.className='win';
        overlay.style.display='flex';
        document.querySelector('h2').textContent='You Won!';
        playAgain();
    }else if(missed>4){
        overlay.style.display='flex';
        overlay.className='lose';
        document.querySelector('h2').textContent='You Lose!';
        playAgain();
    }
}
