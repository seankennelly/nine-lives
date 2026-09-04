const state = {
  catName: "",
};

function formatText(text) {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return state[key] ?? match;
  });
}

function showSection(sectionId, route = null) {
  const section = story[sectionId];

  if (!section) {
    console.error(`Story section "${sectionId}" does not exist.`);
    return;
  }

  let text = section.text;

  if (typeof section.text === "object") {
    text = section.text[route];
  }

  document.querySelector("#story-text").textContent = formatText(text);

  const choices = document.querySelector("#choices");
  choices.innerHTML = "";

  // Text input node
  if (section.type === "input") {
    const input = document.createElement("input");
    const button = document.createElement("button");

    input.type = "text";
    input.placeholder = "Cat name";

    button.textContent = "Continue";

    button.addEventListener("click", () => {
      state[section.inputKey] = input.value.trim() || "Cat";

      showSection(section.next);
    });

    choices.appendChild(input);
    choices.appendChild(button);

    return;
  }

  // Ending node
  if (section.type === "ending") {
    const button = document.createElement("button");

    button.textContent = "Start again";

    button.addEventListener("click", () => {
      showSection("start");
    });

    choices.appendChild(button);

    return;
  }

  // Normal choice node
  section.choices.forEach((choice) => {
    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", () => {
      showSection(choice.next, choice.route);
    });

    choices.appendChild(button);
  });
}

showSection("name_cat");
