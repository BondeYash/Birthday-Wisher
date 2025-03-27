let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.rotation = Math.random() * 30 - 15;

    this.init();
  }

  init() {
    // Start dragging (mouse + touch)
    this.paper.addEventListener("mousedown", this.startDrag.bind(this));
    this.paper.addEventListener("touchstart", this.startDrag.bind(this), { passive: false });

    // Dragging movement (mouse + touch)
    document.addEventListener("mousemove", this.drag.bind(this));
    document.addEventListener("touchmove", this.drag.bind(this), { passive: false });

    // Stop dragging (mouse + touch)
    document.addEventListener("mouseup", this.stopDrag.bind(this));
    document.addEventListener("touchend", this.stopDrag.bind(this));
  }

  startDrag(e) {
    e.preventDefault(); // Prevent default scrolling on touch devices

    this.holdingPaper = true;
    this.paper.style.zIndex = highestZ++;

    const touch = e.touches ? e.touches[0] : e;
    this.startX = touch.clientX - this.currentX;
    this.startY = touch.clientY - this.currentY;
  }

  drag(e) {
    if (!this.holdingPaper) return;

    const touch = e.touches ? e.touches[0] : e;
    this.currentX = touch.clientX - this.startX;
    this.currentY = touch.clientY - this.startY;

    this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
  }

  stopDrag() {
    this.holdingPaper = false;
  }
}

// Apply the drag behavior to all papers
document.querySelectorAll(".paper").forEach(paper => new Paper(paper));

// Redirect when clicking the heart paper
function redirectToSurprise() {
  window.location.href = "surprise.html";
}

const heartPaper = document.getElementById("heartPaper");
heartPaper.addEventListener("click", redirectToSurprise);
heartPaper.addEventListener("touchend", redirectToSurprise);
