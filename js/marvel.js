// Modificar para tener datos completos
const personajesMarvel = [
  {
    id: 1,
    universo: "Marvel",
    nombre: "Tony Stark",
    nombreClave: "Iron Man",
    descripcion: "Genio millonario con una armadura de alta tecnología.",
    trajes: ["Mark I", "Mark XLII", "Endgame"],
    ataque1: 27,
    ataque2: 20,
    ataque3: 30,
    debilidad: "Dependencia tecnológica",
    resistencia: 700,
    imagen: "/assets/img/iron_man.jpg"
  },
  {
    id: 2,
    universo: "Marvel",
    nombre: "Peter Parker",
    nombreClave: "Spiderman",
    descripcion: "Joven héroe con habilidades arácnidas y sentido arácnido.",
    trajes: ["Clásico", "Iron Spider", "Negro"],
    ataque1: 45,
    ataque2: 28,
    ataque3: 30,
    debilidad: "Inexperiencia",
    resistencia: 50,
    imagen: "/assets/img/spiderman.jpg"
  },
  {
    id: 3,
    universo: "Marvel",
    nombre: "Marc Spector",
    nombreClave: "Moon Knight",
    descripcion: "Guardián nocturno con poderes de Khonshu.",
    trajes: ["Clásico", "Mr. Knight", "Armado"],
    ataque1: 25,
    ataque2: 30,
    ataque3: 19,
    debilidad: "Trastorno de identidad",
    resistencia: 60,
    imagen: "/assets/img/moon_knight.jpg"
  },
  {
    id: 4,
    universo: "Marvel",
    nombre: "Matt Murdock",
    nombreClave: "Daredevil",
    descripcion: "Abogado ciego con sentidos aumentados que lucha contra el crimen.",
    trajes: ["Rojo", "Negro", "Amarillo"],
    ataque1: 27,
    ataque2: 17,
    ataque3: 20,
    debilidad: "Humano sin poderes",
    resistencia: 40,
    imagen: "/assets/img/daredevil.jpg"
  },
  {
    id: 5,
    universo: "Marvel",
    nombre: "Eddie Brock",
    nombreClave: "Venom",
    descripcion: "Simbiote con habilidades de fuerza sobrehumana y regeneración.",
    trajes: ["Clásico", "Anti-Venom", "King in Black"],
    ataque1: 29,
    ataque2: 34,
    ataque3: 20,
    debilidad: "Sonido y fuego",
    resistencia: 80,
    imagen: "/assets/img/venom.jpg"
  }
];

