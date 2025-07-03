const openButton = document.getElementById("open-sidebar-button");
const navbar = document.getElementById("navbar");

function openSidebar() {
  navbar.classList.add("show");
}

function closeSidebar() {
  navbar.classList.remove("show");
}

// ===========================

function renderRating(value, color) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars += `<i class="fas fa-star" style="color:${color}"></i>`;
    } else if (value >= i - 0.5) {
      stars += `<i class="fas fa-star-half-alt" style="color:${color}"></i>`;
    } else {
      stars += `<i class="far fa-star" style="color:${color}"></i>`;
    }
  }
  return `<div class="rating">${stars}</div>`;
}
// --- New jQuery Code for Equipment Grid and Modal ---
$(document).ready(function () {
  let equipmentData = []; // To store the fetched equipment data

  // 1. Fetch data and display equipment grid
  $.getJSON("equipments.json", function (data) {
    equipmentData = data;
    const equipmentList = $("#equipment-list");

    // Loop through each equipment item and create a card
    $.each(equipmentData, function (index, item) {
      const ratingHTML = renderRating(item.rating, "#f8e825");
      const equipmentCard = `
        <div class="equipment-card" data-id="${item.id}">
          <img class="image" src="${item.image}" alt="${item.name}">
          <div class="equipment-card-name">${item.name}</div>
          ${ratingHTML}
          <div class="equipment-card-name">Price: ${item.price}</div>
        </div>
      `;
      equipmentList.append(equipmentCard);
    });
  });

  // 2. Handle click on an equipment card to open the modal
  $("#equipment-list").on("click", ".equipment-card", function () {
    const equipmentId = $(this).data("id");

    // Find the equipment item that was clicked
    const selectedEquipment = equipmentData.find(
      (item) => item.id === equipmentId
    );

    if (selectedEquipment) {
      // Populate the modal with the item's details
      // const modalBody = `
      //   <h2>${selectedEquipment.name}</h2>
      //   <img src="${selectedEquipment.image}" alt="${selectedEquipment.name}">
      //   <p class="price">$${selectedEquipment.price.toFixed(2)}</p>
      //   <p>${selectedEquipment.description}</p>
      //   <video width="100%" controls>
      //     <source src="${selectedEquipment.video}" type="video/mp4">
      //     Your browser does not support the video tag.
      //   </video>
      // `;
      let currentIndex = 0;
      const images = selectedEquipment.images;

      const modalBody = `
        <h2>${selectedEquipment.name}</h2>
        <div class="slider-container">
          <button class="prev-slide">❮</button>
          <img id="slider-image" src="${selectedEquipment.images[0]}" alt="${
        selectedEquipment.name
      }">
          <button class="next-slide">❯</button>
        </div>
        <p class="price">$${selectedEquipment.price.toFixed(2)}</p>
        <p>${selectedEquipment.description}</p>
        <video width="100%" controls>
          <source src="${selectedEquipment.video}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        
        
      $("#modal-body").html(modalBody);
      $("#equipment-modal").css("display", "block");
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

      $("#modal-body").html(modalBody);
      $("#equipment-modal").css("display", "block");

      $(".prev-slide").on("click", function () {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        $("#slider-image").attr("src", images[currentIndex]);
      });

      $(".next-slide").on("click", function () {
        currentIndex = (currentIndex + 1) % images.length;
        $("#slider-image").attr("src", images[currentIndex]);
      });

      const reservationKey = `reserved_${selectedEquipment.id}`;
      const existingReservation = localStorage.getItem(reservationKey);

      if (existingReservation) {
        $("#reservationForm").hide();
        $("#reservationMessage").html("⛔ This item is already reserved.");
      } else {
        $("#reservationForm").on("submit", function (e) {
          e.preventDefault();

          const name = $("#reserve-name").val().trim();
          const email = $("#reserve-email").val().trim();
          const phone = $("#reserve-phone").val().trim();

          if (!name || !email || !phone) {
            alert("Please fill out all fields.");
            return;
          }

          const reservation = {
            itemId: selectedEquipment.id,
            name,
            email,
            phone,
            reservedAt: new Date().toISOString(),
          };

          localStorage.setItem(reservationKey, JSON.stringify(reservation));
          $("#reservationForm").hide();
          $("#reservationMessage").html(
            `✅ Reserved successfully! We'll contact you soon, ${name}.`
          );
        });
      }
    }
  });

  // 3. Handle closing the modal
  $(".close-button").on("click", function () {
    $("#equipment-modal").css("display", "none");
  });

  // Close modal if user clicks outside of the modal content
  $(window).on("click", function (event) {
    if ($(event.target).is("#equipment-modal")) {
      $("#equipment-modal").css("display", "none");
    }
  });
});

//Search box
$("#searchInput").on("input", function () {
  const query = $(this).val().toLowerCase();

  $(".equipment-card").each(function () {
    const name = $(this)
      .find(".equipment-card-name")
      .first()
      .text()
      .toLowerCase();
    const priceText = $(this)
      .find(".equipment-card-name")
      .last()
      .text()
      .toLowerCase();
    const features = $(this).data("features") || "";
    const rating = $(this).data("rating") || "";

    const fullText = `${name} ${priceText} ${features} ${rating}`;

    $(this).toggle(fullText.includes(query));
  });
});
