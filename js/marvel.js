class CartasMarvel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const name = this.getAttribute('name');
    const alias = this.getAttribute('alias');
    const descripcion = this.getAttribute('descripcion');
    const imagen = this.getAttribute('imagen');
    const ataque = this.getAttribute('ataque');
    const fuerza = this.getAttribute('fuerza');
    const resistencia = this.getAttribute('resistencia');
    const estudio = this.getAttribute('estudio');
    const presentacion = this.getAttribute('presentacion');

    this.shadowRoot.innerHTML = /* HTML */ `
      <style>
        .card-container {
          width: 300px;
          height: 400px;
          perspective: 1000px;
          margin: 20px;
        }

        .card {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 2s;
          cursor: pointer;
        }

        .card.girada {
          transform: rotateY(180deg);
        }

        .cara {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .frontal {
          background: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }

        .frontal img {
          width: 100%;
          height: 70%;
          object-fit: cover;
        }

        .frontal h3 {
          margin: 10px;
          font-size: 1.2rem;
          color: #000;
        }

        .trasera {
          background-color: #f5f5f5;
          transform: rotateY(180deg);
          padding: 20px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }

        .trasera h4 {
          margin: 5px 0;
          font-size: 1.1rem;
          color: #333;
        }

        .trasera p {
          font-size: 0.9rem;
          color: #555;
          margin: 5px 0;
        }
      </style>

      <div class="card-container">
        <div class="card">
          <div class="cara frontal">
            <img src="${imagen}" alt="${alias}">
            <h3>${alias}</h3>
          </div>
          <div class="cara trasera">
            <h4>${name}</h4>
            <p><strong>Alias:</strong> ${alias}</p>
            <p><strong>Estudio:</strong> ${estudio}</p>
            <p><strong>Primera aparición:</strong> ${presentacion}</p>
            <p><strong>Ataque:</strong> ${ataque}</p>
            <p><strong>Fuerza:</strong> ${fuerza}</p>
            <p><strong>Resistencia:</strong> ${resistencia}</p>
            <p>${descripcion}</p>
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    const carta = this.shadowRoot.querySelector('.card');
    carta.addEventListener('click', () => {
      carta.classList.toggle('girada');
    });
  }
}

customElements.define('cartas-marvel', CartasMarvel);