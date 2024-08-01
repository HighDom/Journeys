const track = document.getElementById("image-track");
let isMouseDown = false;
let mouseDownAt = 0;
let currentPercentage = 0;
let lastAnimatedPercentage = 0; // To track when we last animated

window.onmousedown = (e) => {
  isMouseDown = true;
  mouseDownAt = e.clientX;
  currentPercentage = parseFloat(track.dataset.prevPercentage) || 0;
};

window.onmousemove = (e) => {
  if (!isMouseDown) return;

  const mouseDelta = mouseDownAt - e.clientX;
  const maxDelta = window.innerWidth / 2;
  const percentage = (mouseDelta / maxDelta) * -100;
  let nextPercentage = currentPercentage + percentage;
  nextPercentage = Math.max(Math.min(nextPercentage, 0), -100); // Ensure within bounds

  track.style.transform = `translate(${nextPercentage}%, -50%)`;

  if (Math.abs(nextPercentage - lastAnimatedPercentage) > 5) {
    // Only animate if the change is significant
    animateImages(nextPercentage);
    lastAnimatedPercentage = nextPercentage;
  }

  currentPercentage = nextPercentage;
};

const animateImages = (nextPercentage) => {
  for (const image of track.getElementsByClassName("image")) {
    image.animate([{ objectPosition: `${nextPercentage + 100}% 50%` }], {
      duration: 1200,
      fill: "forwards",
    });
  }
};

window.onmouseup = () => {
  isMouseDown = false;
  track.dataset.prevPercentage = currentPercentage.toString();
};
