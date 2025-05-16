class SearchBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = /* HTML */`
      <style>
        .search-box {
          display: flex;
          justify-content: center;
          margin: 2rem auto 4rem auto;
          padding: 10px;
          width: 100%;
          max-width: 50rem;
        }

        input[type="text"] {
          width: 100%;
          height: 50px;
          padding: 0 20px;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 25px;
          border: 2px solid #6c63ff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          background-color: #f0f0f5;
          color: #222;
          transition: all 0.3s ease-in-out;
          outline: none;
        }

        input[type="text"]:focus {
          border-color: #111113;
          box-shadow: 0 0 12px rgba(17, 17, 17, 0.7);
          background-color: #ffffff;
        }
      </style>

      <div class="search-box">
        <input type="text" placeholder="🔍 Buscar personaje por seudonimo o nombre clave..." />
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

  const todasLasCartas = document.querySelectorAll(".cartas-dc, .cartas-marvel");

  todasLasCartas.forEach(hero => {
    const nombre = hero.querySelector("nombre");
    if (!nombre) return;


    const nameText = nombre.textContent.toLowerCase();
    hero.style.display = nameText.includes(searchText) ? "block" : "none";
  });
});
