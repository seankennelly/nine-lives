const state = {
    catName: "",
};

function formatText(text) {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return state[key] ?? match;
    });
}

// RUN GAME
function showSection(sectionId, route = null) {
    const section = story[sectionId];

    const pixelArt = document.querySelector("#pixel-art");

    pixelArt.innerHTML = "";

    const image = document.createElement("img");

    image.src = `images/${section.image || "starting_cat.gif"}`;
    image.alt = "";

    pixelArt.appendChild(image);

    if (!section) {
        console.error(`Story section "${sectionId}" does not exist.`);
        return;
    }

    let text = section.text;

    if (typeof section.text === "object") {
        text = section.text[route];
    }

    const storyText = document.querySelector("#story-text");
    const choices = document.querySelector("#choices");

    choices.innerHTML = "";

    typeText(storyText, formatText(text), () => {
        // Text input node
        if (section.type === "input") {
            const input = document.createElement("input");
            const button = document.createElement("button");

            input.type = "text";
            input.placeholder = "Cat name";

            button.textContent = "Start";
            button.classList.add("input-button");

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
    });
}

// TYPED TEXT
let typingInterval = null;
let isTyping = false;

function typeText(element, text, onComplete = () => {}, speed = 50) {
    if (typingInterval) {
        clearInterval(typingInterval);
    }

    element.textContent = "";
    isTyping = true;

    let i = 0;

    function finishTyping() {
        if (!isTyping) {
            return;
        }

        clearInterval(typingInterval);
        typingInterval = null;
        isTyping = false;
        element.textContent = text;

        onComplete();
    }

    typingInterval = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;

        if (i >= text.length) {
            finishTyping();
        }
    }, speed);

    element.onclick = () => {
        if (isTyping) {
            finishTyping();
        }
    };
}

// INITIALISE GAME
showSection("title");
