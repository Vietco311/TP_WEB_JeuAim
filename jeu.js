function createRandomPoint() {
    const point = document.createElement('div');
    point.classList.add('point');
    const container = document.getElementById('container');
    const maxTop = container.clientHeight - 200;
    const maxLeft = container.clientWidth - 200;

    const randomTop = Math.floor(Math.random() * maxTop);
    const randomLeft = Math.floor(Math.random() * maxLeft);

    point.style.top = `${randomTop}px`;
    point.style.left = `${randomLeft}px`;

    container.appendChild(point);

    setTimeout(() => {
      container.removeChild(point);
    }, 3000);
  }

  setInterval(createRandomPoint, 1000);