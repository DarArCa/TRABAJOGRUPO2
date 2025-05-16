// Modificar para tener datos completos
const personajesDC = [
  {
    id: 6,
    universo: "DC",
    nombre: "Bruce Wayne",
    nombreClave: "Batman",
    descripcion: "Detective experto con habilidades de combate y tecnología avanzada.",
    trajes: ["Clásico", "Arkham", "Justice League"],
    ataque1: 25,
    ataque2: 38,
    ataque3: 30,
    debilidad: "Humano sin poderes",
    resistencia: 80,
    imagen: "/assets/img/batman.jpg"
  },
  {
    id: 7,
    universo: "DC",
    nombre: "Unknown",
    nombreClave: "Joker",
    descripcion: "El príncipe payaso del crimen, impredecible y peligroso.",
    trajes: ["Morado clásico", "The Dark Knight", "Arkham"],
    ataque1: 27,
    ataque2: 26,
    ataque3: 30,
    debilidad: "Locura impredecible",
    resistencia: 30,
    imagen: "/assets/img/guason.jpg"
  },
  {
    id: 8,
    universo: "DC",
    nombre: "Hal Jordan",
    nombreClave: "Linterna Verde",
    descripcion: "Miembro del cuerpo intergaláctico con el poder del anillo.",
    trajes: ["Clásico", "New 52", "Green Lantern Corps"],
    ataque1: 28,
    ataque2: 30,
    ataque3: 20,
    debilidad: "Miedo",
    resistencia: 35,
    imagen: "/assets/img/greenlintern.jpg"
  },
  {
    id: 9,
    universo: "DC",
    nombre: "Barry Allen",
    nombreClave: "Flash",
    descripcion: "El hombre más rápido del mundo, maestro de la velocidad.",
    trajes: ["Clásico", "Flashpoint", "Serie CW"],
    ataque1: 27,
    ataque2: 38,
    ataque3: 29,
    debilidad: "Impulsividad",
    resistencia: 40,
    imagen: "/assets/img/flash.jpg"
  },
  {
    id: 10,
    universo: "DC",
    nombre: "Clark Kent",
    nombreClave: "Superman",
    descripcion: "Hombre de acero con fuerza, vuelo y visión láser.",
    trajes: ["Clásico", "Black Suit", "Injustice"],
    ataque1: 47,
    ataque2: 40,
    ataque3: 39,
    debilidad: "Kryptonita",
    resistencia: 100,
    imagen: "/assets/img/superman.jpg"
  }
];

class Cartasdc extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    this.shadowRoot.innerHTML = /* HTML */ `
    <!-- con el host se aplican estilos especificos a la etiqueta del html, es decir, a la carta -->
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
          scrollbar-width: none;
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
          background-color: rgb(0, 0, 0);
          border: 4px solid black;
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
        @media (max-width: 768px) {
          :host {
            max-width: 14rem;
            height: 22rem;
            margin: 0.6rem;
          }
          
          .card-content {
            padding: 0.8rem;
          }
          
          #nombre, #nombreClave {
            font-size: 1rem;
            margin-bottom: 3px;
          }
          
          #universo {
            font-size: 0.85rem;
          }
          
          .info-label {
            margin-top: 8px;
            font-size: 0.9rem;
          }
          
          .stat-value {
            font-size: 1rem;
          }
          
          .stat-label {
            font-size: 0.7rem;
          }
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

customElements.define('cartas-dc', Cartasdc);