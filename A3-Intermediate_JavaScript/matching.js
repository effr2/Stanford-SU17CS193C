var suits = ["hearts", "clubs"];
var flippedCards = new Array();
var cardDeck = new Array();
var imgs = document.getElementsByTagName("img");

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function disableCardFlips(disable){
    if(disable){
        document.getElementById("cardSec").style.pointerEvents = "none";
    }
    else{
        document.getElementById("cardSec").style.pointerEvents = "auto";
    }
}

function checkForMatch(){
    disableCardFlips(false);
    var cardPattern = /[1-9]{1}(hearts|clubs).png/;

    var card1 = flippedCards[0];
    var card2 = flippedCards[1];
    console.log(card1.src);
    console.log(card2.src);
    var card1ImgName = card1.src.match(cardPattern)[0];
    var card2ImgName = card2.src.match(cardPattern)[0];
    
    if(card1ImgName[0] == card2ImgName[0]){
        card1.src = "clear.png";
        card2.src = "clear.png";
    }
    else{
        card1.src = "back.png";
        card2.src = "back.png";
        card1.addEventListener("click", flipCard, false);
        card2.addEventListener("click", flipCard, false);
    }
}
function flipCard(event){
    event.target.src = event.target.id;
    var card = document.getElementById(event.target.id);
    card.removeEventListener("click", flipCard, false);
    if(flippedCards.unshift(card) % 2 == 0){
        disableCardFlips(true);
        setTimeout(checkForMatch, 1500);
    }
}
function shuffle(){
    cardDeck = [];
    var suitsCount = {hearts: 3, clubs:3};
    var min = 0;
    var max = suits.length-1;
    for(var suitIndex = 0; suitIndex < suits.length; ++suitIndex){
        var cardNums = [1,2,3];
        for(var i = 0; i<3; ++i){
            cardNumIndex = getRandomIntInclusive(0, cardNums.length-1);
            if(suitsCount["hearts"]==0){
                min = max;
            }

            if(suitsCount["clubs"]==0){
                max = min;
            }

            cardSuit = getRandomIntInclusive(min, max);
            
            if(cardSuit == 0){
                suitsCount["hearts"] -= 1;
            }
            else{
                suitsCount["clubs"] -= 1;

            }
            cardName = cardNums[cardNumIndex] + (suits[cardSuit] + ".png");
            cardNums.splice(cardNumIndex, 1)
            cardDeck.push(cardName);
        }
    }
}

function startGame(event){
    shuffle();
    for(var index = 0; index < imgs.length; index++){
        imgs[index].src = "back.png";
        imgs[index].id = cardDeck[index];
        imgs[index].addEventListener("click", flipCard, false);
    }
}



var restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", startGame, false);
startGame();