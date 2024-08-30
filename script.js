document.addEventListener("DOMContentLoaded", function () {
    const typedTextSpans = document.querySelectorAll(".typed");
    const typedTextTwoSpans = document.querySelectorAll(".typed-two");

    const textArray = [
        ["Your Research and Development Partner", "Reach out to realize our new ventures"],
        ["Turnkey Engineering projects", "Complete Automation Solutions at affordable Quotations"]
    ];

    const typingDelay = 100;
    const erasingDelay = 50;
    const displayDuration = 10000; // 10 seconds for each complete set
    const gapDuration = 2000; // 2 seconds gap between lines
    let currentGroupIndex = 0;

    function type(span, text, callback) {
        let charIndex = 0; // Reset charIndex for each line
        function typeChar() {
            if (charIndex < text.length) {
                span.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, typingDelay);
            } else {
                setTimeout(callback, gapDuration); // Wait before erasing
            }
        }
        typeChar();
    }

    function erase(span, callback) {
        let charIndex = span.textContent.length; // Start erasing from the end
        function eraseChar() {
            if (charIndex > 0) {
                span.textContent = span.textContent.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(eraseChar, erasingDelay);
            } else {
                callback();
            }
        }
        eraseChar();
    }

    function displayLines() {
        const currentGroup = textArray[currentGroupIndex];

        // Type the first line
        type(typedTextSpans[0], currentGroup[0], () => {
            // After the first line is done, type the second line
            type(typedTextTwoSpans[0], currentGroup[1], () => {
                // Wait for the display duration then erase both lines
                setTimeout(() => {
                    erase(typedTextSpans[0], () => {
                        erase(typedTextTwoSpans[0], () => {
                            // Move to the next group
                            currentGroupIndex = (currentGroupIndex + 1) % textArray.length; // Loop through the groups
                            // Start typing the new group after a short delay
                            setTimeout(displayLines, 1000); // 1 second delay before starting the next group
                        });
                    });
                }, displayDuration); // 10 seconds before erasing
            });
        });
    }

    displayLines(); // Start the typing sequence
});
