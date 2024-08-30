document.addEventListener("DOMContentLoaded", function () {
    const typedTextSpans = document.querySelectorAll(".typed");
    const typedTextTwoSpans = document.querySelectorAll(".typed-two");
    const typedTextThreeSpans = document.querySelectorAll(".typed-three");

    const textArray = [
        ["Your Research and Development Partner", "Committed to bring You the Most Novel Solutions", "Rely on Us for Most Affordable Product Development"],
        ["Your Trustworthy Intellectual Property Partner", "Protect Your Unique Ideas at Global and National Market", "Increase Your Net worth with Intellectual Property"],
        ["Turnkey Engineering Projects", "Complete Automation Solutions at Affordable Quotations", "Cutting Edge Solutions in Artificial Intelligence and Internet of Things"]
    ];

    const typingDelay = 100;
    const erasingDelay = 50;
    const displayDuration = 8000; 
    const gapDuration = 2000; 
    const shortGapDuration = 500; // Shortened delay between typed-two and typed-three
    let currentGroupIndex = 0;

    function type(span, text, callback) {
        let charIndex = 0;
        function typeChar() {
            if (charIndex < text.length) {
                span.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, typingDelay);
            } else {
                setTimeout(callback, shortGapDuration);
            }
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
            setTimeout(() => {
                type(typedTextTwoSpans[0], currentGroup[1], () => {
                    setTimeout(() => {
                        type(typedTextThreeSpans[0], currentGroup[2], () => {
                            setTimeout(() => {
                                erase(typedTextSpans[0], () => {
                                    erase(typedTextTwoSpans[0], () => {
                                        erase(typedTextThreeSpans[0], () => {
                                            currentGroupIndex = (currentGroupIndex + 1) % textArray.length;
                                            setTimeout(displayLines, gapDuration);
                                        });
                                    });
                                });
                            }, displayDuration);
                        });
                    }, shortGapDuration); // Shortened delay here
                });
            }, gapDuration);
        });
    }

    displayLines();
});
