document.addEventListener("DOMContentLoaded", () => {
  const noteInput = document.querySelector(".noteInput");
  const saveNoteButton = document.querySelector(".saveNote");
  const notesContainer = document.querySelector(".notesContainer");

  loadNotes();

  saveNoteButton.addEventListener("click", () => {
    const noteText = noteInput.value;
    if (noteText) {
      const notes = getNotes();
      notes.push(noteText);
      localStorage.setItem("notes", JSON.stringify(notes));
      noteInput.value = "";
      loadNotes();
    }
  });

  function loadNotes() {
    const notes = getNotes();
    notesContainer.innerHTML = "";
    notes.forEach((note, index) => {
      const noteDiv = document.createElement("div");
      noteDiv.classList.add("note");
      noteDiv.innerHTML = `
                  <p>${note}</p>
                  <button class="delete-btn" data-index="${index}">-</button>
              `;

      notesContainer.append(noteDiv);
    });
    addDeleteEventListeners();
  }

  function getNotes() {
    const notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : [];
  }

  function addDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        deleteNote(index);
      });
    });
  }

  function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
  }
});


//I GOT HELP FOR JS PART AND IT IS NOT MY OWN PURE CODE :)