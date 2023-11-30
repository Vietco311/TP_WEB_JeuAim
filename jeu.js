function createRandomPoint() {
    const point = document.createElement('div');
    point.classList.add('point');
    const container = document.getElementById('container');
    const maxTop = container.clientHeight - 400;
    const maxLeft = container.clientWidth - 400;

    const randomTop = Math.floor(Math.random() * maxTop);
    const randomLeft = Math.floor(Math.random() * maxLeft);

    point.style.top = `${randomTop}px`;
    point.style.left = `${randomLeft}px`;

    container.appendChild(point);

    setTimeout(() => {
      container.removeChild(point);
    }, 3000); // Temps en millisecondes avant la disparition (ici, 3 secondes)
  }

  setInterval(createRandomPoint, 1000); // Créer un point toutes les secondes (ajustable)