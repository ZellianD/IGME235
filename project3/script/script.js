
    let selectedElement = null; 

    const TRAY_POSITION = {x:50,y:500};
    const MAX_WORD_LEFT = 770;
    const LINE_HEIGHT = 30; 
    const WORD_MARGIN = 10;
    const WORD_SPACING = 8;
    const MAX_Z_INDEX = 1000; 
    //create consts to create a boarder that they cannot cross

 	window.onload = (e) => {positionWords(); setupStartingPoem(); setupDragging();};

    function setupStartingPoem()
    {
        //will need to change this 
        //this is looking all over the html for this one word
        //will need to change this to match mine when i make it 
        //original and all that jazz
        setPosition(getWord("gibber"),150,100);
        setPosition(getWord("gibber"),150,100);
        setPosition(getWord("ing"),210,100);
        setPosition(getWord("Professor"),253,103);
        setPosition(getWord("meep"),350,100);
        setPosition(getWord("s"),390,100);

        setPosition(getWord("disagreeable"),200,162);
        setPosition(getWord("ly"),290,162);
        setPosition(getWord("eternal"),330,160);

        setPosition(getWord("eldritch"),260,230);
        setPosition(getWord("cyclopean"),270,280);
        setPosition(getWord("horror"),275,330);
        //"10 more starting words to come"
        //whatever the actual fuck that means
    }
    function setPosition(word,wordLeft,wordTop)
    {
        //changes the css to the declared position for the word
        word.style.left = wordLeft + "px";
        word.style.top = wordTop + "px";
        word.style.transform = `rotate(${(Math.random() - 0.5)* 20}deg)`;
    }
    function getWord(text)
    {
        let allWords = document.querySelectorAll(".word");
        for(let word of allWords)
        {
            if(word.textContent == text)
            {
                return word;
            }
        }
    }
    function positionWords()
    {
        let doMouseDown = (e) => {
            e.preventDefault();
            selectedElement = e.target;
            //create something that checks and makes sure everything is within the bounds...which
            //ive think theyve done weird here because i dont think there IS bounds
            // if(selectedElement.x > TRAY_POSITION.x||selectedElement.y > TRAY_POSITION.y)
            // {
            //     setPosition(selectedElement,());
            // }
            selectedElement.style.zIndex = MAX_Z_INDEX; 
        };
        let allWords = document.querySelectorAll(".word");
        let wordSpacing = WORD_SPACING;
        let wordLeft = WORD_MARGIN;
        let wordTop = TRAY_POSITION.y;

        for(let word of allWords)
        {
            setPosition(word,wordLeft,wordTop)
            let wordWidth = word.clientWidth;
            wordLeft += wordWidth + wordSpacing;
            
            if(wordLeft>= MAX_WORD_LEFT)
            {
                wordLeft = WORD_MARGIN;
                wordTop += LINE_HEIGHT;
            }
            word.onmousedown = doMouseDown;
        }
        document.querySelector("#title1").onmousedown = doMouseDown;
        document.querySelector("#title2").onmousedown = doMouseDown;
        document.querySelector("#title3").onmousedown = doMouseDown;
        document.querySelector("#title4").onmousedown = doMouseDown;
        document.querySelector("#title5").onmousedown = doMouseDown;
    }
    function setupDragging()
    {
        document.onmousemove = (e) => {
            e.preventDefault();
            if(selectedElement)
            {
                let mousePos = getMousePos(document.body,e);
                 mousePos.x -= selectedElement.clientWidth/2;
                 mousePos.y -= selectedElement.clientHeight/2;
                 setPosition(selectedElement, mousePos.x,mousePos.y);
            }
        };
        document.onmouseup = (e) => {
            if(selectedElement)
            {
                selectedElement.style.zIndex = MAX_Z_INDEX - 1;
            }
            selectedElement = null;
        };
    }

    function getMousePos(parentElement,event)
    {
        let rect = parentElement.getBoundingClientRect();
        return{
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
           };
    }