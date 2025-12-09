const img = document.getElementById("fly");
const logoWrapper = document.getElementById("landing-wrapper"); // logo container
let start = null;
let direction = 1; // 1 = left→right, -1 = right→left
let roundTrip = 0;

function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / 1000; // duration 2s
    const t = Math.min(progress, 1);

    // Arc path (quadratic curve)
    const screenWidth = window.innerWidth + 200;
    const x = direction === 1
        ? t * screenWidth - 100
        : (1 - t) * screenWidth - 100;

    const y = 50 * Math.sin(t * Math.PI) + window.innerHeight / 2 - 100;
    // ↑ increased from 50 → 200 for higher arc

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;

    // Flip image when turning around
    img.style.transform = direction === -1
        ? "scaleX(1)"
        : "scaleX(-1)";

    if (t < 1) {
        requestAnimationFrame(animate);
    } else {
        roundTrip++;
        if (roundTrip < 2) { // turn around after first pass
            direction *= -1;
            start = null;
            requestAnimationFrame(animate);
        } else {
            // plane disappears
            img.style.display = "none";
            // show logo
            logoWrapper.style.display = "flex";
        }
    }
}

requestAnimationFrame(animate);