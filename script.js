console.log("Blackjack script linked!");

var totalBalance = 1000;
var betBalance = 0;
var playerBalance = 1000;
var dealerValue = 0;
var rawDealerValue = 0; //values for the ace of value of 11 or 1
var playerValue = 0; //final value with the ace
var rawPlayerValue = 0;
var deck = [
	{ value: 11, url: "images/cards/ace_of_diamonds.png", count: false},
	{ value: 11, url: "images/cards/ace_of_clubs.png", count: false},
	{ value: 11, url: "images/cards/ace_of_hearts.png", count: false},
	{ value: 11, url: "images/cards/ace_of_spades2.png", count: false},
	{ value: 2, url: "images/cards/2_of_diamonds.png", count: false},
	{ value: 2, url: "images/cards/2_of_clubs.png", count: false},
	{ value: 2, url: "images/cards/2_of_hearts.png", count: false},
	{ value: 2, url: "images/cards/2_of_spades.png", count: false},
	{ value: 3, url: "images/cards/3_of_diamonds.png", count: false},
	{ value: 3, url: "images/cards/3_of_clubs.png", count: false},
	{ value: 3, url: "images/cards/3_of_hearts.png", count: false},
	{ value: 3, url: "images/cards/3_of_spades.png", count: false},
	{ value: 4, url: "images/cards/4_of_diamonds.png", count: false},
	{ value: 4, url: "images/cards/4_of_clubs.png", count: false},
	{ value: 4, url: "images/cards/4_of_hearts.png", count: false},
	{ value: 4, url: "images/cards/4_of_spades.png", count: false},
	{ value: 5, url: "images/cards/5_of_diamonds.png", count: false},
	{ value: 5, url: "images/cards/5_of_clubs.png", count: false},
	{ value: 5, url: "images/cards/5_of_hearts.png", count: false},
	{ value: 5, url: "images/cards/5_of_spades.png", count: false},
	{ value: 6, url: "images/cards/6_of_diamonds.png", count: false},
	{ value: 6, url: "images/cards/6_of_clubs.png", count: false},
	{ value: 6, url: "images/cards/6_of_hearts.png", count: false},
	{ value: 6, url: "images/cards/6_of_spades.png", count: false},
	{ value: 7, url: "images/cards/7_of_diamonds.png", count: false},
	{ value: 7, url: "images/cards/7_of_clubs.png", count: false},
	{ value: 7, url: "images/cards/7_of_hearts.png", count: false},
	{ value: 7, url: "images/cards/7_of_spades.png", count: false},
	{ value: 8, url: "images/cards/8_of_diamonds.png", count: false},
	{ value: 8, url: "images/cards/8_of_clubs.png", count: false},
	{ value: 8, url: "images/cards/8_of_hearts.png", count: false},
	{ value: 8, url: "images/cards/8_of_spades.png", count: false},
	{ value: 9, url: "images/cards/9_of_diamonds.png", count: false},
	{ value: 9, url: "images/cards/9_of_clubs.png", count: false},
	{ value: 9, url: "images/cards/9_of_hearts.png", count: false},
	{ value: 9, url: "images/cards/9_of_spades.png", count: false},
	{ value: 10, url: "images/cards/10_of_diamonds.png", count: false},
	{ value: 10, url: "images/cards/10_of_clubs.png", count: false},
	{ value: 10, url: "images/cards/10_of_hearts.png", count: false},
	{ value: 10, url: "images/cards/10_of_spades.png", count: false},
	{ value: 10, url: "images/cards/jack_of_diamonds2.png", count: false},
	{ value: 10, url: "images/cards/jack_of_clubs2.png", count: false},
	{ value: 10, url: "images/cards/jack_of_spades2.png", count: false},
	{ value: 10, url: "images/cards/jack_of_hearts2.png", count: false},
	{ value: 10, url: "images/cards/queen_of_diamonds2.png", count: false},
	{ value: 10, url: "images/cards/queen_of_clubs2.png", count: false},
	{ value: 10, url: "images/cards/queen_of_hearts2.png", count: false},
	{ value: 10, url: "images/cards/queen_of_spades2.png", count: false},
	{ value: 10, url: "images/cards/king_of_diamonds2.png", count: false},
	{ value: 10, url: "images/cards/king_of_clubs2.png", count: false},
	{ value: 10, url: "images/cards/king_of_hearts2.png", count: false},
	{ value: 10, url: "images/cards/king_of_spades2.png", count: false},
];

var deckCount = 52;
var deckCountUI = null; //user interface that displays deck count 52

var dealerCardCount = 0;
var dealerAceCount = 0;
var dealerCards = [];
var dealerCardsUI = []; //displays dealer cards