class CartasMarvel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    this.shadowRoot.innerHTML = /* HTML */ `
    <!-- con el host se aplicacan estilos especificos a la etiqueta del html, es decir, a la carta -->
      <style>
        :host {
          display: inline-block;
          width: 100%;
          max-width: 20rem;
          height: 28rem;
          margin: 1rem;
          perspective: 50rem;
          font-family: 'Arial', sans-serif;
        }

        .card {
          position: relative;
          width: 100%;
          height: 100%;
          text-decoration: none;
          transition: transform 0.8s;
          transform-style: preserve-3d;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          cursor: default;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          cursor: pointer;
          
        }
        .card:hover {
          transform: translateY(-10px) scale(1.03) rotateZ(1deg);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        }

        .card.flipped {
          transform: rotateY(180deg);
        }

        .card-front, .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 15px;
          overflow: hidden;
          background-color: #fff;
        }

        .card-back {
          transform: rotateY(180deg);
          padding: 1rem;
          box-sizing: border-box;
          overflow-y: auto;
        }

        img {
          width: 100%;
          max-height: 75%;
          object-fit: cover;
          border-bottom: 2px solid #ccc;
        }

        .card-content {
          padding: 1rem;
        }

        #nombre {
          font-size: 1.2rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }

        #nombreClave {
          font-size: 1.2rem;
          color: #666;
          font-weight: bold;
          margin-bottom: 10px;
        }

        #universo {
          font-size: 1rem;
          font-weight: bolder;
          color: #444;
          margin-top: 5px;
        }
        .info-label {
          font-weight: bold;
          margin-top: 10px;
          color: #0B132B;
        }
        .stats {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
        .stat {
          text-align: center;
          flex: 1;
        }
        .stat-value {
          font-size: 1.2rem;
          font-weight: bold;
          color: #0B132B;
        }
        .stat-label {
          font-size: 0.8rem;
          color: #666;
        }
      </style>
      
      <div class="card">

        <div class="card-front">
          <img id="imagen">
          <div class="card-content">
            <div id="nombre"></div>
            <div id="nombreClave"></div>
            <div id="universo"></div>
          </div>
        </div>
        
        <div class="card-back">
          <div id="back-nombre" class="info-label">Nombre:</div>
          <div id="back-nombre-value" class="info-value"></div>
          
          <div id="back-nombreClave" class="info-label">Nombre Clave:</div>
          <div id="back-nombreClave-value" class="info-value"></div>
          
          <div id="back-universo" class="info-label">Universo:</div>
          <div id="back-universo-value" class="info-value"></div>
          
          <div id="back-descripcion" class="info-label">Descripción:</div>
          <div id="back-descripcion-value" class="info-value"></div>

          <div class="info-label">Estadísticas:</div>
          <div class="stats">
            <div class="stat">
              <div id="ataque-value" class="stat-value">-</div>
              <div class="stat-label">Ataque</div>
            </div>
            <div class="stat">
              <div id="fuerza-value" class="stat-value">-</div>
              <div class="stat-label">Fuerza</div>
            </div>
            <div class="stat">
              <div id="damage-value" class="stat-value">-</div>
              <div class="stat-label">Resistencia</div>
            </div>
          </div>
          
          <div class="info-label">Debilidad:</div>
          <div id="debilidad-value" class="info-value">-</div>

        </div>
      </div>
    `;
    
    this.shadowRoot.querySelector('.card').addEventListener('click', () => {
      this.shadowRoot.querySelector('.card').classList.toggle('flipped');
    });
  }

  // apartir de aca debo de adaptar el JS para que que agarre los datos del JSON
  connectedCallback() {
    const shadow = this.shadowRoot;
    const img = shadow.getElementById('imagen');
    const nombre = this.getAttribute('nombre');
    const nombreClave = this.getAttribute('nombreClave');
    const universo = this.getAttribute('universo');
    const descripcion = this.getAttribute('descripcion');
    const imagen = this.getAttribute('imagen');
    
    // datos para la parte frontal
    img.src = imagen;
    shadow.getElementById('nombre').textContent = nombre;
    shadow.getElementById('nombreClave').textContent = nombreClave;
    shadow.getElementById('universo').textContent = universo;
    
    // Datos para la parte trasera
    shadow.getElementById('back-nombre-value').textContent = nombre;
    shadow.getElementById('back-nombreClave-value').textContent = nombreClave;
    shadow.getElementById('back-universo-value').textContent = universo;
    shadow.getElementById('back-descripcion-value').textContent = descripcion;
    
    
    this.loadAdditionalData(nombre, nombreClave);
  }
  
  loadAdditionalData(nombre, nombreClave) {
    fetch('./data/db.json')
      .then(response => response.json())
      .then(data => {
        // cambiar las variables del JSON por los nombres que salen, no entiendo muy bien esto
        const personaje = data.personajes.find(p => 
          p.nombre === nombre || p.nombreClave === nombreClave
        );
        
        if (personaje) {
          this.updateCardWithFullData(personaje);
        }
      })
  }
  
  updateCardWithFullData(personaje) {
    const shadow = this.shadowRoot;
    
    // Actualizar estadísticas
    shadow.getElementById('ataque-value').textContent = personaje.ataque1;
    shadow.getElementById('fuerza-value').textContent = personaje.ataque2;
    shadow.getElementById('damage-value').textContent = personaje.resistencia;
    
    // Actualizar debilidad
    shadow.getElementById('debilidad-value').textContent = personaje.debilidad;
  }
}

customElements.define('cartas-marvel', CartasMarvel);

// //busqueda-marvel
// class SearchBox extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({ mode: 'open' });

//     // Estilo del componente
//     this.shadowRoot.innerHTML = /* HTML */`
//       <style>
//         .search-box input {
//           padding: 10px 20px;
//           font-size: 1rem;
//           border-radius: 8px;
//           border: none;
//           width: 300px;
//           max-width: 90%;
//           box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
//         }
//         button {
//           background: linear-gradient(135deg, #1a1aff, #8a00e6); /* mezcla de colores tipo cómic */
//           color: white;
//           font-weight: bold;
//           font-size: 1.1rem;
//           padding: 12px 24px;
//           border: none;
//           border-radius: 12px;
//           box-shadow: 0 0 12px rgba(0, 0, 0, 0.5), 0 0 8px #1a1aff;
//           cursor: pointer;
//           transition: transform 0.2s ease, box-shadow 0.2s ease;
//         }

//         button:hover {
//           transform: scale(1.05);
//           box-shadow: 0 0 20px rgba(0, 0, 0, 0.7), 0 0 12px #ff0044;
//         }

//         button:active {
//           transform: scale(0.98);
//           box-shadow: inset 0 0 10px #000;
//         }
//       </style>
//       <div class="search-box">
//         <input type="text" placeholder="🔍 Buscar personaje por seudonimo..." />
//       </div>
//     `;
//   }

//   connectedCallback() {
//     const input = this.shadowRoot.querySelector('input');
//     input.addEventListener('input', (e) => {
//       const valor = e.target.value;
//       this.dispatchEvent(new CustomEvent('input', {
//         detail: valor,
//         bubbles: true,
//         composed: true
//       }));
//       const fakeInput = document.querySelector('#fake-search');
//       if (fakeInput) fakeInput.value = valor;
//     });
//   }
// }
// customElements.define('search-box', SearchBox);

// document.querySelector("search-box").addEventListener("input", (e) => {
//   const searchText = e.detail.toLowerCase();
//   document.querySelectorAll(".cartas-marvel").forEach(hero => {
//     const name = hero.querySelector("nombre").textContent.toLowerCase();
//     hero.style.display = name.includes(searchText) ? "block" : "none";
//   });
// });