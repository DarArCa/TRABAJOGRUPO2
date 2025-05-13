class Cartasdc extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // TODO: REvisar bien esta esctrucutra poruqe puede que haya cambiado con la modiificacion del CSS main
    this.shadowRoot.innerHTML = /* HTML */ `
      <style>
        :host {
          display: inline-block;
          width: 100%;
          max-width: 320px;
          margin: 20px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          background-color: #fff;
          font-family: 'Arial', sans-serif;
          transition: transform 0.3s ease;
        }

        :host(:hover) {
          transform: translateY(-10px);
        }

        img {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-bottom: 2px solid #ccc;
        }

        .card-content {
          padding: 15px;
        }

        #namee {
          font-size: 1.2rem;
          font-weight: bold;
          color: #333;
        }

        #alias {
          font-size: 1rem;
          color: #666;
        }

        #estudio,
        #presentacion,
        #descripcion {
          font-size: 0.9rem;
          color: #444;
          margin-top: 5px;
        }

        @media (max-width: 768px) {
          :host {
            width: 100%;
            max-width: 100%;
          }
        }
      </style>
      <a href="#" class="card">
        <img id="imagen">
        <div class="card-content">
          <div id="namee"></div>
          <div id="alias"></div>
          <div id="estudio"></div>
          <div id="presentacion"></div>
          <div id="descripcion"></div>
        </div>
      </a>
    `;
  }

  connectedCallback() {
    const shadow = this.shadowRoot;
    const img = shadow.getElementById('imagen');
    img.src = this.getAttribute('imagen');
    shadow.getElementById('namee').textContent = this.getAttribute('name');
    shadow.getElementById('alias').textContent = this.getAttribute('alias');
    shadow.getElementById('estudio').textContent = this.getAttribute('estudio');
    shadow.getElementById('presentacion').textContent = this.getAttribute('presentacion');
    shadow.getElementById('descripcion').textContent = this.getAttribute('descripcion');
  }
}

customElements.define('cartas-dc', Cartasdc);