var playerCardCount = 0;
var playerAceCount = 0;
var playerCards = [];
var playerCardsUI = []; //displays player cards

var playerValueUI = null; 
var playerBetUI = null;
var playerBalanaceUI = null;
var betInputArea = null;
var placeBetButton = null;
var newGameButton = null;
var standButton = null;
var hitMeButton = null;

//	Place a player bet
function placePlayerBet(amount){
	//	Update the bet balance
	betBalance = 0;
	betBalance += parseInt(amount);
	playerBalance -= parseInt(amount);
	updateUI();
}

//	Update Screen values
function updateUI(){
	//	Update bet and balance
	playerBetUI.innerHTML = "$" + betBalance;
	playerBalanaceUI.innerHTML = "$" + playerBalance;
	deckCountUI.innerHTML = deckCount;
	betInputArea.value = '';

	//	Show dealer cards // loops through dealer cards and puts image and hides the 2nd image if it has 2 cards
	for(var i=0; i<dealerCardCount; i++){
		if(dealerCardCount > 2 || (dealerCardCount == 2 && i > 0)){
			dealerCardsUI[i].innerHTML = '<img src="' + dealerCards[i].url + '">';
		} 
	}

	//	Show Player cards
	for(var i=0; i<playerCardCount; i++){
		playerCardsUI[i].innerHTML = '<img src="' + playerCards[i].url + '">';
	}

	//	Update player value
	playerValueUI.innerHTML = playerValue;
}

