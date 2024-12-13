
    let selectedElement = null; 

    const TRAY_POSITION = {x:50,y:530};
    const MAX_IMAGE_LEFT = 770;
    const LINE_HEIGHT = 30; 
    const IMAGE_MARGIN = 80;
    const IMAGE_SPACING = 0;   
    const MAX_Z_INDEX = 1000; 

    let sound;
    const HAND = [
        `img/bone_background.png`,
        `<a target="_blank" href="img/hand_full.png">Hint</a>`,
        './sounds/bone.mp3',
        `<img class ="pic" src = "img/hand_1.png" alt="hand 1">`,
        `<img class ="pic" src = "img/hand_2.png" alt="hand 2">`,
        `<img class ="pic" src = "img/hand_3.png" alt="hand 3">`,
        `<img class ="pic" src = "img/hand_4.png" alt="hand 4">`,
        `<img class ="pic" src = "img/hand_5.png" alt="hand 5">`,
        `<img class ="pic" src = "img/hand_6.png" alt="hand 6">`,
        `<img class ="pic" src = "img/hand_7.png" alt="hand 7">`,
        `<img class ="pic" src = "img/middle_bone_1.png" alt="middle bone 1">`,
        `<img class ="pic" src = "img/middle_bone_2.png" alt="middle bone 2">`,
        `<img class ="pic" src = "img/middle_bone_3.png" alt="middle bone 3">`,
        `<img class ="pic" src = "img/middle_bone_4.png" alt="middle bone 4">`,
        `<img class ="pic" src = "img/pinky_bone_1.png" alt="pinky bone 1">`,
        `<img class ="pic" src = "img/pinky_bone_2.png" alt="pinky bone 2">`,
        `<img class ="pic" src = "img/pinky_bone_3.png" alt="pinky bone 3">`,
        `<img class ="pic" src = "img/pinky_bone_4.png" alt="pinky bone 4">`,
        `<img class ="pic" src = "img/pointer_bone_1.png" alt="pointer bone 1">`,
        `<img class ="pic" src = "img/pointer_bone_2.png" alt="pointer bone 2">`,
        `<img class ="pic" src = "img/pointer_bone_3.png" alt="pointer bone 3">`,
        `<img class ="pic" src = "img/pointer_bone_4.png" alt="pointer bone 4">`,
        `<img class ="pic" src = "img/radius_bone.png" alt="radius">`,
        `<img class ="pic" src = "img/ring_bone_1.png" alt="ring bone 1">`,
        `<img class ="pic" src = "img/ring_bone_2.png" alt="ring bone 2">`,
        `<img class ="pic" src = "img/ring_bone_3.png" alt="ring bone 3">`,
        `<img class ="pic" src = "img/ring_bone_4.png" alt="ring bone 4">`,
        `<img class ="pic" src = "img/thumb_bone_1.png" alt="thumb bone 1">`,
        `<img class ="pic" src = "img/thumb_bone_2.png" alt="thumb bone 2">`,
        `<img class ="pic" src = "img/thumb_bone_3.png" alt="thumb bone 3">`,
        `<img class ="pic" src = "img/ulna_bone.png" alt="ulna">`
    ];
    const BEETLE =[
        `img/beetle_background.png`,
        `<a target="_blank" href="img/beetle_full.png">Hint</a>`,
        './sounds/beetle.mp3',
        `<img class ="pic" src = "img/top_arm_left.png" alt="1">`,
        `<img class ="pic" src = "img/top_arm_right.png" alt="2">`,
        `<img class ="pic" src = "img/body.png" alt="3">`,
        `<img class ="pic" src = "img/head.png" alt="4">`,
        `<img class ="pic" src = "img/bottom_arm_left.png" alt="5">`,
        `<img class ="pic" src = "img/bottom_arm_right.png" alt="6">`,
        `<img class ="pic" src = "img/middle_arm_left.png" alt="7">`,
        `<img class ="pic" src = "img/middle_arm_right.png" alt="8">`,
        `<img class ="pic" src = "img/wing_left.png" alt="9">`,
        `<img class ="pic" src = "img/wing_right.png" alt="11">`,
        `<img class ="pic" src = "img/wing_cover_left.png" alt="22">`,
        `<img class ="pic" src = "img/wing_cover_right.png" alt="33">`
    ];

 	window.onload = (e) => {randomPuzzle(); positionIMGS(); setupDragging();};

    function randomPuzzle()
    {
        let ranNum = Math.random();
        if(ranNum > .5){
            document.querySelector("#tray").style.height = "275px";
            document.querySelector("footer").style.marginTop = "805px";
            setupIMGS(HAND);
        }
        else{
            document.querySelector("#tray").style.height = "600px";
            document.querySelector("#tray").style.width = "850px";
            document.querySelector("footer").style.marginTop = "1130px";
            setupIMGS(BEETLE);
        }
    }

    function setupIMGS(puzzle)
    {
        for(let i = 3; i<puzzle.length; i++)
        {
            document.querySelector("#tray").innerHTML += puzzle[i];
        }
        document.querySelector("#board").style.backgroundImage=`url(../${puzzle[0]})`;
        document.querySelector("#sidetray").innerHTML += `${puzzle[1]}`;

        sound = new Audio(`${puzzle[2]}`);
    }
    function setPosition(word,wordLeft,wordTop)
    {
        word.style.left = wordLeft + "px";
        word.style.top = wordTop + "px";
        word.style.transform = `rotate(${(Math.random() - 0.5)* 10}deg)`;
    }
    function positionIMGS()
    {
        let doMouseDown = (e) => {
            e.preventDefault();
            sound.play();
            selectedElement = e.target;
            selectedElement.style.zIndex = MAX_Z_INDEX; 
        };
        let allIMGS = document.querySelectorAll(".pic");
        let imgSpacing = IMAGE_SPACING;
        let imgLeft = IMAGE_MARGIN;
        let imgTop = TRAY_POSITION.y;

        for(let image of allIMGS)
        {
            setPosition(image,imgLeft,imgTop)
            imgLeft += imgSpacing+image.naturalWidth;
            
            if(imgLeft>= MAX_IMAGE_LEFT)
            {
                imgLeft = IMAGE_MARGIN;
                imgTop += LINE_HEIGHT + image.naturalHeight;
            }
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