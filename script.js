// Select popup elements
const popup = document.getElementById("popup");
const popupImage = document.querySelector(".popup-image");
const closeBtn = document.getElementById("close-btn");

var currentDoor = null; // Store the clicked door for later

// Function to open popup
function openPopup(event) {
    console.log("Open door clicked"); // Add this line for debugging

    const clickedDoor = event.target;
    console.log("Door clicked:", clickedDoor); // Add this line for debugging

    const bigImage = clickedDoor.dataset.bigImage; // Get big image URL from the data attribute
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

      //const bigImageUrl = bigImage.slice(5, -2); // Extract the URL from the `backgroundImage` style
      //console.log("Extracted URL:", bigImageUrl); // Add this line for debugging

      // Clear existing content and add the bigImage as an <img>
      console.log("BigImage src", bigImage);
      currentDoor.style.backgroundImage = `url('${bigImage}')`;
      currentDoor.style.backgroundSize = "cover";

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