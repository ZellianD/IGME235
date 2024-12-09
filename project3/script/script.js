
    let selectedElement = null; 

    const TRAY_POSITION = {x:50,y:530};
    const MAX_IMAGE_LEFT = 770;
    const LINE_HEIGHT = 30; 
    const IMAGE_MARGIN = 80;
    const IMAGE_SPACING = 80;
    const MAX_Z_INDEX = 1000; 

    const IMAGES = [`<img class="pic" src= "img/Eye.png" alt="">`,`<img class="pic" src= "img/Eye1.png" alt="">`,`<img class="pic" src= "img/Eye2.png" alt="">`]
    //create consts to create a boarder that they cannot cross

 	window.onload = (e) => {setupIMGS(); positionIMGS(); setupDragging();};

    //add to a class
    function setupIMGS()
    {
        for(let img of IMAGES)
        {
            document.querySelector("#tray").innerHTML += img;
        }
        // let testing = document.querySelector("#tray");
        // testing.innerHTML=`<img class="pic" src= "img/Eye.png" alt="">`;
    }
    function setPosition(word,wordLeft,wordTop)
    {
        //changes the css to the declared position for the word
        word.style.left = wordLeft + "px";
        word.style.top = wordTop + "px";
        word.style.transform = `rotate(${(Math.random() - 0.5)* 30}deg)`;
    }
    function positionIMGS()
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
        let allIMGS = document.querySelectorAll(".pic");
        let imgSpacing = IMAGE_SPACING;
        let imgLeft = IMAGE_MARGIN;
        let imgTop = TRAY_POSITION.y;

        for(let image of allIMGS)
        {
            setPosition(image,imgLeft,imgTop)
            imgLeft += imgSpacing;
            
            // if(wordLeft>= MAX_IMAGE_LEFT)
            // {
            //     wordLeft = IMAGE_MARGIN;
            //     wordTop += LINE_HEIGHT;
            // }
            image.onmousedown = doMouseDown;
        }
        //allows for movement of the title bars
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