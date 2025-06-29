const svg = document.getElementById("svg");
    const colors = ["#055B3C", "#C2D20A", "#FF7A00"];

    function drawCircles() {
      for (let i = 0; i < 15; i++) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const radius = Math.floor(Math.random() * 1000) + 30; // 반지름 30~230
        const cx = Math.random() * window.innerWidth;
        const cy = Math.random() * window.innerHeight;
        const strokeWidth = Math.floor(Math.random() * 3) + 1; // 1~2
        const color = colors[Math.floor(Math.random() * colors.length)];

        circle.setAttribute("r", radius);
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("stroke", color);
        circle.setAttribute("stroke-width", strokeWidth);
        circle.setAttribute("fill", "none");
        circle.setAttribute("opacity", "0.5");

        svg.appendChild(circle);
      }
    }

    function removeAll() {
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
    }

    function refresh() {
      removeAll();
      drawCircles();
    }

    // 최초 실행
    refresh();

    // 1.5초 간격으로 계속 새로 그림
    setInterval(refresh, 4000);