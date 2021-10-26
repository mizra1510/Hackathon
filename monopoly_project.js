
// what do we want in our project :
//1) HTML & CSS that looks like the classic game 
//2) every buyable case must have a value(a price) , and every other case must do the task == OBJ 
//3) a dynamic pawn that can move across the board 
//4) a game dice that get random value between 2-12 
//5) a second player 
//6) every bought case must be unique and according to the player who bought it 
//7) there is 40 cases in total , the id of each will be it's position [0,39]
//8) 22 street cards ,2 prisons card , 1 starting card , 1 free parking card , 6

//to do :
//p


let arrBoard = [];      // this array will contain all the cards on the board 

let arrStreet = [];     // this array will contain all the street cards
let arrChance = [];     // this array will contain all the chance cards
let arrTaxe = [];       // this array will contain all the taxe cards
let arrPrison = [];     // this array will contain all the prison cards
let arrCompany = [];    // this array will contain all the company cards
let arrParking = [];    // this array will contain all the parking cards
let arrStarting =[];    // this array will contain all the starting cards

let arrPlayer = [];     // this array will contain all the players
let arrColors = ["red","blue","yellow","green"];   // this array contains colors for each player

let chanceEffect = ["go to prison", "get 50 dollars", "go to the most expansive card","you can buy any card u want"];

let br = document.createElement("BR")
//constructor of all objects 

class player{
    constructor(position, name, id, color ) {
        this.position = position ;
        this.name = name
        this.money = 300
        this.id = id
        this.color = color
        this.owning = false 
        this.proprety = []
    }
}

class streetCard{
    constructor(position, name, price, rent) {
        this.position = position
        this.name = name
        this.price = price
        this.rent = rent
        this.type = "street"
        this.isBought = false
        this.owner = null
    }
}

class taxeCard{
    constructor(position) {
        this.position = position
        this.price = 50
        this.type = "taxe"
    }
}

class companyCard{
    constructor(position) {
        this.position = position
        this.type = "company"
        this.price = 150
        this.owner = null
    }
}

class chanceCard{
    constructor(position) {
        this.position = position
        this.type = "chance"
        this.effect = undefined;
    }
}

class startingCard{
    constructor(position){
        this.position = position
        this.money = 200 
    }
}

class prisonCard {
    constructor(position){
        this.position = position
        this.type = "prison"
    }
}

class parkingCard {
    constructor(position){
        this.position = position
        this.type = "parking"
    }
}

//generate all players 

// for (let i = 0; i < amountOfPlayer; i++) {
//     var playerObj = new player(0,"hector",200);
//     arrPlayer.push(playerObj);
//     let startingPoint = document.getElementById("0")
//     startingPoint.appendChild(document.createElement("SPAN"))
// }


//generate all Cards Objects on the board 

for (let i = 0; i <= 39; i++) {
    if (i == 2 || i == 7 || i == 17 || i == 22 || i == 33 || i == 36) {
        //chance card
        var chance = new chanceCard(i);
        arrChance.push(chance);
        arrBoard.push(chance);
    }else if (i == 0) {
        //starting card
        var start = new startingCard(i);
        arrStarting.push(start);
        arrBoard.push(start);

    }else if (i == 10 ||i == 30) {
        // prison card
        var prison = new prisonCard(i);
        arrPrison.push(prison);
        arrBoard.push(prison);

    }else if (i == 4 || i == 38) {
        //taxes card
        var taxe = new taxeCard(i);
        arrTaxe.push(taxe);
        arrBoard.push(taxe);

    }else if (i == 20){
        //parking card
        var parking = new parkingCard(i);
        arrParking.push(parking);
        arrBoard.push(parking);

    }else if (i==5 || i == 12 || i == 15 || i==25 || i==28 || i == 35) {
        //rail road and company card 
        var company = new companyCard(i);
        arrCompany.push(company);
        arrBoard.push(company);
    }else{
        //street card
        if (i<3) {
            var street = new streetCard(i,document.getElementById(i).textContent , 50 , 10);
            arrStreet.push(street)
            arrBoard.push(street)
        }else if (i>3 && i<10) {
            var street = new streetCard(i,document.getElementById(i).textContent , 75 , 15);
            arrStreet.push(street)
            arrBoard.push(street)
        }else if (i>3 && i<10) {
            var street = new streetCard(i,document.getElementById(i).textContent , 100 , 20);
            arrStreet.push(street)
            arrBoard.push(street)    
        }else if (i>10 && i<15) {
            var street = new streetCard(i,document.getElementById(i).textContent , 125 , 25);
            arrStreet.push(street)
            arrBoard.push(street)
        }else if (i>15 && i<20) {
            var street = new streetCard(i,document.getElementById(i).textContent , 150 , 30);
            arrStreet.push(street)
            arrBoard.push(street)
        }else if (i>20 && i<25) {
            var street = new streetCard(i,document.getElementById(i).textContent , 175 , 35);
            arrStreet.push(street)
            arrBoard.push(street)
        }else if (i>25 && i<30) {
            var street = new streetCard(i,document.getElementById(i).textContent , 200 , 40);
            arrStreet.push(street)
            arrBoard.push(street)
        }else if (i>30 && i<35) {
            var street = new streetCard(i,document.getElementById(i).textContent , 225 , 45);
            arrStreet.push(street)
            arrBoard.push(street)
        }else if (i>35 && i<40) {
            var street = new streetCard(i,document.getElementById(i).textContent , 250 , 50);
            arrStreet.push(street)
            arrBoard.push(street)
        }
    }   
}


