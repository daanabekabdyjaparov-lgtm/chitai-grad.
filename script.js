const searchInput = document.querySelector("#searchInput");
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".book-card");
const emptyState = document.querySelector("#emptyState");
let activeFilter = "all";

function updateBooks() {
  const query = searchInput.value.trim().toLocaleLowerCase("ru");
  let visibleCount = 0;
  cards.forEach((card) => {
    const matchesText = card.dataset.search.toLocaleLowerCase("ru").includes(query);
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const visible = matchesText && matchesCategory;
    card.hidden = !visible;
    if (visible) visibleCount++;
  });
  emptyState.hidden = visibleCount > 0;
}

searchInput.addEventListener("input", updateBooks);
filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    updateBooks();
  });
});

const flipButton = document.querySelector("#flipButton");
const rightPage = document.querySelector(".right-page");
const pageMessages = [
  "Переверните страницу.<br>Впереди целый мир.",
  "Каждая глава —<br>новое открытие.",
  "А теперь найдите<br>свою историю."
];
let pageIndex = 0;
flipButton.addEventListener("click", () => {
  pageIndex = (pageIndex + 1) % pageMessages.length;
  rightPage.querySelector("p").innerHTML = pageMessages[pageIndex];
  flipButton.textContent = pageIndex === pageMessages.length - 1 ? "Сначала ↶" : "Дальше →";
});
