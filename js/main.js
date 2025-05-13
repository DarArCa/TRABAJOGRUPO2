const botones = document.querySelectorAll('.nav-button');
const imagen = document.getElementById('main-image');
const texto = document.getElementById('texto');

const secciones = {
  home: {
    img: 'img/imagen-home.png',
    texto: 'Bienvenido a la sección Home. Aquí va tu texto editable.'
  },
  dc: {
    img: 'img/imagen-dc.png',
    texto: 'Explora el universo de DC Comics con sus legendarios héroes.'
  },
  marvel: {
    img: 'img/imagen-marvel.png',
    texto: 'Sumérgete en el mundo de Marvel lleno de acción y aventuras.'
  },
  arena: {
    img: 'img/imagen-arena.png',
    texto: 'Bienvenido a la Arena, donde los héroes se enfrentan.'
  }
};

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    botones.forEach(btn => btn.classList.remove('active'));
    boton.classList.add('active');
    const id = boton.id.replace('btn-', '');
    imagen.src = secciones[id].img;
    texto.textContent = secciones[id].texto;
  });
});