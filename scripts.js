// Add at the beginning of the file
window.fbAsyncInit = function () {
  FB.init({
    appId: "YOUR_APP_ID", // You'll need to create a Facebook App and get an App ID
    cookie: true,
    xfbml: true,
    version: "v18.0",
  });

  // Fetch latest post
  FB.api(
    "/293518002913205/feed", // Your group ID
    "GET",
    { fields: "message,created_time,full_picture,permalink_url", limit: "1" },
    function (response) {
      if (response && !response.error) {
        displayLatestPost(response.data[0]);
      } else {
        document.getElementById("fbLatestPost").innerHTML =
          '<p class="error">לא ניתן לטעון את המודעה האחרונה כרגע</p>';
      }
    }
  );
};

function displayLatestPost(post) {
  const container = document.getElementById("fbLatestPost");
  if (!post) {
    container.innerHTML = '<p class="error">אין מודעות זמינות כרגע</p>';
    return;
  }

  const postDate = new Date(post.created_time).toLocaleDateString("he-IL");
  const html = `
        <div class="fb-post">
            ${
              post.full_picture
                ? `<img src="${post.full_picture}" alt="תמונת המודעה">`
                : ""
            }
            <p class="post-message">${post.message}</p>
            <div class="post-meta">
                <span class="post-date">${postDate}</span>
                <a href="${
                  post.permalink_url
                }" target="_blank" class="view-on-fb">
                    צפה בפייסבוק <i class="fab fa-facebook"></i>
                </a>
            </div>
        </div>
    `;
  container.innerHTML = html;
}

// טיפול בבחירת חבילה
document.querySelectorAll('input[name="package"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    // עדכון הצגת החבילה הנבחרת
    const selectedPackage = document.getElementById("selectedPackage");
    selectedPackage.textContent = e.target.value;
    selectedPackage.classList.add("active");

    // הדגשת השורה הנבחרת בטבלה
    document.querySelectorAll(".pricing-table tr").forEach((tr) => {
      tr.classList.remove("selected");
    });
    e.target.closest("tr").classList.add("selected");
  });
});

// טיפול בשליחת הטופס לוואטסאפ
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;
  const selectedPackage =
    document.getElementById("selectedPackage").textContent;

  if (selectedPackage === "טרם נבחרה חבילה") {
    alert("נא בחור חבילת פרסום");
    return;
  }

  // בניית הודעת וואטסאפ
  const whatsappMessage = `
שלום, אשמח להזמין פרסום:
    
שם: ${name}
טלפון: ${phone}
חבילה: ${selectedPackage}
${message ? `הערות: ${message}` : ""}
    `;

  // יצירת הקישור לוואטסאפ
  const whatsappLink = `https://wa.me/972543285967?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  // פתיחת וואטסאפ
  window.open(whatsappLink, "_blank");

  // איפוס הטופס
  this.reset();
  document.getElementById("selectedPackage").textContent = "טרם נבחרה חבילה";
  document.getElementById("selectedPackage").classList.remove("active");
  document.querySelectorAll(".pricing-table tr").forEach((tr) => {
    tr.classList.remove("selected");
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Scroll Progress Indicator
window.addEventListener("scroll", () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.querySelector(".scroll-progress-bar").style.width = scrolled + "%";
});

// FAQ Accordion
document.querySelectorAll(".faq-item").forEach((item) => {
  const answer = item.querySelector("p");
  answer.style.display = "none";

  item.addEventListener("click", () => {
    const isOpen = answer.style.display === "block";

    // Close all other answers
    document.querySelectorAll(".faq-item p").forEach((p) => {
      p.style.display = "none";
    });

    // Toggle current answer
    answer.style.display = isOpen ? "none" : "block";

    // Animate
    if (!isOpen) {
      answer.style.opacity = "0";
      answer.style.transform = "translateY(-10px)";
      setTimeout(() => {
        answer.style.transition = "all 0.3s ease";
        answer.style.opacity = "1";
        answer.style.transform = "translateY(0)";
      }, 0);
    }
  });
});

// Form Field Enhancement
document
  .querySelectorAll(".form-group input, .form-group textarea")
  .forEach((field) => {
    field.addEventListener("focus", (e) => {
      e.target.parentElement.classList.add("focused");
    });

    field.addEventListener("blur", (e) => {
      if (!e.target.value) {
        e.target.parentElement.classList.remove("focused");
      }
    });
  });

// Add scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document
  .querySelectorAll(".benefit-card, .special-offer, .pricing-table")
  .forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
  });

// טיימר למבצע
function updateTimer() {
  const endDate = new Date("December 31, 2024 23:59:59").getTime();

  function update() {
    const now = new Date().getTime();
    const distance = endDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer-days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("timer-hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("timer-minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("timer-seconds").textContent = seconds
      .toString()
      .padStart(2, "0");

    // הוספת אפקט דחיפות כשנשאר פחות משבוע
    const timerDisplay = document.querySelector(".timer-display");
    if (days < 7) {
      timerDisplay.classList.add("timer-urgent");
    }

    if (distance < 0) {
      clearInterval(timerInterval);
      document.querySelector(".offer-timer").innerHTML =
        '<div class="timer-title">המבצע הסתיים</div>';
    }
  }

  update();
  const timerInterval = setInterval(update, 1000);
}

// הפעלת הטיימר
updateTimer();

// עדכון הפונקציונליות של כפתור "נצל את ההטבה"
document
  .querySelector(".special-offer .cta-button")
  .addEventListener("click", function (e) {
    e.preventDefault();

    // בחירה אוטומטית של חבילת המבצע
    const specialOfferRadio = document.querySelector(
      'input[name="package"][value="5 מודעות - 200 ש״ח"]'
    );
    if (specialOfferRadio) {
      specialOfferRadio.checked = true;

      // הפעלת אירוע change ידנית כדי לעדכן את הטופס
      const event = new Event("change");
      specialOfferRadio.dispatchEvent(event);
    }

    // גלילה לטופס
    const contactForm = document.getElementById("contact");
    contactForm.scrollIntoView({ behavior: "smooth" });

    // הדגשת הטופס
    const formContainer = document.querySelector(".form-container");
    formContainer.style.animation = "highlight 1s ease";
  });

// הוספת אנימצית הדגשה
const style = document.createElement("style");
style.textContent = `
    @keyframes highlight {
        0% { transform: scale(1); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
        50% { transform: scale(1.02); box-shadow: 0 15px 40px rgba(26, 115, 232, 0.2); }
        100% { transform: scale(1); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
    }
`;
document.head.appendChild(style);
