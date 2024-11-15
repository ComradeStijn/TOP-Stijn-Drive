const dialog = document.querySelector("#add-item-modal");
const toggleButton = document.querySelector("#add-item-btn");
const html = document.querySelector("html");
const animationDuration = 400;

toggleButton.addEventListener("click", () => {
  html.classList.add("modal-is-open", "modal-is-opening");
  dialog.showModal();

  setTimeout(() => {
    html.classList.remove("modal-is-opening");
    document.addEventListener("click", modalCloser);
  }, animationDuration);
  const closeButton = dialog.querySelector('#close-modal');
  closeButton.addEventListener('click', () => dialog.close());
});

function modalCloser(e) {
  const article = dialog.querySelector("article");
  if (!article.contains(e.target)) {
    html.classList.remove("modal-is-open");
    dialog.close();
    e.currentTarget.removeEventListener("click", modalCloser);
  }
}

