# 🦸♂️ Hero Arena - Marvel vs DC

Bienvenido a **Hero Arena**, una aplicación web interactiva desarrollada con **JavaScript Vanilla, HTML y CSS**, donde los universos de **Marvel** y **DC Comics** se enfrentan en una arena épica. Los usuarios pueden explorar personajes, descubrir sus habilidades y enfrentarlos en emocionantes batallas.

---

## 🚀 Características principales

- Aplicación 100% web responsiva.
- Basado en **HTML, CSS,** y **JavaScript Vanilla**.
- Uso de **JSON Server** como backend local para datos dinámicos.
- Diseño temático y personalizado según las franquicias Marvel y DC.
- Animaciones visuales interactivas y ventanas emergentes para una experiencia inmersiva.

---

## 📄 Estructura del sitio

### 🔹 Header Común (presente en todas las páginas principales):
- Logo del sitio
- Navegación: `Home` | `DC` | `Marvel` | `Arena`

### 🔸 Página 1 - Home (`index.html`)
- Mensaje de bienvenida con imagen decorativa acorde a la temática de superhéroes.
- Diseño visual atractivo como portal principal del sitio.

### 🔸 Página 2 - DC / Marvel
- Accesibles desde los botones `DC` y `Marvel` del header.
- Muestra una **galería de cartas** (una por cada personaje) con:
  - Imagen del personaje
  - Nombre clave
  - Botón **"Ver info."**
- Al hacer clic en **"Ver info."**:
  - Se despliega una **ventana animada (flip card o modal)** mostrando:
    - Nombre real
    - Descripción
    - Alias
    - Trajes
    - Características: Ataque, Fuerza, Debilidad, Daño
    - Botón para cerrar la ventana

### 🔸 Página 3 - Arena (`arena.html`)
Contiene 3 modos de juego:

#### 3.1 Modo Selección
- **Player vs Player:** Ambos jugadores escogen sus héroes.
- **Player vs PC:** Jugador escoge un héroe, la máquina escoge uno al azar.
- **PC vs PC:** Ambos héroes se seleccionan aleatoriamente.
- Métodos de selección:
  - Botón **"Random"** (elige un héroe al azar).
  - Botón **"Ver todos"** para mostrar las cartas disponibles y seleccionar.
- Una vez ambos héroes estén seleccionados:
  - Botón **"Luchar"** se activa para iniciar la batalla.

#### 3.2 Modo Combate
- Muestra las cartas de ambos héroes con sus características completas.
- Barra de vida para cada jugador.
- Botón **"Atacar"**, habilitado de forma intercalada.
- Al atacar:
  - Se muestra una **ventana emergente con animación o gif del héroe atacando.**
- Al terminar la batalla:
  - Se muestra un modal con el **héroe ganador** y un **mensaje de victoria.**

---