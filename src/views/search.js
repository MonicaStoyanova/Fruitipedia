import { searchFruit } from "../api/data.js";
import { html } from "../lib.js";

const searchTemplate = (onSearch, fruit) => html`
  <section id="search">
    <div class="form">
      <h2>Search</h2>
      <form @submit=${onSearch} class="search-form">
        <input type="text" name="search" id="search-input" />
        <button class="button-list">Search</button>
      </form>
    </div>
    <h4>Results:</h4>
    ${fruit != undefined
      ? html`
          <div class="search-result">
            ${fruit.length == 0
              ? html` <p class="no-result">No result.</p>`
              : fruit.map(
                  (p) => html` <div class="fruit">
                    <img src="${p.imageUrl}" alt="example1" />
                    <h3 class="title">${p.name}</h3>
                    <p>"${p.description}"</p>
                    <a class="details-btn" href="/details/${p._id}"
                      >More Info</a
                    >
                  </div>`
                )}
          </div>
        `
      : ""}
  </section>
`;

export function showSearch(ctx) {
  ctx.render(searchTemplate(onSearch, undefined));

  async function onSearch(event) {
    event.preventDefault();
    const searchName = document.querySelector("#search-input").value;

    const fruit = await searchFruit(searchName);
    ctx.render(searchTemplate(undefined, fruit));
  }
}
