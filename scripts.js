function showForm(type) {
    const landingPage = document.getElementById("landingPage");
    const form = document.getElementById("verificationForm");
    const formTitle = document.getElementById("formTitle");
    const autoFields = document.getElementById("autoFields");
    const resCommFields = document.getElementById("resCommFields");

    landingPage.style.display = "none";
    form.style.display = "block";

    if (type === "auto") {
        formTitle.textContent = "Auto";
        autoFields.style.display = "block";
        resCommFields.style.display = "none";
    } else if (type === "residential" || type === "commercial") {
        formTitle.textContent =
            type === "residential" ? "Residential" : "Commercial";
        autoFields.style.display = "none";
        resCommFields.style.display = "block";
    }
}

function goBack() {
    document.getElementById("landingPage").style.display = "block";
    document.getElementById("verificationForm").style.display = "none";
}

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function createCalendar(type) {
    const calendar = document.getElementById(`${type}Calendar`);
    calendar.innerHTML = `
    <div class="calendarHeader">
      <span>
        <select id="${type}Month" onchange="updateCalendar('${type}')"></select>
        <select id="${type}Year" onchange="updateCalendar('${type}')"></select>
      </span>
    </div>
    <div class="calendarGrid" id="${type}Grid"></div>
  `;

    const monthSelect = document.getElementById(`${type}Month`);
    const yearSelect = document.getElementById(`${type}Year`);

    months.forEach((month, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 100; year <= currentYear + 100; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    const currentDate = new Date();
    monthSelect.value = currentDate.getMonth();
    yearSelect.value = currentYear;

    updateCalendar(type);
}

function updateCalendar(type) {
    const monthSelect = document.getElementById(`${type}Month`);
    const yearSelect = document.getElementById(`${type}Year`);
    const grid = document.getElementById(`${type}Grid`);

    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    grid.innerHTML = "";

    for (let i = 0; i < firstDay.getDay(); i++) {
        grid.appendChild(document.createElement("div"));
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayElement = document.createElement("div");
        dayElement.textContent = day;
        dayElement.classList.add("calendarDay");
        dayElement.onclick = () => selectDate(type, year, month, day);
        grid.appendChild(dayElement);
    }
}

function selectDate(type, year, month, day) {
    const input = document.getElementById(`${type}Date`);
    input.value = `${month + 1}/${day}/${year}`;
    toggleCalendar(type);
}

function toggleCalendar(type) {
    const calendar = document.getElementById(`${type}Calendar`);
    calendar.classList.toggle("calendarHidden");
}

function handleFileUpload(input) {
    const filePreview = input.nextElementSibling;
    const fileName = filePreview.querySelector(".fileName");

    if (input.files.length > 0) {
        fileName.textContent = input.files[0].name;
        filePreview.classList.remove("hidden");
    } else {
        filePreview.classList.add("hidden");
    }
}

function clearFileInput(button) {
    const filePreview = button.parentElement;
    const fileInput = filePreview.previousElementSibling;

    fileInput.value = "";
    filePreview.classList.add("hidden");
}

function toggleOwnerFields(value) {
    const ownerFields = document.getElementById("ownerFields");
    ownerFields.classList.toggle("hidden", value === "myself" || value === "");
}

document.addEventListener("DOMContentLoaded", () => {
    createCalendar("today");
    createCalendar("birth");

    document
        .getElementById("todayDate")
        .addEventListener("click", () => toggleCalendar("today"));
    document
        .getElementById("birthDate")
        .addEventListener("click", () => toggleCalendar("birth"));
});
