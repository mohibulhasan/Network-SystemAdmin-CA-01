//
// === SIDEBAR CONTROL ===
// This section handles the functionality of the mobile sidebar navigation.
//

// Get the HTML elements for the open button and the navbar (sidebar)
const openButton = document.getElementById("open-sidebar-button");
const navbar = document.getElementById("navbar");

/**
 * Opens the sidebar by adding the "show" class to the navbar.
 * The "show" class is defined in the CSS to slide the sidebar into view.
 */
function openSidebar() {
  navbar.classList.add("show");
}

/**
 * Closes the sidebar by removing the "show" class from the navbar.
 * This slides the sidebar out of view, as defined in the CSS.
 */
function closeSidebar() {
  navbar.classList.remove("show");
}

//
// === STAR RATING DISPLAY ===
// This function generates the HTML for a star rating.
//

function renderRating(value, color) {
  let stars = "";
  // Loop through 5 stars to build the rating
  for (let i = 1; i <= 5; i++) {
    // Check if the current star should be a full star
    if (value >= i) {
      // Add a full star icon
      stars += `<i class="fas fa-star" style="color:${color}"></i>`;
    }
    // Check if the current star should be a half-star
    else if (value >= i - 0.5) {
      // Add a half-star icon
      stars += `<i class="fas fa-star-half-alt" style="color:${color}"></i>`;
    }
    // If neither, add an empty star
    else {
      stars += `<i class="far fa-star" style="color:${color}"></i>`;
    }
  }
  // Wrap the stars in a div with the 'rating' class
  return `<div class="rating">${stars}</div>`;
}

//
// === JQUERY DOCUMENT READY BLOCK ===
// This code runs once the entire HTML document is fully loaded.
// It handles fetching data, rendering cards, modals, and event listeners.
//

