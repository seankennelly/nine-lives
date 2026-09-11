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

    if (!section) {
        console.error(`Story section "${sectionId}" does not exist.`);
        return;
    }

    const pixelArt = document.querySelector("#pixel-art");
    document.body.classList.toggle("ending", section.type === "ending");

    // Add ending decorations to pixel art
    pixelArt.classList.toggle("fireworks", section.decoration === "fireworks");
    pixelArt.classList.toggle("arrows", section.decoration === "arrows");
    
    const storyText = document.querySelector("#story-text");
    const choices = document.querySelector("#choices");

    // IMAGE
    pixelArt.innerHTML = "";

    const image = document.createElement("img");

    image.src = `images/${section.image || "starting_cat.gif"}`;
    image.alt = "";

    pixelArt.appendChild(image);

    // TEXT
    let text = section.text;

    if (typeof section.text === "object") {
        text = section.text[route];
    }

    const formattedText = formatText(text);

    // CONTROLS
    choices.innerHTML = "";
    choices.style.visibility = "hidden";

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
    }

    // Ending node
    else if (section.type === "ending") {
        const button = document.createElement("button");

        button.textContent = "Start again";

        button.addEventListener("click", () => {
            showSection("start");
        });

        choices.appendChild(button);
    }

    // Normal choice node
    else {
        section.choices.forEach((choice) => {
            const button = document.createElement("button");

            button.textContent = choice.text;

            button.addEventListener("click", () => {
                showSection(choice.next, choice.route);
            });

            choices.appendChild(button);
        });
    }

    // Reserve the final text height before typing
    storyText.style.minHeight = "";
    storyText.textContent = formattedText;
    storyText.style.minHeight = `${storyText.scrollHeight}px`;

    // Type the text, then reveal the controls
    typeText(storyText, formattedText, () => {
        choices.style.visibility = "visible";
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
