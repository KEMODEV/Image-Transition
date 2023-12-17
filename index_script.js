// By default is false to stop transitions when the page first loads
let vpStatus = false;
let intervalId;
let firstInterval = true;
const image_boxes = document.querySelectorAll('.image-area');

// Loops through each '.image-area' element
image_boxes.forEach(image_box => {
    let images = image_box.querySelectorAll('.image-class');
    let cur = 0; // Stores the current image index
    let prevCur = cur; // Stores the previous image index
    let transitioning = false; // Tracks if a transition is ongoing

    image_box.addEventListener('mouseover', function () {
        /*
            If not true while hovering over, 
            then viewport becomes true so images can begin 
        */
        if (!vpStatus && !transitioning) {
            vpStatus = true;
            startImageTransition(images, cur, prevCur);
        }
    });

    image_box.addEventListener('mouseout', function () {
        // Stops the transition when the mouse is not over the image-area anymore
        if (vpStatus) {
            vpStatus = false;
            clearInterval(intervalId);
            resetImageTransition(images, cur);
        }
    });

    // Initializes the opacity of the first image within the current '.image-area'
    images[cur].style.opacity = 1;
});

// Starts the image transitioning
function startImageTransition(images, cur, prevCur) {
    clearInterval(intervalId); // Clears any active intervals

    if (vpStatus) {
        if (firstInterval) {
            intervalId = setInterval(changeImage, 1250, images, cur, prevCur);
            firstInterval = false;
        }
        else {
            intervalId = setInterval(changeImage, 2500, images, cur, prevCur);
        }
    }
}

// Changes the current image
async function changeImage(images, cur, prevCur) {
    let nextImage = (cur + 1) % images.length;
    // Changes opacities to fade into the next image
    images[cur].style.opacity = 0; 
    images[nextImage].style.opacity = 1; 

    prevCur = cur; // Stores the current index as the previous index
    cur = nextImage; // Updates current image index

    startImageTransition(images, cur, prevCur);
}


function resetImageTransition(images) {
    clearInterval(intervalId);
    images.forEach(image => {
        image.style.opacity = 0;
    });

    cur = 0;
    images[cur].style.opacity = 1;

    // Start the transition again if viewport status is true
    if (vpStatus) {
        startImageTransition(images, cur, cur); 
    }
}