function createPlayers(amountOfPlayer) {
    if (amountOfPlayer <= 4 && amountOfPlayer > 0 ) {
        for (let i = 0; i < amountOfPlayer; i++) {
            let promptName = prompt("name of the player number "+i+1)
            arrPlayer.push(new player(0, promptName,"player"+i, arrColors[i]));
        }
    }else {
        alert("the number of players must be between 1 to 4")
    }      
}
  

function createPawnForPlayer() {
    let startingPoint = document.getElementById("0")
    for (let i = 0; i < arrPlayer.length; i++) {
        let pawn = document.createElement("SPAN")
        let pawnName = document.createTextNode(arrPlayer[i].name);
        startingPoint.appendChild(pawn)
        pawn.setAttribute("id","player"+i)
        pawn.appendChild(pawnName)
        pawn.appendChild(br)
    }
}

//creating an object for each players



// will get a random value between 2-12 (two dices possiblity) 
function throwDice() {
    let dice = Math.floor(Math.random() * 12) + 2;
    if (dice === 13) {
        alert("vous avez fait "+dice-1)
        return dice-1 ;  
    }
    alert("vous avez fait "+dice)
    return dice ;
}

// this function can move any player on any case (prison usage or chance card usage)
function movePlayerAnywhere(playerId , pos) {
    let playerOnTheBoard = document.getElementById(playerId)
    let newLocation = document.getElementById(pos)
    newLocation.appendChild(br);
    newLocation.appendChild(playerOnTheBoard);
}

// a function that will move the player on the board , it will take a parameter which is the ThrowDice results . 
// it will use the DOM to interact with the board 
function movePlayerWithDice(playerId) {
    let dice = throwDice();
    for (let i = 0; i < arrPlayer.length; i++) {
        if (arrPlayer[i].id == playerId) {
            let currentPos = arrPlayer[i].position
            if (currentPos+dice > 39) {
                movePlayerAnywhere(playerId ,currentPos+dice -40 )
                arrPlayer[i].position = currentPos+dice-40
            }else{
                movePlayerAnywhere(playerId ,currentPos+dice )
                arrPlayer[i].position = currentPos+dice
            }
        }    
    }
}

//this function will get me all the infos according to the case the player is on (price , rent ,type , owner )
function getCaseInfos(caseId) {
    for (let i = 0; i < arrBoard.length; i++) {
        if (caseId === arrBoard[i].position) {
            return arrBoard[i];
        }
    } 
}


// this function will let the player buy the case he's on if the case doesnt any owner , there for he becomes the owner . the case name is
//pushed in the array proprety of the object player . inside the object streets the value of owner becomes 
//
function buyCase(playerId) {
    for (let i = 0; i < arrPlayer.length; i++) {
        if (arrPlayer[i].id === playerId) {
            let caseObj = getCaseInfos(arrPlayer[i].position)
            if (caseObj.type === "street" && caseObj.owner===null && caseObj.isBought === false && arrPlayer[i].money >= caseObj.price) {
                if ( confirm( "voulez vous acheter cette case pour "+caseObj.price ) ) {
                    // Code à éxécuter si le l'utilisateur clique sur "OK"
                    arrPlayer[i].money = arrPlayer[i].money - caseObj.price
                    arrPlayer[i].proprety.push(caseObj)
                    caseObj.isBought = true
                    caseObj.owner = arrPlayer[i].id
                    document.getElementById(arrPlayer[i].position).parentNode.style.backgroundColor = arrPlayer[i].color
                } else {
                    // Code à éxécuter si l'utilisateur clique sur "Annuler" 
                }
            }
            
        }
       
        
    }   
}

// if a player sits on a case which is not his own then he must pay the rent
function payRent(playerThatMustPay , playerWhoReceive , rent ) {
    
}





// when the player is on a chance case he will receive a chance object randomly that can be either good or bad
function getChance() {
    
}

// when the player step on the prison case or got unlucky in the chance card, he is thrown in prison for a specific 
//amount of time 
function throwPrison(playerId) {
    
}

// gives money to the player 
function addMoney(playerId , amount) {
    
}

// takes money from the player to the bank 
function giveMoney(playerId , amount) {
    
}
// functions that will check the case the player is on and return the type of  the case (street , chance , taxe etc)
function checkCase(playerId) {
    for (let i = 0; i < arrPlayer.length; i++) {
        if (arrPlayer[i].id === playerId) {
            let caseObj = getCaseInfos(arrPlayer[i].position)
            if (caseObj.type === "street" && caseObj.isBought != null && caseObj.owner != playerId) {
                payRent(playerId , caseObj.owner , caseObj.rent )
            }else if (caseObj.type === "street" && caseObj.isBought === null) {
                buyCase(playerId)
            }else if (caseObj.type ==="chance") {
                getChance(playerId)
            }else if (caseObj.type ==="parking") {
                
            }else if (caseObj.type ==="prison") {
                
            }else if (caseObj.type ==="company") {
                
            }
                            
        }
       
        
    }   

    
    
}







