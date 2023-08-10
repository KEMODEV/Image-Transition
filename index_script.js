// Stores the viewpoint status on page
// By default is false to stop transitions when the page first loads
let vpStatus = false;
let intervalId;
let pauseImageIndex = null;

// Selects all <a> elements with the class '.image-area'
const image_boxes = document.querySelectorAll('.image-area');

// Loops through each '.image-area' element
image_boxes.forEach(image_box => {
    // Select all elements with the class '.image-class' within the current '.image-area'
    let images = image_box.querySelectorAll(".image-class");
    let cur = 0;
    let prevCur = cur; // Stores the previous image index
    let transitioning = false; // Tracks if a transition is ongoing
    //let pausedImage;

    // Add 'mouseover' event listener to the current '.image-area' element
    image_box.addEventListener('mouseover', function () {
        // Check if viewport status is not true and no ongoing transition
        /*
            If viewport and transitioning is not true when mouse is over the
            image_box, then they are turned on so the images can transition
        */
        if (!vpStatus && !transitioning) {
            vpStatus = true;
            startImageTransition(images, cur, prevCur);
            /*
            // If the current image is not the first image (cur != 0)
            if (images[cur] != 0) {
                pausedImage = images[cur]; // Store the current image as the paused image
                startImageTransition(images, pausedImage, prevCur); // Start transition from paused image
            }
            else {
                startImageTransition(images, cur, prevCur); // Start transition normally
            }
            */
        }
    });

    // Adds 'mouseout' event listener to the current '.image-area' element
    image_box.addEventListener('mouseout', function () {
        /* 
            Same as previous in 'mouseover' but stops the tranitioning 
            when the mouse is not over the area anymore
        */
        if (vpStatus) {
            vpStatus = false;
            clearInterval(intervalId); // Clear the interval to stop transitions
        }
    });

    // Initializes the opacity of the first image within the current '.image-area'
    images[cur].style.opacity = 1;
});

// Starts the image transition when called
function startImageTransition(images, cur, prevCur) {
    if (cur != 0) {
        pauseImageIndex = cur;
    }
    clearInterval(intervalId); // Clears any existing interval

    // If viewport status is true, set up the interval
    if (vpStatus) {
        if (pauseImageIndex !== null) {
            intervalId = setInterval(changeImage, 2500, images, pauseImageIndex, prevCur);
            pauseImageIndex = null;
        }
        else {
            intervalId = setInterval(changeImage, 2500, images, cur, prevCur);
        }
    }
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