//	Random number generator
function getRandom(min, max){
 	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 	var shuffle = deck[getRandom(0,52)].url
// 	$('#dealer-card1').html('<img src="'+shuffle+'">')
//	Randomly pick a card from the deck
function getCard(){
	if(deckCount > 0){
		//	Randomized card index
		var cardIndex = getRandom(0,51);

		//	Grab the card
		var possibleCard = deck[cardIndex];
		if(possibleCard.count !== true){ // tracking the cards
			//	Mark as used
			deck[cardIndex].count = true;
			deckCount--; //deck cards reduces by 1

			//	The card we want
			return possibleCard;
		}

		return false;
	}else{
		alert('No more cards in the deck!');

		return -9;
	}
}

//	Start a new game and deal the cards
function dealCards(){
	if(parseInt(betBalance) < 1){
		alert('Please enter a bet of at least $1');
	}else{
		//	Start a new game
		resetGame();

		//	Get initial 2 cards
		var maxInitialCardCount = 2;
		for(var i=0; i<maxInitialCardCount; i++){
			//	Get dealer cards
			var dealerCard = getCard();
			while(dealerCard === false){
				dealerCard = getCard();
			}

			//	Get player cards
			var playerCard = getCard();
			while(playerCard === false){
				playerCard = getCard();
			}

			//	Store the cards information in an array of cards of dealer/player has
			dealerCards[i] = dealerCard;
			playerCards[i] = playerCard;

			//	Update the card count
			if(dealerCard.value == 11){
				dealerAceCount++;
			}
			if(playerCard.value == 11){
				playerAceCount++;
			}
			dealerCardCount++;
			playerCardCount++;

			//	Update the card values
			rawDealerValue += dealerCard.value;
			if(dealerAceCount == 2){
				dealerValue = rawDealerValue - ((dealerAceCount-1)*10); //if 2 Ace shows up, it takes 1 ace to become value 1 
			}else{
				dealerValue = rawDealerValue;
			}
			
			rawPlayerValue += playerCard.value;
			if(dealerAceCount == 2){
				playerValue = rawPlayerValue - ((playerAceCount-1)*10);
			}else{
				playerValue = rawPlayerValue;
			}
		}

		//	Update the interface
		updateUI();

		//	Player win by default 21
		if(playerValue == 21){
			playerWin21();
		}
	}
}

//	Hit me!
function hitMe(){
	//	Get player cards
	var playerCard = getCard();
	while(playerCard === false){
		playerCard = getCard();
	}

	if(playerCard !== false){
		playerCardCount++;
		playerCards[playerCardCount-1] = playerCard;

		// Ace? if we have more than 3 aces
		if(playerCard.value == 11){
			playerAceCount++;
		}

		rawPlayerValue += playerCard.value;
		playerValue = rawPlayerValue - (playerAceCount*10);
		updateUI();
	}

	if(playerValue > 21){
		updateUI();
		playerBusted();
	}
}

//	Stand
function stand(){
	//	Get dealer cards
	var dealerMustHit = true;
	if(dealerValue >= 17){
		dealerMustHit = false;
	}
	while(dealerMustHit){
		var dealerCard = getCard();
		while(dealerCard === false){
			dealerCard = getCard();
		}

		if(dealerCard !== false){
			dealerCardCount++;
			dealerCards[dealerCardCount-1] = dealerCard;

			//	Ace?
			if(dealerCard.value == 11){
				dealerAceCount++;
			}

			rawDealerValue += dealerCard.value;
			dealerValue = rawDealerValue - (dealerAceCount*10);
			updateUI();
		}

		if(dealerValue >= 17){
			updateUI();
			dealerMustHit = false;
		}
	}

	//	Dealer bust
	if(dealerValue > 21){
		dealerBusted();
	//	Dealer did not bust
	//	Player wins
	}else if(dealerValue < playerValue){
		playerWinDefault();
	//	Dealer did not bust
	//	Dealer wins
	}else if(dealerValue > playerValue){
		dealerWinDefault();
	//	It is a tie
	}else if(dealerValue == playerValue){
		dealerPlayerTied();
	}
}

//	Player wins Black Jack!
function playerWin21(){
	playerBalance = playerBalance + (betBalance*1.5) + betBalance;
	updateUI();
	var audio = new Audio("http://lizarum.com/assignments/programming/objective_c/images/pickers/custom/Custom%20Picker%20Sounds/win.wav");
	audio.play();
	alert("BLACKJACK!");
	resetGame();
}

function playerWinDefault(){
	playerBalance += betBalance*2;
	updateUI();
	var audio = new Audio("http://lizarum.com/assignments/programming/objective_c/images/pickers/custom/Custom%20Picker%20Sounds/win.wav");
	audio.play();
	alert("YAY YOU WIN!!");
	resetGame();
}

//	Player busted
function playerBusted(){
	updateUI();
	alert("YOU BUSTED!!");
	resetGame();
}

//	Dealer busted
function dealerBusted(){
	playerBalance += betBalance*2;
	updateUI();
	var audio = new Audio("http://lizarum.com/assignments/programming/objective_c/images/pickers/custom/Custom%20Picker%20Sounds/win.wav");
	audio.play();
	alert("Dealer BUSTED!! YOU WIN!!");
	resetGame();
}

//	Dealer wins!
function dealerWinDefault(){
	updateUI();
	alert("Sorry, Dealer Wins!!");
	resetGame();
}

function dealerPlayerTied(){
	playerBalance += betBalance;
	updateUI();
	alert("It's a tie!");
	resetGame();
}

//	Setup the game. initialization
function startGame(){
	deckCount = 52;
//placing them into an array so we can call on them later
//binding the dealer cards 1,2,3,4 so we can easily call on them later
	dealerCardsUI[0] = document.getElementById('dealer-card1');
	dealerCardsUI[1] = document.getElementById('dealer-card2');
	dealerCardsUI[2] = document.getElementById('dealer-card3');
	dealerCardsUI[3] = document.getElementById('dealer-card4');
	//dealerCardsUI[4] = document.getElementById('dealer-card5');

	playerCardsUI[0] = document.getElementById('player-card1');
	playerCardsUI[1] = document.getElementById('player-card2');
	playerCardsUI[2] = document.getElementById('player-card3');
	playerCardsUI[3] = document.getElementById('player-card4');
	//playerCardsUI[4] = document.getElementById('player-card5');

	deckCountUI = document.getElementById('deck-count');
	playerValueUI = document.getElementById('player-value');
	playerBetUI = document.getElementById('player-bet');
	playerBalanaceUI = document.getElementById('player-balance');
	betInputArea = document.getElementById('input-bet');
	placeBetButton = document.getElementById('bet-button');
	newGameButton = document.getElementById('deal-card');
	standButton = document.getElementById('stand');
	hitMeButton = document.getElementById('hit');

	placeBetButton.addEventListener("click", function(){
	    placePlayerBet(betInputArea.value);
	});

	newGameButton.addEventListener("click", function(){
	    dealCards();
	});

	hitMeButton.addEventListener("click", function(){
	    hitMe();
	});

	standButton.addEventListener("click", function(){
	    stand();
	});
}

//	Reset the game
function resetGame(){
	dealerCardCount = 0;
	dealerCards = [];
	dealerValue = 0;
	rawDealerValue = 0;
	dealerAceCount = 0;
	playerCardCount = 0;
	playerCards = [];
	playerValue = 0;
	rawPlayerValue = 0;
	playerAceCount = 0;
	playerValueUI.innerHTML = '';
	playerBetUI.innerHTML = '$0';
	for(var i=0; i<dealerCardsUI.length; i++){
		dealerCardsUI[i].innerHTML = '';
	}
	for(var i=0; i<playerCardsUI.length; i++){
		playerCardsUI[i].innerHTML = '';
	}
}

//all htmls have been loaded
document.addEventListener('DOMContentLoaded', function(){
	startGame();
	resetGame();
}, false);