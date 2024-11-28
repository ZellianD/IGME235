
//url for a random card
const ranurl ="https://api.scryfall.com/cards/random";
//url for a random commander
const comurl ="https://api.scryfall.com/cards/random?q=is%3Acommander";

//when window load watch this button
window.onload = (e) => {document.querySelector("#searchbutton").onclick = cardSearch};

//random card
const randomcard = document.querySelector("#random");
randomcard.onclick = (p) =>{getRandom(ranurl);}

//random commander
const randomcom = document.querySelector("#rancom");
randomcom.onclick = (l) =>{getRandom(comurl)};
//basic card search for now
//makes the url for the card searched for
function cardSearch(){
    //base api url for scryfall
    const scryfall = "https://api.scryfall.com/cards/search";

    //grab the input
    let card = document.querySelector("#inputcard");
    console.log(card);
    console.log("button was pushed");

    //get the value of input
    let cardName = card.value;
    cardName = cardName.trim();
    cardName = encodeURIComponent(cardName);
    console.log(cardName);
    let advanceSearch="";

    //if nothing is entered "yell" at user
    if(cardName.length < 1){
        card.placeholder = "Please insert a card name";
        console.log("no card name");
        return;
    }
    if(advance)
    {
        let rarity = document.querySelector("#rarity");
        //r%3Drarityvalue
        if(rarity.value!="null")
            {
                advanceSearch +="+r%3D"+rarity.value;
            }
        let colors = document.querySelector("#color");
        console.log(colors);
        //console.log(colors.length); //undefined
        // for(i = 0; i < colors.length; i++)
        // {
        //     console.log(i);
        //     if(colors[i].checked == true)
        //     {
        //         console.log("true");
        //     }
        // }
        // colors.array.forEach(element => {
        //     if(element.checked)
        //     {
        //         advanceSearch+="+c%3D"+element.value;
        //     }
        // });
        //c%3Dcolorvalueselected
        let type = document.querySelector("#type");
        //t%3Atypevalue can stack
        let mana = document.querySelector("#mana");
        if(mana.value!="null")
        {
            advanceSearch+="+mv%3D"+mana.value;
        }
        
    }

    //create url
    let apiurl = `${scryfall}?q=${cardName}${advanceSearch}`;
    console.log(apiurl);

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
        if(!cards.data || cards.data.length == 0){
            //this card doesnt exist
            card.innerHTML = "No cards found.";
            console.log("nothing found");
            return;
        }
        //if there is only one match display that
        if(cards.data.length === 1){
            console.log("one card");
            console.log(cards.data[0]);
            document.querySelector("#showcard").src = cards.data[0]["image_uris"]["large"];
            document.querySelector("#searchbutton").innerHTML = "Search";
        }
        else{
            console.log("More than one card");
        }
    })
    .catch((error) => console.log("An error occured."))

}

//specific for randomcard and random commander
function getRandom(url){
    fetch(url)
    .then((response) => response.json())
    .then((cards)=>{
        console.log(cards);
        document.querySelector("#showcard").src = cards["image_uris"]["large"];
    })
    .catch((error)=> console.log("error"))
}
