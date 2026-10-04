const canvas = document.getElementById("binaryCanvas");
const ctx = canvas?.getContext("2d");
const themeToggle = document.getElementById("themeToggle");
const modeLabel = document.getElementById("modeLabel");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fontSize = 16;
const binarySpeed = 0.6;

let width = 0;
let height = 0;
let drops = [];

function setTheme(theme) {
    const isDark = theme === "dark";

    document.body.classList.toggle("dark", isDark);
    modeLabel.textContent = isDark ? "DARK" : "LIGHT";
    themeToggle.setAttribute("aria-pressed", String(isDark));

    try {
        localStorage.setItem("theme", theme);
    } catch (error) {
        console.warn("Theme could not be saved:", error);
    }
}

function initTheme() {
    let storedTheme = null;

    try {
        storedTheme = localStorage.getItem("theme");
    } catch (error) {
        console.warn("Theme preference could not be read:", error);
    }

    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = storedTheme || (systemPrefersDark ? "dark" : "light");

    setTheme(nextTheme);
}

function resizeCanvas() {
    if (!canvas || !ctx) return;

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    const columns = Math.floor(width / fontSize);
    drops = Array.from({ length: columns }, () => Math.random() * -100);
}

function drawBinary() {
    if (!canvas || !ctx) return;

    const darkMode = document.body.classList.contains("dark");

    ctx.fillStyle = darkMode ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = darkMode ? "#ffffff" : "#000000";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const binary = Math.random() > 0.5 ? "1" : "0";
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(binary, x, y);

        if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i] += binarySpeed;
    }

    if (!prefersReducedMotion) {
        requestAnimationFrame(drawBinary);
    }
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
        setTheme(nextTheme);
    });
}

if (canvas && ctx) {
    resizeCanvas();
    initTheme();
    drawBinary();
    window.addEventListener("resize", resizeCanvas);
}

const revealElements = document.querySelectorAll(".reveal");
if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.15 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
}

const checklistItems = document.querySelectorAll(".check-item");
checklistItems.forEach((item) => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
    });
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

if (sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                navLinks.forEach((link) => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
                });
            });
        },
        { threshold: 0.35 }
    );

    sections.forEach((section) => navObserver.observe(section));
}


// resize

window.addEventListener(
    "resize",
    resizeCanvas
);


//start ng Draw and Resize

resizeCanvas();
drawBinary();