$(document).ready(function () {
  // Array to hold the equipment data fetched from the JSON file
  let equipmentData = [];

  //
  // === LOAD AND DISPLAY EQUIPMENT CARDS ===
  //

  // Use jQuery's getJSON to fetch data from the `equipments.json` file
  $.getJSON("equipments.json", function (data) {
    // Store the fetched data in the `equipmentData` variable
    equipmentData = data;
    // Get the container where equipment cards will be appended
    const equipmentList = $("#equipment-list");

    // Loop through each item in the `equipmentData` array
    $.each(equipmentData, function (index, item) {
      // Generate the HTML for the star rating using the `renderRating` function
      const ratingHTML = renderRating(item.rating, "#f8e825");
      // Get the first image from the `images` array, or use a default if not available
      const firstImage =
        Array.isArray(item.images) && item.images.length > 0
          ? item.images[0]
          : "contents/assets/Adjustable-Dumbbell1.png";

      // Create the HTML string for a single equipment card using a template literal
      const equipmentCard = `
        <div class="equipment-card" data-id="${item.id}">
          <img class="image" src="${firstImage}" alt="${item.name}">
          <div class="equipment-card-name">${item.name}</div>
          ${ratingHTML}
          <div class="equipment-card-name">Price: ${item.price}</div>
        </div>
      `;
      // Append the newly created card HTML to the equipment list container
      equipmentList.append(equipmentCard);
    });
  });

  //
  // === ITEM CLICK: OPEN MODAL ===
  // This section handles the logic for opening the modal when an equipment card is clicked.
  //

  // Attach a click event listener to all `.equipment-card` elements within `#equipment-list`
  $("#equipment-list").on("click", ".equipment-card", function () {
    // Get the unique ID of the clicked equipment card from its `data-id` attribute
    const equipmentId = $(this).data("id");
    // Find the corresponding equipment object from the `equipmentData` array
    const selectedEquipment = equipmentData.find(
      (item) => item.id === equipmentId
    );
    // If no equipment is found, exit the function
    if (!selectedEquipment) return;

    // Get the array of images, or use a default if it's not an array or is empty
    let images = Array.isArray(selectedEquipment.images)
      ? selectedEquipment.images
      : [];
    if (!images.length) images = ["contents/assets/Adjustable-Dumbbell1.png"];

    // Define the key for the item's reservation status in local storage
    const reservationKey = `reserved_${selectedEquipment.id}`;
    // Check if a reservation for this item already exists in local storage
    const existingReservation = localStorage.getItem(reservationKey);

    // Create the HTML content for the modal body using a template literal
    const modalBody = `
      <h2>${selectedEquipment.name}</h2>
      <div class="slider-container">
        <button class="prev-slide">❮</button>
        <img id="slider-image" src="${images[0]}" alt="${
      selectedEquipment.name
    }">
        <button class="next-slide">❯</button>
      </div>
      <p class="rating"> ${renderRating(
        selectedEquipment.rating,
        "#f8e825"
      )}</p>
      <p class="price">$${selectedEquipment.price.toFixed(2)}</p>
      <p><strong>Description:</strong> ${selectedEquipment.description}</p></br>
      <video width="100%" controls>
        <source src="${selectedEquipment.video}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div id="reservationSection">
        <h3>Reserve This Item</h3>
        <form id="reservationForm">
          <input type="text" id="reserve-name" placeholder="Your Name" required />
          <input type="email" id="reserve-email" placeholder="Your Email" required />
          <input type="tel" id="reserve-phone" placeholder="Phone Number" required />
          <button type="submit">Reserve</button>
        </form>
        <div id="reservationMessage" style="margin-top: 10px;"></div>
      </div>
    `;

    // Populate the modal body with the generated HTML
    $("#modal-body").html(modalBody);
    // Make the modal visible by changing its display style to "block"
    $("#equipment-modal").css("display", "block");

    //
    // === IMAGE SLIDER LOGIC ===
    // This part handles the functionality of the image carousel within the modal.
    //

    // Initialize the index for the current image in the slider
    let currentIndex = 0;

    // Attach a click event listener to the "previous" button.
    // `.off("click")` is used to remove any previous handlers to prevent multiple bindings.
    $(".prev-slide").off("click").on("click", function () {
        // Decrement the index, wrapping around to the end of the array if it goes below 0
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        // Update the `src` attribute of the image to show the new image
        $("#slider-image").attr("src", images[currentIndex]);
      });

    // Attach a click event listener to the "next" button.
    // `.off("click")` is used to remove any previous handlers to prevent multiple bindings.
    $(".next-slide").off("click").on("click", function () {
        // Increment the index, wrapping around to the beginning of the array if it goes past the end
        currentIndex = (currentIndex + 1) % images.length;
        // Update the `src` attribute of the image to show the new image
        $("#slider-image").attr("src", images[currentIndex]);
      });

    //
    // === RESERVATION LOGIC ===
    // This section handles checking and processing item reservations.
    //

    // Check if the item is already reserved
    if (existingReservation) {
      // If reserved, hide the reservation form
      $("#reservationForm").hide();
      // Display a message indicating the item is already reserved
      $("#reservationMessage").text("⛔ This item has already been reserved.");
    } else {
      // If not reserved, attach a submit event listener to the reservation form
      $("#reservationForm").on("submit", function (e) {
        // Prevent the default form submission behavior (i.e., page reload)
        e.preventDefault();
        // Get the values from the form inputs and trim any whitespace
        const name = $("#reserve-name").val().trim();
        const email = $("#reserve-email").val().trim();
        const phone = $("#reserve-phone").val().trim();

        // Validate that all fields are filled
        if (!name || !email || !phone) {
          alert("Please fill out all fields.");
          return; // Stop the function if validation fails
        }

        // Create a reservation object with the form data and a timestamp
        const reservation = {
          id: selectedEquipment.id,
          name,
          email,
          phone,
          reservedAt: new Date().toISOString(),
        };

        // Save the reservation object to local storage, converting it to a JSON string
        localStorage.setItem(reservationKey, JSON.stringify(reservation));
        // Hide the reservation form after successful submission
        $("#reservationForm").hide();
        // Display a success message to the user
        $("#reservationMessage").text(
          `✅ ${selectedEquipment.name} reserved successfully. Thank you, ${name}!`
        );
      });
    }
  });

  //
  // === MODAL CLOSE LOGIC ===
  // This section handles closing the modal pop-up.
  //

  // Attach a click event listener to the close button inside the modal
  $(".close-button").on("click", function () {
    // Hide the modal by setting its display style to "none"
    $("#equipment-modal").hide();
  });

  // Attach a click event listener to the entire window
  $(window).on("click", function (event) {
    // Check if the clicked element is the modal overlay itself (not the content inside it)
    if ($(event.target).is("#equipment-modal")) {
      // If it is, hide the modal
      $("#equipment-modal").hide();
    }
  });

  //
  // === SEARCH FILTER LOGIC ===
  // This section handles the live search functionality.
  //

  // Attached an "input" event listener to the search input field
  $("#searchInput").on("input", function () {
    // Get the current value of the input and convert it to lowercase for case-insensitive searching
    const query = $(this).val().toLowerCase();
    // Iterate over each equipment card on the page
    $(".equipment-card").each(function () {
      // Find the name of the equipment card and convert it to lowercase
      const name = $(this)
        .find(".equipment-card-name")
        .first()
        .text()
        .toLowerCase();
      // Show or hide the card based on whether its name includes the search query
      $(this).toggle(name.includes(query));
    });
  });
});
