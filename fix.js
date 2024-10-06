class ToDoList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li {
          padding: 10px;
          border-bottom: 1px solid #ccc;
        }
        li:last-child {
          border-bottom: none;
        }
      </style>
      <ul></ul>
      <input type="text" placeholder="Add item">
      <button>Add</button>
    `;
    this.items = [];
    this.shadowRoot.addEventListener("DOMContentLoaded", () => {
      this.shadowRoot.querySelector("button").addEventListener("click", () => {
        const input = this.shadowRoot.querySelector("input");
        const item = input.value.trim();
        if (item) {
          this.items.push(item);
          this.renderList();
          input.value = "";
        }
      });
      this.shadowRoot.addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
          const index = this.items.indexOf(event.target.textContent);
          this.items.splice(index, 1);
          this.renderList();
        }
      });
    });
  }

  renderList() {
    const list = this.shadowRoot.querySelector("ul");
    list.innerHTML = "";
    this.items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
  }
}

class WeatherElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      </style>
      <h2>Current Weather</h2>
      <p id="current-weather"></p>
    `;
    this.location = this.getAttribute("location");
    if (!this.location) {
      console.error("Location attribute is required");
    } else {
      this.fetchWeatherData();
    }
  }

  fetchWeatherData() {
    fetch(`http://wttr.in/${this.location}?format=3`)
      .then(response => response.text())
      .then(data => {
        this.renderCurrentWeather(data);
      });
  }

  renderCurrentWeather(data) {
    const currentWeather = this.shadowRoot.querySelector("#current-weather");
    currentWeather.textContent = data;
  }
}

customElements.define("todo-list", ToDoList);
customElements.define("weather", WeatherElement);
