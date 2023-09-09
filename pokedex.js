const listPokemon = document.getElementById("list-pokemon");
const btnHeader = document.querySelectorAll(".btn-header");
let url = "https://pokeapi.co/api/v2/pokemon/";

for(let i = 1; i <= 151; i++){
    fetch(url+i).then((response)=> response.json())
    .then(data => showPokemon(data))
}

function showPokemon(data){

    let types = data.types.map((type) => `<p class="${type.type.name} type">${type.type.name}</p> `);
    types = types.join('');

    let dataId = data.id.toString();

    if(dataId.length === 1){
        dataId = "00" +dataId;
    }else if(dataId.length === 2){
        dataId = "0" + dataId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back"> ${dataId} </p>
        <div class="pokemon-img">
            <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
  </div>
    <div class="pokemon-info">
        <div class="name-container">
            <p class="pokemon-id">#${dataId} </p>
            <h2 class="pokemon-name">${data.name}</h2>
        </div>
        <div class="pokemon-type">
            ${types}
        </div>
        <div class="pokemon-stats">
            <p class="stats">${data.height}M</p>
            <p class="stats">${data.weight}KG</p>
        </div>
    </div>
    `;
    listPokemon.append(div);
}

btnHeader.forEach(btn =>{
    btn.addEventListener("click", (event)=>{
        const btnId = event.currentTarget.id;
        listPokemon.innerHTML = "";
        
        for(let i = 1; i <= 151; i++){
        fetch(url+i).then((response)=> response.json())
        .then(data =>{

            if(btnId === "see-all"){
                showPokemon(data);
            }else{
                const types = data.types.map(type => type.type.name);
                if(types.some(type => type.includes(btnId))){
                    showPokemon(data);
                }
            }

        
        })

    }


    }
)})