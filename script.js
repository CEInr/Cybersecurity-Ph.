const canvas = document.getElementById("binaryCanvas");
const ctx = canvas.getContext("2d");

const themeToggle = document.getElementById("themeToggle");
const modeLabel = document.getElementById("modeLabel");

let width;
let height;

const fontSize = 16;
const binarySpeed = 0.6;

let drops = [];

// this is the functions
function resizeCanvas() {

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    const columns = Math.floor(width / fontSize);

    drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

}


function drawBinary() {

    const dark =
        document.body.classList.contains("dark");


    ctx.fillStyle = dark
        ? "rgba(0, 0, 0, 0.12)"
        : "rgba(255, 255, 255, 0.12)";


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    ctx.fillStyle = dark
        ? "#ffffff"
        : "#000000";


    ctx.font =
        `${fontSize}px monospace`;


    for (let i = 0; i < drops.length; i++) {

        const binary =
            Math.random() > 0.5
                ? "1"
                : "0";


        const x =
            i * fontSize;


        const y =
            drops[i] * fontSize;


        ctx.fillText(
            binary,
            x,
            y
        );


        if (
            y > height &&
            Math.random() > 0.975
        ) {
            drops[i] = 0;
        }


        drops[i] += binarySpeed;

    }


    requestAnimationFrame(
        drawBinary
    );

}


// dark mode and light mode

themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );


        modeLabel.textContent =
            document.body.classList.contains("dark")
                ? "DARK"
                : "LIGHT";

    }
);


// this is the section part

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);
//sa check list to
const checklistItems =
    document.querySelectorAll(".check-item");

checklistItems.forEach(item => {

    item.addEventListener("click", () => {

        item.classList.toggle("checked");

    });

});


//navigation idk i forgot


const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


const navObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    navLinks.forEach(
                        link => {

                            link.classList.remove(
                                "active"
                            );


                            if (
                                link.getAttribute(
                                    "href"
                                ) ===
                                `#${entry.target.id}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        }
                    );

                }

            });

        },
        {
            threshold: 0.35
        }
    );


sections.forEach(
    section => {

        navObserver.observe(
            section
        );

    }
);


// resize

window.addEventListener(
    "resize",
    resizeCanvas
);


//start ng Draw and Resize

resizeCanvas();
drawBinary();
