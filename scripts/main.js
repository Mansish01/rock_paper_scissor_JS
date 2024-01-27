
            // const score = {
            //     wins: 0,
            //     losses: 0,
            //     ties: 0
            // }

            let score = JSON.parse(localStorage.getItem('score')) || {
                wins : 0,
                losses :0,
                ties:0
            }

        updateScore();
        // if (!score){
        //     //checkin if score is null
        //     score = {
        //         wins : 0,
        //         losses :0,
        //         ties:0
        //     }
        // }

        // console.log(localStorage.getItem('score'));

let isAutoplaying = false;
let intervalId;
function autoPlay(){
    
    if (!isAutoplaying) {
        intervalId = setInterval(function(){
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);

        isAutoplaying= true;
    }
    else {
        clearInterval(intervalId);
        isAutoplaying = false;
    }
   
}

const rockElement = document.querySelector('.js-rock-btn');

// rockElement.addEventListener('click',  playGame('rock'));
//here playGame(rock) returns a value , but addEventListener requires a whole function 
// and not a value

rockElement.addEventListener('click',  () => {
    playGame('rock');
});

document.body.addEventListener('keydown', (event)=> {
    // console.log('keydow');
    // console.log(event.key);
    if (event.key === 'r'){
        playGame('rock');
    }

    else if ( event.key === 'p'){
        playGame('paper');
    }

    else if ( event.key === 's') {
        playGame('scissors');
    }

    
})

function playGame(playerMove){
    const computerMove = pickComputerMove();
    // console.log(computerMove2);

    let result = '';
    if (playerMove === 'scissors'){
        if(computerMove === 'rock'){
            result =  'You Lose';
        }
        else if(computerMove === 'paper'){
            result = 'You Win';
        }

        else if(computerMove === 'scissors'){
            result  = 'Tie';
        }
    }


    else if (playerMove === 'paper'){
                if(computerMove === 'rock'){
            result =  'You Win';
        }
        else if(computerMove === 'paper'){
            result = 'Tie';
        }

        else if(computerMove === 'scissors'){
            result = 'You Lose';
        }

    }

    else if (playerMove === 'rock'){

            if(computerMove === 'rock'){
            result =  'Tie';
        }
        else if(computerMove === 'paper'){
            result = 'You Lose';
        }

        else if(computerMove === 'scissors'){
            result  = 'You Win';
        }
    }

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves')
        .innerHTML = ` You 
        <img src="images/${playerMove}-emoji.png" alt="rock-img" class="move-icon">

        <img src="images/${computerMove}-emoji.png" alt="scissor-img" class="move-icon">
        Computer`

    if (result === 'You Win') {
        score.wins += 1;
    }

    else if (result === 'You Lose'){
        score.losses += 1;
    }
    else if(result === 'Tie'){
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    //since it takes string we need to convert it to string 

    updateScore();
    

//                 alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
// wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`);
// //so that extra spaces is not shown in the alert message               
        }

        function updateScore (){
            document.querySelector('.js-score')
            .innerHTML = `wins: ${score.wins}, 
            losses: ${score.losses}, ties: ${score.ties}`;
        }
        
        function pickComputerMove(){
            let computerMove = '';
            const randomNumber = Math.random();
        
            if (randomNumber >= 0 && randomNumber< 1/3){
                computerMove = 'rock';
            } else if (randomNumber >= 1/3 && randomNumber < 2/3){
                computerMove  ='paper';
            }
            else if (randomNumber >= 2/3 && randomNumber < 1){
                computerMove = 'scissors'; //limited to the curly brackets only so it was declared outside
                    //rule of scope , but var doesnt follow rule of scope
            }
            return computerMove;
    }