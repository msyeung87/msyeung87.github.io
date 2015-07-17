console.log("Blackjack script linked!");


var ruleButton = $('#modal-button');
var ruleModal = $('#modal');

ruleButton.on('click', function(){ //Modal button for game rules
	console.log("rules clicked");
	ruleModal.toggle();
});


var totalBalance = 0;
var betBalance = 0;
var playerBalance = 1000;

//setBet amount 
var setBet = function setBet(amount,total){
	if(total === "bettings"){
		betBalance += parseInt(amount);
		totalBalance += parseInt(amount);
		$('.player-bet').eq(0).text("$" + betBalance) //adds input bet to bet balance
	}
}

//adding user input bet to total bet total
//subtracting user input bet from player cash
var bettings = function bettings (){
	var betButton = $('#bet-button'); 
	betButton.click(function(){
		console.log("bet button clickedddd");
		var amount = $('#input-bet')[0].value;
		$('#input-bet').val(''); //once clicked, input value clears
		if(amount <= playerBalance){
			setBet(amount,"bettings");
			playerBalance -= parseInt(amount);
			$('.player-balance').text("$" + playerBalance); //player's cash subtract bet input
		}
	});
}


// var deck = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];

// function shuffle(deck){
// 	for (var i = 0; i < deck.length; i++){
// 		var random = Math.floor(Math.random() * deck.length);
// 		return random
// 	}
// }

// var ace = 1 or 11 of 4
// var jack = 10 of 4
// var queen = 10 of 4
// var king = 10 of 4



//running functions
bettings();