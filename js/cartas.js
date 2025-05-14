import './marvel.js'; // Tu componente web personalizado

fetch('../data/db.json')
    .then(res => res.json())
    .then(data => {
        const contenedor = document.getElementById('carta-container');

        data.personajes.forEach(personaje => {
            const carta = document.createElement('cartas-marvel');
            carta.setAttribute('name', personaje.nombre);
            carta.setAttribute('alias', personaje.nombreClave);
            carta.setAttribute('descripcion', personaje.descripcion);
            carta.setAttribute('imagen', personaje.imagen);
            carta.setAttribute('ataque', personaje.ataque);
            carta.setAttribute('fuerza', personaje.fuerza);
            carta.setAttribute('resistencia', personaje.resistencia);
            carta.setAttribute('estudio', personaje.estudio);
            carta.setAttribute('presentacion', personaje.presentacion);
            contenedor.appendChild(carta);
    });
});
