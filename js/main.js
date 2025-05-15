// Asegúrate de que el DOM esté cargado antes de asignar los eventos
document.addEventListener('DOMContentLoaded', function() {
  // Asignar los eventos a los botones de navegación
  document.getElementById('btn-home').addEventListener('click', function() {
    mostrarVista('inicio');
  });

  document.getElementById('btn-marvel').addEventListener('click', function() {
    mostrarVista('marvel');
  });

  document.getElementById('btn-dc').addEventListener('click', function() {
    mostrarVista('dc');
  });

  document.getElementById('btn-arena').addEventListener('click', function() {
    mostrarVista('arena');
  });
});

//java de la barra de busqueda
class SearchBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Estilo del componente
    this.shadowRoot.innerHTML = `
      <style>
        .search-box {
        margin-left: 10%;
        margin-right: 10%;
        padding: 10px;
        }

        input[type="text"] {
        display: flex;
        align-items: center;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        height: 50px;
        }
      </style>
      <div class="search-box">
        <input type="text" placeholder="🔍 Buscar personaje por seudonimo..." />
      </div>
    `;
  }

  connectedCallback() {
    const input = this.shadowRoot.querySelector('input');
    input.addEventListener('input', (e) => {
      const valor = e.target.value;
      this.dispatchEvent(new CustomEvent('input', {
        detail: valor,
        bubbles: true,
        composed: true
      }));
      const fakeInput = document.querySelector('#fake-search');
      if (fakeInput) fakeInput.value = valor;
    });
  }
}
customElements.define('search-box', SearchBox);

document.querySelector("search-box").addEventListener("input", (e) => {
  const searchText = e.detail.toLowerCase();
  document.querySelectorAll(".cartas-dc").forEach(hero => {
    const name = hero.querySelector("nombre").textContent.toLowerCase();
    hero.style.display = name.includes(searchText) ? "block" : "none";
  });
});


// Función para cambiar el contenido dinámicamente
function mostrarVista(vista) {
  const app = document.getElementById('app');
  app.innerHTML = ''; // Limpiar el contenido anterior

  if (vista === 'inicio') {
    app.innerHTML = `
      <div class="imagen-container">
        <div class="contenedortranspa">
          <img id="main-image" src="/assets/img/logo.png" alt="Imagen principal" />
        </div>
        <div class="texto-contenido" id="texto">
          <h1 class="texto-index-fuego">HEROE</h1> 
          <h2 class="texto-index-fuego">Únete a la batalla y forja tu leyenda entre los más grandes</h2>
        </div>
      </div>
      <a href="/html/arena.html"><button class="botonarena"> <h1> ⚔️ Combate</h1></button></a>
    `;
  }

  if (vista === 'marvel') {
    app.innerHTML = `
      <div class="heroes">
        <cartas-marvel
          name="Tony Stark"
          alias="Iron Man"
          estudio="Marvel"
          presentacion="1963"
          descripcion="Genio multimillonario, filántropo y superhéroe con una armadura de alta tecnología."
          imagen="/assets/img/Iron_Man.jpg">
        </cartas-marvel>
        <cartas-marvel
          name="Peter Parker"
          alias="Spiderman"
          estudio="Marvel"
          presentacion="1962"
          descripcion="Un joven con habilidades arácnidas que protege a Nueva York como Spider-Man."
          imagen="/assets/img/spiderman.jpg">
        </cartas-marvel>
        <cartas-marvel
          name="Marc Spector"
          alias="Moon Knight"
          estudio="Marvel"
          presentacion="1975"
          descripcion="Ex-marine con un trastorno de personalidad que actúa como vigilante místico."
          imagen="/assets/img/Moon_Knight.jpg">
        </cartas-marvel>
        <cartas-marvel
          name="Matt Murdock"
          alias="Daredevil"
          estudio="Marvel"
          presentacion="1964"
          descripcion="Abogado ciego con sentidos sobrehumanos que lucha por la justicia en Hell’s Kitchen."
          imagen="/assets/img/Daredevil.jpg">
        </cartas-marvel>
        <cartas-marvel
          name="Eddie Brock"
          alias="Venom"
          estudio="Marvel"
          presentacion="1988"
          descripcion="Periodista que se convierte en el antihéroe simbiótico Venom tras unirse a un alienígena."
          imagen="/assets/img/Venom.jpg">
        </cartas-marvel>
      </div>
    `;
  }

  if (vista === 'dc') {
    app.innerHTML = `
      <div class="heroes">
        <cartas-dc
          name="Bruce Wayne"
          alias="Batman"
          estudio="DC Comics"
          presentacion="1939"
          descripcion="El caballero oscuro que lucha contra el crimen en Gotham City."
          imagen="/assets/img/batman.jpg">
        </cartas-dc>
        <cartas-dc
          name="Clark Kent"
          alias="Superman"
          estudio="DC Comics"
          presentacion="1938"
          descripcion="Un extraterrestre que usa sus poderes para proteger la Tierra."
          imagen="/assets/img/superman.jpg">
        </cartas-dc>
        <cartas-dc
          name="Diana Prince"
          alias="Wonder Woman"
          estudio="DC Comics"
          presentacion="1941"
          descripcion="La princesa amazona con habilidades divinas y gran destreza en combate."
          imagen="/assets/img/wonder_woman.jpg">
        </cartas-dc>
        <cartas-dc
          name="Hal Jordan"
          alias="Green Lantern"
          estudio="DC Comics"
          presentacion="1959"
          descripcion="Portador del anillo de poder que le otorga habilidades extraordinarias."
          imagen="/assets/img/green_lantern.jpg">
        </cartas-dc>
        <cartas-dc
          name="Barry Allen"
          alias="The Flash"
          estudio="DC Comics"
          presentacion="1956"
          descripcion="El hombre más rápido del mundo, capaz de mover a la velocidad de la luz."
          imagen="/assets/img/flash.jpg">
        </cartas-dc>
      </div>
    `;
  }

  if (vista === 'arena') {
    app.innerHTML = `
      <h1>Arena de Batalla</h1>
      <div class="contenedor-arena">
        <div class="pelea">
          <a href="/html/arena.1.html"></a>
          <div class="imagen"> 
            <img src="/assets/img/heroplayer.jpeg" alt="Jugador 1">
          </div>
          <span class="vs">
            <div class="texto-fuego">VS</div>
          </span>
          <div class="imagen">
            <img src="/assets/img/heroplayer.jpeg" alt="Jugador 2">
          </div>
        </div>

        <div class="pelea">
          <div class="imagen">
            <img src="/assets/img/heroplayer.jpeg" alt="Jugador 3">
          </div>
          <span class="vs">
            <div class="texto-fuego">VS</div>
          </span>
          <div class="imagen">
            <img src="/assets/img/ultron2.jpg" alt="Jugador 4">
          </div>
        </div>

        <div class="pelea">
          <div class="imagen">
            <img src="/assets/img/ultron2.jpg" alt="Jugador 5">
          </div>
          <span class="vs">
            <div class="texto-fuego">VS</div>
          </span>
          <div class="imagen">
            <img src="/assets/img/ultron2.jpg" alt="Jugador 6">
          </div>
        </div>
      </div>
    `;
  }
}
