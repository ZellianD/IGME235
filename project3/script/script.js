
    //image selected
    let selectedElement = null; 

    //consts for positioning
    const TRAY_POSITION = {x:50,y:530};
    const MAX_IMAGE_LEFT = 770;
    const LINE_HEIGHT = 30; 
    const IMAGE_MARGIN = 80;
    const MAX_Z_INDEX = 1000; 

    //sound 
    let sound;
    //placement array 
    let puzzle;

    //array for everything with the hand puzzle
    const HAND = [
        `img/bone_background.PNG`,
        `<a target="_blank" href="img/hand_full.PNG">Hint</a>`,
        `./sounds/bone.mp3`,
        `<img class ="pic" src = "img/hand_1.PNG" alt="hand 1">`,
        `<img class ="pic" src = "img/hand_2.PNG" alt="hand 2">`,
        `<img class ="pic" src = "img/hand_3.PNG" alt="hand 3">`,
        `<img class ="pic" src = "img/hand_4.PNG" alt="hand 4">`,
        `<img class ="pic" src = "img/hand_5.PNG" alt="hand 5">`,
        `<img class ="pic" src = "img/hand_6.PNG" alt="hand 6">`,
        `<img class ="pic" src = "img/hand_7.PNG" alt="hand 7">`,
        `<img class ="pic" src = "img/middle_bone_1.PNG" alt="middle bone 1">`,
        `<img class ="pic" src = "img/middle_bone_2.PNG" alt="middle bone 2">`,
        `<img class ="pic" src = "img/middle_bone_3.PNG" alt="middle bone 3">`,
        `<img class ="pic" src = "img/middle_bone_4.PNG" alt="middle bone 4">`,
        `<img class ="pic" src = "img/pinky_bone_1.PNG" alt="pinky bone 1">`,
        `<img class ="pic" src = "img/pinky_bone_2.PNG" alt="pinky bone 2">`,
        `<img class ="pic" src = "img/pinky_bone_3.PNG" alt="pinky bone 3">`,
        `<img class ="pic" src = "img/pinky_bone_4.PNG" alt="pinky bone 4">`,
        `<img class ="pic" src = "img/pointer_bone_1.PNG" alt="pointer bone 1">`,
        `<img class ="pic" src = "img/pointer_bone_2.PNG" alt="pointer bone 2">`,
        `<img class ="pic" src = "img/pointer_bone_3.PNG" alt="pointer bone 3">`,
        `<img class ="pic" src = "img/pointer_bone_4.PNG" alt="pointer bone 4">`,
        `<img class ="pic" src = "img/radius_bone.PNG" alt="radius">`,
        `<img class ="pic" src = "img/ring_bone_1.PNG" alt="ring bone 1">`,
        `<img class ="pic" src = "img/ring_bone_2.PNG" alt="ring bone 2">`,
        `<img class ="pic" src = "img/ring_bone_3.PNG" alt="ring bone 3">`,
        `<img class ="pic" src = "img/ring_bone_4.PNG" alt="ring bone 4">`,
        `<img class ="pic" src = "img/thumb_bone_1.PNG" alt="thumb bone 1">`,
        `<img class ="pic" src = "img/thumb_bone_2.PNG" alt="thumb bone 2">`,
        `<img class ="pic" src = "img/thumb_bone_3.PNG" alt="thumb bone 3">`,
        `<img class ="pic" src = "img/ulna_bone.PNG" alt="ulna">`
    ];

    //array for everything with the beetle puzzle
    const BEETLE =[
        `img/beetle_background.PNG`,
        `<a target="_blank" href="img/beetle_full.PNG">Hint</a>`,
        './sounds/beetle.mp3',
        `<img class ="pic" src = "img/top_arm_left.PNG" alt="arm 1">`,
        `<img class ="pic" src = "img/top_arm_right.PNG" alt="arm 2">`,
        `<img class ="pic" src = "img/body.PNG" alt="body">`,
        `<img class ="pic" src = "img/head.PNG" alt="head">`,
        `<img class ="pic" src = "img/bottom_arm_left.PNG" alt="arm 3">`,
        `<img class ="pic" src = "img/bottom_arm_right.PNG" alt="arm 4">`,
        `<img class ="pic" src = "img/middle_arm_left.PNG" alt="arm 5">`,
        `<img class ="pic" src = "img/middle_arm_right.PNG" alt="arm 6">`,
        `<img class ="pic" src = "img/wing_left.PNG" alt="wing 1">`,
        `<img class ="pic" src = "img/wing_right.PNG" alt="wing 2">`,
        `<img class ="pic" src = "img/wing_cover_left.PNG" alt="wing 3">`,
        `<img class ="pic" src = "img/wing_cover_right.PNG" alt="wing 4">`
    ];

    //when the window loads - pick a puzzle - position everything - allow stuff to be moved
 	window.onload = (e) => {randomPuzzle(); positionIMGS(); setupDragging();};

    // 50/50 chance for either puzzle to be picked as the display puzzled
    function randomPuzzle()
    {
        let ranNum = Math.random();
        if(ranNum > .5){
            puzzle = HAND;
            document.querySelector("#tray").style.height = "275px";
            document.querySelector("footer").style.marginTop = "805px";
        }
        else{
            puzzle = BEETLE;
            document.querySelector("#tray").style.height = "600px";
            document.querySelector("#tray").style.width = "850px";
            document.querySelector("footer").style.marginTop = "1130px";
        }
        //calls for the images to be set up
        setupIMGS();
    }

    //sets up the images into the html 
    function setupIMGS()
    {
        //starting at index 3 because 0,1,2 have other uses
        //adds all puzzle peices
        for(let i = 3; i<puzzle.length; i++)
        {
            document.querySelector("#tray").innerHTML += puzzle[i];
        }
        // index 0 is the background support image for the board 
        document.querySelector("#board").style.backgroundImage=`url(${puzzle[0]})`;
        //index 1 in the final image of what the puzzle should look like - this adds a link in the html for that
        document.querySelector("#sidetray").innerHTML += `${puzzle[1]}`;

        //each puzzle has a unique sound index 2 holds this file
        sound = new Audio(`${puzzle[2]}`);
    }
    
    //sets the absoulte position for each image
    function setPosition(img,imgLeft,imgTop)
    {
        img.style.left = imgLeft + "px";
        img.style.top = imgTop + "px";
        //applies a random rotation to add movement for the peices
        img.style.transform = `rotate(${(Math.random() - 0.5)* 10}deg)`;
    }

    //does the starting positions and updates
    function positionIMGS()
    {
        //allows for movement - plays the sound on click for movement 
        let doMouseDown = (e) => {
            e.preventDefault();
            sound.play();
            selectedElement = e.target;
            selectedElement.style.zIndex = MAX_Z_INDEX; 
        };

        //grabs all the images
        let allIMGS = document.querySelectorAll(".pic");
        let imgLeft = IMAGE_MARGIN;
        let imgTop = TRAY_POSITION.y;

        //starting position for each peice based on its size
        for(let image of allIMGS)
        {
            setPosition(image,imgLeft,imgTop)
            imgLeft += image.naturalWidth;
            
            //checks that its not outside the tray
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

    //handles dragging with mouse movement
    function setupDragging()
    {
        document.onmousemove = (e) => {
            e.preventDefault();
            //centers on mouse
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

    //gets mouse position
    function getMousePos(parentElement,event)
    {
        let rect = parentElement.getBoundingClientRect();
        return{
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
           };
    }