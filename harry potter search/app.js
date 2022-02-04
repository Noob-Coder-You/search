const search = document.querySelector("#search");
const template = document.querySelector("template");
const items = document.querySelector(".items");
let charArray = [];
const loadChar = async function () {
  const res = await fetch("http://hp-api.herokuapp.com/api/characters");
  charArray = (await res.json()).slice(0, 24);
  return charArray;
};
loadChar().then(data => {
  displayChar(data);
});

function displayChar(datas) {
  datas.forEach(data => {
    const templateClone = template.content.cloneNode(true);
    const name = templateClone.querySelector(".name");
    name.innerText = data.name;
    const house = templateClone.querySelector(".house");
    house.innerText = data.house;
    const img = templateClone.querySelector("img");

    img.src = data.image;
    items.appendChild(templateClone);
  });
}

console.log(template);

search.addEventListener("keyup", e => {
  const searchTerm = e.target.value.toLowerCase();
  const match = charArray.filter(info => {
    return (
      info.name.toLowerCase().includes(searchTerm) ||
      info.house.toLowerCase().includes(searchTerm)
    );
  });
  items.innerHTML = "";
  displayChar(match);
});
