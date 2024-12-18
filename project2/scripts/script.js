
//url for a random card
const ranurl ="https://api.scryfall.com/cards/random";
//url for a random commander
const comurl ="https://api.scryfall.com/cards/random?q=is%3Acommander";

//when window load watch this button
window.onload = (e) => {document.querySelector("#searchbutton").onclick = cardSearch; loadCard();};


//random card
const randomcard = document.querySelector("#random");
randomcard.onclick = (p) =>{getRandom(ranurl);}

//random commander
const randomcom = document.querySelector("#rancom");
randomcom.onclick = (l) =>{getRandom(comurl)};

//holds card name search
let permCardName ="";
let prevCardURL = "";
//makes the url for the card searched for
function cardSearch(){
    //base api url for scryfall
    const scryfall = "https://api.scryfall.com/cards/search";

    //grab the input
    let card = document.querySelector("#inputcard");
    //console.log(card);
    //console.log("button was pushed");

    //get the value of input
    let cardName = card.value;
    cardName = cardName.trim();
    cardName = encodeURIComponent(cardName);
    //console.log(cardName);
    permCardName=cardName.toLowerCase();
    //console.log(permCardName);
    let advanceSearch="";

    //if nothing is entered "yell" at user
    // if(cardName.length < 1){
    //     card.placeholder = "Please insert a card name";
    //     console.log("no card name");
    //     return;
    // }

        let rarity = document.querySelector("#rarity");
        //r%3Drarityvalue
        if(rarity.value!="null")
            {
                advanceSearch +="+r%3D"+rarity.value;
            }
        //grabs all the checkboxes in the color list    
        let colors = document.getElementById("color").querySelectorAll('input[type="checkbox"]');
        //console.log(colors);
        
        //Checks if any are checked
        for(i = 0; i < colors.length; i++)
        {
            if(colors[i].checked == true)
            {
                //adds to search
                advanceSearch+="+c%3D"+colors[i].value;
            }
        }
        //c%3Dcolorvalueselected

        //grabs all checkboxes in types
        let cardType = document.getElementById("types").querySelectorAll('input[type="checkbox"]');
        //console.log(cardType);

        //Checks for if they are checked
        for (j = 0; j< cardType.length; j++)
        {
            if(cardType[j].checked == true)
            {
                advanceSearch+="+t%3A"+cardType[j].value;
            }
        }
        //t%3Atypevalue can stack

        let mana = document.querySelector("#mana");
        if(mana.value!="null")
        {
            advanceSearch+="+mv%3D"+mana.value;
        }
        

    //create url
    let apiurl = `${scryfall}?q=${cardName}${advanceSearch}`;
    //console.log(apiurl);

    //update button
    document.querySelector("#searchbutton").innerHTML = "Searching";

    //get the card(s)
    getCards(apiurl);
}

//fetchs the json and applies it
function getCards(url){
    fetch(url)
    .then((response) => response.json())
    .then((cards) =>{
        document.querySelector("#backfire").innerHTML =" ";
        document.querySelector("#searchbutton").innerHTML = "Search";
        if(!cards.data || cards.data.length == 0){
            //this card doesnt exist
            card.innerHTML = "No cards found.";
            //console.log("nothing found");
            return;
        }
        //if there is only one match display that
        if(cards.data.length === 1){
            //console.log("one card");
            //console.log(cards.data[0]);
            document.querySelector("#showcard").src = cards.data[0]["image_uris"]["normal"];
            prevCardURL=cards.data[0]["uri"];
            saveCard();
        }
        else{
            //console.log("More than one card");
            for(let face of cards.data)
            {
                //console.log(face["name"].toLowerCase());
                if(face["name"].toLowerCase()==permCardName)
                {
                    document.querySelector("#showcard").src = face["image_uris"]["normal"];
                    prevCardURL=face["uri"];
                    saveCard();
                    return;
                }
            }
            document.querySelector("#showcard").src = cards.data[0]["image_uris"]["normal"];
            prevCardURL=cards.data[0]["uri"];
            saveCard();
        }
    })
    .catch((error) => {
        //console.log("An error occured, please adjust your search tearms.");
        document.querySelector("#showcard").src = "imgs/Magic_card_back.png";
        document.querySelector("#backfire").innerHTML ="An error occured, please adjust your search tearms.";
    })
}

//specific for randomcard and random commander
function getRandom(url){
    fetch(url)
    .then((response) => response.json())
    .then((cards)=>{
        //console.log(cards);
        document.querySelector("#showcard").src = cards["image_uris"]["normal"];
        prevCardURL=cards["uri"];
        document.querySelector("#backfire").innerHTML =" ";
        saveCard()
    })
    .catch((error)=> console.log("error"))
}
//saves card displayed
function saveCard(){
    const prefix ="zad8948";
    const cardKey = prefix + "card";
    localStorage.setItem(cardKey,prevCardURL);
}
//loads the cards specific url
function loadCard(){
    const prefix ="zad8948";
    const cardKey = prefix + "card";
    const storedCard = localStorage.getItem(cardKey);
    if(storedCard)
    {
        fetch(storedCard)
        .then((response) => response.json())
        .then((data)=>{
        document.querySelector("#showcard").src = data["image_uris"]["normal"];
        })
        .catch((error) => {
            //console.log("An error occured, please adjust your search tearms.");
            document.querySelector("#showcard").src = "imgs/Magic_card_back.png";
            document.querySelector("#backfire").innerHTML ="An error occured, please adjust your search tearms.";
        })
    }
}
