// Stores the viewpoint status on page
// By default is false to stop transitions when the page first loads
let vpStatus = false;
let intervalId;
let firstInterval = true;

// Selects all <a> elements with the class '.image-area'
const image_boxes = document.querySelectorAll('.image-area');

// Loops through each '.image-area' element
image_boxes.forEach(image_box => {
    // Select all elements with the class '.image-class' within the current '.image-area'
    let images = image_box.querySelectorAll('.image-class');
    let cur = 0;
    let prevCur = cur; // Stores the previous image index
    let transitioning = false; // Tracks if a transition is ongoing

    // Add 'mouseover' event listener to the current '.image-area' element
    image_box.addEventListener('mouseover', function () {
        // Check if viewport status is not true and no ongoing transition
        /*
            If viewport and transitioning is not true when mouse is over the
            image_box, then they are turned on so the images can transition
        */
        if (!vpStatus && !transitioning) {
            vpStatus = true;
            //firstInterval = true;
            startImageTransition(images, cur, prevCur); // Start transition normally
        }
    });

    // Adds 'mouseout' event listener to the current '.image-area' element
    image_box.addEventListener('mouseout', function () {
        /* 
            Same as previous in 'mouseover' but stops the transition
            when the mouse is not over the area anymore
        */
        if (vpStatus) {
            vpStatus = false;
            clearInterval(intervalId);
            resetImageTransition(images, cur);
        }
    });

    // Initializes the opacity of the first image within the current '.image-area'
    images[cur].style.opacity = 1;
});

// Starts the image transition when called
function startImageTransition(images, cur, prevCur) {
    clearInterval(intervalId); // Clears any existing interval

    // If viewport status is true, set up the interval
    if (vpStatus) {
        if (firstInterval) {
            intervalId = setInterval(changeImage, 1250, images, cur, prevCur);
            firstInterval = false;
            console.log(`firstIntervale works: ${firstInterval}`);
        }
        else {
            intervalId = setInterval(changeImage, 2500, images, cur, prevCur);
        }
    }
    /*if (vpStatus) {
        intervalId = setInterval(changeImage, 2500, images, cur, prevCur);
    }*/
}

// Changes the current image when called
async function changeImage(images, cur, prevCur) {
    let nextImage = (cur + 1) % images.length;

    // Changes opacity to transition to the next image
    images[cur].style.opacity = 0; // First by making the current image invisible
    images[nextImage].style.opacity = 1; // Then makes the upcoming image viewable

    prevCur = cur; // Stores the current index as the previous index
    cur = nextImage; // Updates current image index

    // Update the cur and prevCur indices to continue the transition
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
        startImageTransition(images, cur, cur); // Start transition from the first image
    }
}
