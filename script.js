// Get today's date
const today = new Date();
console.log("Today's date:", today);

// Create a new date variable set to a custom date
const birthdayDate = new Date(today.getFullYear(), 0, 30); // Month is 0-indexed, so 1 is February
console.log("BirthdayDate:", birthdayDate);

// Calculate the difference in time between birthdayDate and today
const timeDifference = birthdayDate.getTime() - today.getTime();
const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
console.log("Days difference:", daysDifference);

// Calculate what door is today's door
const result = daysDifference - 30;
console.log(`Today's Door: ${result*-1}`);

// Select all door elements
const doors = document.querySelectorAll('.door');

// Assign the calculated date to each door element as a data attribute
doors.forEach(door => {
    const span = door.querySelector('span');
    const daysToSubtract = parseInt(span.textContent, 10); // Get the number from the span
    const calculatedDate = new Date(birthdayDate);
    calculatedDate.setDate(birthdayDate.getDate() - 30 + daysToSubtract); // Subtract the number of days
    const birthdayMinusDays = calculatedDate.toISOString().split('T')[0]; // Store the date in YYYY-MM-DD format
    door.dataset.birthdayMinusDays = birthdayMinusDays;

    // Check if the birthdayMinusDays date is before or after today
    const isFutureDate = calculatedDate > today;

    calculatedDate.setDate(calculatedDate.getDate() + 1); // Add 1 day to the calculated date

    if (calculatedDate < today) {
        door.dataset.isBeforeToday = 'true';
    } else {
        door.dataset.isBeforeToday = 'false';
    }
    
    door.dataset.isFutureDate = isFutureDate.toString();
    
    // check which is the correct door for today
    if (door.dataset.isFutureDate == 'false' && door.dataset.isBeforeToday === 'false') {
        console.log('Door', door.textContent, 'is a match');
        
    }
});

// Set the background image for doors where isBeforeToday is 'true'
doors.forEach(door => {
    if (door.dataset.isBeforeToday === 'true') {
        const bigImage = door.dataset.bigImage;
        door.style.backgroundImage = `url('${bigImage}')`;
        door.style.backgroundSize = "cover";
        door.style.color = "transparent"; // Hide the text
    }
});

// Select popup elements
const popup = document.getElementById("popup");
const popupImage = document.querySelector(".popup-image");
const closeBtn = document.getElementById("close-btn");

var currentDoor = null; // Store the clicked door for later

// Function to open popup
function openPopup(event) {
    console.log("Open door clicked"); // Add this line for debugging

    let clickedDoor = event.target;
    console.log("Element clicked:", clickedDoor); // Add this line for debugging

    // Check if the event target is a span element
    if (clickedDoor.tagName.toLowerCase() === 'span') {
        clickedDoor = clickedDoor.parentElement; // Assign clickedDoor to the parent element (the door)
    }
    console.log("Door clicked:", clickedDoor); // Add this line for debugging

    // check if the current door's date is a future date
    var bigImage = clickedDoor.dataset.bigImage;
    if (clickedDoor.dataset.isFutureDate === 'true') {
      bigImage= 'images/no-no-no.gif'; // set the image to nonono image
    } else {
      bigImage = clickedDoor.dataset.bigImage; // Get big image URL from the data attribute
    };

    console.log("Image URL: ", bigImage); // Add this line for debugging

    popupImage.src = bigImage; // Set the big image as the background image
    console.log("Popup image updated:", popupImage); // Add this line for debugging
    popup.classList.remove("hidden"); // unhide the popup

    // Update door when popup is closed
    currentDoor = clickedDoor; // Store the clicked door for later
    console.log("Door updated::", currentDoor); // Add this line for debugging
}

function closePopup() {
    console.log("Close button clicked");
    console.log("Current door before close:", currentDoor);

    // Check if currentDoor exists
    if (currentDoor) {

      const bigImage = popupImage.getAttribute('src'); // Get the big image URL
      console.log("Retrieved Backgroundimage:", bigImage); // Add this line for debugging

      // Clear existing content and add the bigImage as an <img>
      console.log("BigImage src", bigImage);
      currentDoor.style.backgroundImage = `url('${bigImage}')`;
      currentDoor.style.backgroundSize = "cover";

      currentDoor.style.color = "transparent"; // Hide the text

      console.log("Updated door content with <img>:", currentDoor);
    } else {
      console.error("No door found to update.");
    }
  
    // Hide the popup
    popup.classList.add("hidden");
    currentDoor = null; // Clear the reference
    console.log("Popup closed and current door cleared.");
}

// Attach event listeners to doors
document.querySelectorAll(".door").forEach((door) => {
  door.addEventListener("click", openPopup);
});

// Attach event listener to close button
closeBtn.addEventListener("click", closePopup);