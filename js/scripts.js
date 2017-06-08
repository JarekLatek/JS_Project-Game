window.onload = function() {
	console.log('The page is fully loaded.');
	console.log(document);
	console.log(location);

	var newGameBtn = document.getElementById('js-newGameButton'),			// new game button
		pickRock = document.getElementById('js-playerPick_rock'),			// player choice
		pickPaper = document.getElementById('js-playerPick_paper'),			// player choice
		pickScissors = document.getElementById('js-playerPick_scissors');	// player choice

	newGameBtn.addEventListener('click', newGame);

	// player choice

	pickRock.addEventListener('click', function() {
		playerPick('rock');
	});
	pickPaper.addEventListener('click', function() {
		playerPick('paper');
	});
	pickScissors.addEventListener('click', function() {
		playerPick('scissors');
	});

	// beginning play state

	var gameState = 'notStarted', //started // ended
		player = {
			name: '',
			score: 0
		},
		computer = {
			score: 0
		};

	// game elements view

	var newGameElem = document.getElementById('js-newGameElement'),
		pickElem = document.getElementById('js-playerPickElement'),
		resultsElem = document.getElementById('js-resultsTableElement');

	function setGameElements () {
		switch(gameState) {
			case 'started':
					newGameElem.style.display = 'none';
					pickElem.style.display = 'block';
					resultsElem.style.display = 'block';
				break;
			case 'ended':
					newGameBtn.innerText = 'Play again';
			case 'notStarted':
			default:
					newGameElem.style.display = 'block';
					pickElem.style.display = 'none';
					resultsElem.style.display = 'none';
		}
	}
	setGameElements();

	// game start

	var playerPointsElem = document.getElementById('js-playerPoints'),
		playerNameElem = document.getElementById('js-playerName'),
		computerPointsElem = document.getElementById('js-computerPoints');

	function newGame() {
		player.name = prompt('Please enter your name', 'imię gracza');
		if (player.name) {
			player.score = computer.score = 0;
			gameState = 'started';
			setGameElements();

			playerNameElem.innerHTML = player.name;
			setGamePoints();
		}
	}

	// player and computer choice

	var playerPickElem = document.getElementById('js-playerPick'),
		computerPickElem = document.getElementById('js-computerPick'),
		playerResultElem = document.getElementById('js-playerResult'),
		computerResultElem = document.getElementById('js-computerResult');

	function playerPick(playerPick) {
		var computerPick = getComputerPick();

		playerPickElem.innerHTML = playerPick;
		computerPickElem.innerHTML = computerPick;

		checkRoundWinner(playerPick, computerPick);

		console.log(playerPick);
	}

	// computer choice

	var x = Math.random();
	Math.floor(Math.random()*3);

	function getComputerPick() {
		var possiblePicks = ['rock', 'paper', 'scissors'];
		return possiblePicks[Math.floor(Math.random()*3)];
	}

	function setGamePoints() {
		playerPointsElem.innerHTML = player.score;
		computerPointsElem.innerHTML = computer.score;
	}

	// points and logic

	function checkRoundWinner(playerPick, computerPick) {
		playerResultElem.innerHTML = computerResultElem.innerHTML = '';

		var winnerIs = 'player';

			if (playerPick == computerPick) {
				winnerIs = 'noone'; // remis
			} else if (
				(computerPick == 'rock' && playerPick == 'scissors') ||
				(computerPick == 'scissors' && playerPick == 'paper') ||
				(computerPick == 'paper' && playerPick == 'rock')) {

				winnerIs = 'computer';
			}

			if (winnerIs == 'player') {
				playerResultElem.innerHTML = player.name + " wins!";
				player.score++;
			} else if (winnerIs == 'computer') {
				computerResultElem.innerHTML = "Computer wins!";
				computer.score++;
			} else if (winnerIs == 'noone') {
				playerResultElem.innerHTML = computerResultElem.innerHTML = "Draw!";
			}

		setGamePoints();
		checkGameWinner();
	}

	function checkGameWinner() {
		if (player.score === 10) {
			alert('Wygrałeś całą bitwę');
			gameState = 'ended';
			setGameElements();
		} else if (computer.score === 10) {
			alert('Zostałeś pokonany');
			gameState = 'ended';
			setGameElements();
		}
	}
};