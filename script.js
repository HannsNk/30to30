// Select popup elements
const popup = document.getElementById("popup");
const popupImage = document.querySelector(".popup-image");
const closeBtn = document.getElementById("close-btn");

var currentDoor = null; // Store the clicked door for later

// Function to open popup
function openPopup(event) {

    console.log("Open door clicked"); // Add this line for debugging

    const door = event.target;

    console.log("Door clicked:", door); // Add this line for debugging

    const bigImage = door.dataset.bigImage; // Get big image URL from the data attribute
    popupImage.style.backgroundImage = `url('${bigImage}')`;
    popup.classList.remove("hidden");

    // Update door when popup is closed
    currentDoor = door; // Store the clicked door for later
    console.log("Door updated::", currentDoor); // Add this line for debugging
}

function closePopup() {
    console.log("Close button clicked");
    console.log("Current door before close:", currentDoor);
  
    // Check if currentDoor exists
    if (currentDoor) {
      const bigImage = popupImage.style.backgroundImage; // Get the big image URL
      const bigImageUrl = bigImage.slice(5, -2); // Extract the URL from the `backgroundImage` style
  
      // Clear existing content and add the bigImage as an <img>
      currentDoor.innerHTML = `<img src="${bigImageUrl}" alt="Door Image" class="door-image">`;
  
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
