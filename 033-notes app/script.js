const addButton = document.getElementById("add");
const notes = JSON.parse(localStorage.getItem("notes"));

const updateLocalStorage = () => {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];
  notesText.forEach((note) => notes.push(note.value));
  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
  <div class="tools">
        <button class="edit"><em class="fas fa-edit"></em></button>
        <button class="delete"><em class="fas fa-trash-alt"></em></button>
  </div>
  <div class="main ${text ? "" : "hidden"}"></div>
  <textarea class="${text ? "hidden" : ""}"></textarea>`;

  const editButton = note.querySelector(".edit");
  const deleteButton = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");
  textArea.value = text;
  main.innerHTML = marked(text);

  deleteButton.addEventListener("click", () => {
    note.remove();
    updateLocalStorage();
  });
  editButton.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });
  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);
    updateLocalStorage();
  });
  document.body.appendChild(note);
};

addButton.addEventListener("click", () => addNewNote());

if (notes) {
  notes.forEach((note) => addNewNote(note));
}
