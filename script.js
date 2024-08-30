document.addEventListener("DOMContentLoaded", function () {
    const typedTextSpans = document.querySelectorAll(".typed");
    const typedTextTwoSpans = document.querySelectorAll(".typed-two");

    const textArray = [
        ["Your Research and Development Partner", "Reach out to realize our new ventures"],
        ["Turnkey Engineering projects", "Complete Automation Solutions at affordable Quotations"]
    ];

    const typingDelay = 100;
    const erasingDelay = 50;
    const displayDuration = 10000; 
    const gapDuration = 2000; 
    let currentGroupIndex = 0;

    function type(span, text, callback) {
        let charIndex = 0; 
        function typeChar() {
            if (charIndex < text.length) {
                span.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, typingDelay);
            } else {
                setTimeout(callback, gapDuration);      }
        }
        typeChar();
    }

    function erase(span, callback) {
        let charIndex = span.textContent.length; 
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
        type(typedTextSpans[0], currentGroup[0], () => {
            type(typedTextTwoSpans[0], currentGroup[1], () => {
                setTimeout(() => {
                    erase(typedTextSpans[0], () => {
                        erase(typedTextTwoSpans[0], () => {
                            currentGroupIndex = (currentGroupIndex + 1) % textArray.length;
                            setTimeout(displayLines, 1000); 
                        });
                    });
                }, displayDuration); 
            });
        });
    }

    displayLines();
});
