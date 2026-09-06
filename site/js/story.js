const story = {
    // ===================
    // TITLE CARD
    // ===================
    title: {
        image: "title_card.gif",
        text: "",
        choices: [{ text: "Start", next: "name_cat" }],
        // TODO: Make rooftop and stars art
    },

    // ===================
    // NAME
    // ===================
    name_cat: {
        type: "input",
        text: "It's 2am and you are a stray cat in an alleyway. \n\nWhat is your name?",
        image: "starting_cat.gif",
        inputKey: "catName",
        next: "start",
    },

    // ===================
    // START
    // ===================
    start: {
        text: "So {{catName}}, where would like you to go?",
        choices: [
            { text: "Use drainpipes and ledges to get onto the rooftop", next: "rooftop_choice" },
            { text: "The road looks bright and interesting. I'll saunter over there", next: "road" },
            // TODO: Write ROAD branch
        ],
    },

    // ===================
    // ROOFTOP
    // ===================

    rooftop_choice: {
        text: "On your way up to the rooftop you reach a ledge with an open window. Will you go inside?",
        image: "window.gif",
        choices: [
            { text: "Yes, let's investigate", next: "overhear_kitchen" },
            { text: "I'm nearly at the top, I'll keep going to the rooftop", next: "overhear_rooftop" },
        ],
    },

    // ===================
    // KITCHEN FROM WINDOW
    // ===================

    overhear_kitchen: {
        text: "As you enter, you find yourself in a kitchen. You can hear a voice. A woman in the next room murmers to herself:\n\n'I can't believe I finally killed him. And after all these years it was so easy.'\n\nYou hear footsteps coming in your direction. Where will you go now?",
        image: "kitchen.gif",
        choices: [
            { text: "Investigate the bedroom", next: "bedroom" },
            { text: "Stay where you are", next: "kitchen" },
            // TODO: Write KITCHEN branch
        ],
    },

    // ===================
    // ON THE ROOFTOP
    // ===================

    overhear_rooftop: {
        text: "On the rooftop, you slip past a vent you can hear an echoey voice drifting up from the flat below. A woman is murmering to herself.\n\n'I can't believe I finally killed him. And after all these years it was so easy.'\n\nWhere will you go now?",
        choices: [
            { text: "You know what? This is too juicy. Let's get back to that open window", next: "kitchen_from_rooftop" },
            { text: "This is none of my beeswax. I'll carry on over the rooftop", next: "edge_of_roof" },
        ],
    },

    // ===================
    // EDGE OF ROOFTOP
    // ===================

    edge_of_roof: {
        text: "You've reached the edge of the roof.\n\nYou can see the street below and there are two ways down. One takes you to the outside of a bookmakers, the other to the outside of a laundrette.\n\nWhat do you reckon?",
        choices: [
            { text: "I'll head down to the bookmakers. You never know what sort of character you'll find there at this time of night", next: "bookmakers" },
            { text: "With all those machines going I bet that laundrette is nice and warm", next: "laundrette" },
        ],
        // TODO: Connect up to ROAD branch
    },

    // ===================
    // KITCHEN FROM ROOFTOP
    // ===================

    kitchen_from_roof: {
        text: "As you enter, you find yourself in a kitchen.\n\nYou hear footsteps coming in your direction.\n\nWhere will you go now?",
        choices: [
            { text: "Investigate the bedroom", next: "bedroom" },
            { text: "Stay where you are", next: "kitchen" },
        ],
    },

    // ===================
    // BEDROOM
    // ===================

    bedroom: {
        text: "You slip into the bedroom. On the floor is a lifeless body, face down. He has a stange look on his face. Not of fear, but of confusion.\n\nTaken by surprise, you back up and accidentally knock into a table leg, sending the lamp on it crashing to the floor. The noises outside stop abruptly, then you hear footsteps hurrying towards the bedroom.\n\nWhat will you do?",
        image:"bedroom.gif",
        choices: [
            { text: "Hide under the bed", next: "under_bed" },
            { text: "Ready for attack", next: "ending_bedroom_bad" },
        ],
    },

    // ===================
    // UNDER THE BED
    // ===================
    under_bed: {
        text: "From under the bed you watch as a woman flies through the door, stopping with a halt when she sees the broken lamp.\n\nSuddenly all is deathly quiet. She starts to pace around the room, trying to figure out what happened.\n\nShe hasn't found you...yet.\n\nWhat now?",
        image: "under_bed.gif",
        choices: [
            { text: "As she walks past, get between her legs and trip her up", next: "ending_bedroom_good" },
            { text: "When she's facing the other way, dart out of the room", next: "ending_bedroom_partial_good" },
        ],
    },

    // ===================
    // ENDINGS
    // ===================

    ending_bedroom_bad: {
        type: "ending",
        text: "A woman flies into the room, fear and confusion painted on her face. You throw yourself on her, claws tearing into her skin before she even understands what is happening.\n\nIn her panic, she throws you off her and you lay on the floor, passed out alongside the dead body.\n\nSorry {{catName}}, the neighbours will find you in the morning, but tonight's adventure is over.",
    },

    ending_bedroom_good: {
        type: "ending",
        fireworks: true,
        image: "ending_police.gif",
        text: "You fly out from under the bed and tangle yourself up in her legs. With a cry and with outstretched arms, she crashes to the floor, smashing the handle off the door and knocking herself unconcious.\n\nYou are both trapped in the room! This last commotion is the final straw for the neighbours, who have had enough and barge their way in. A scan of the room is enough for them to decide to call the police.\n\nWhen the dust settles after their investigation, you are hailed as hero! The police department officially adopts you as their mascot and you have found a new home. Three cheers for Officer {{catName}}!",
    },
};
