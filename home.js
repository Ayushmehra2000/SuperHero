const search = document.getElementById("search");
const searchResult = document.getElementById("search-items");
const ts =1;
const privatekey = "852d39a3cc4c0dd6b73111eb66da06db0ab61e03"; 
const publickey = "6c921bc276d308c6784937cce8063c07";
var value = ts+privatekey+publickey;
var hash = CryptoJS.MD5(value).toString();
console.log(hash);

let fav = [1009368,1017320];

function openDetail(id){
    localStorage.setItem("id",id);
}
function addFavourite(data){
    fav.push(data);
    let changeinString = JSON.stringify(fav)
    localStorage.setItem("favourite",changeinString);
    alert("Hero Added to Favourite");  
}
const card = (hero)=>{
    let heroCard=document.createElement('div');
    heroCard.innerHTML=`
    <div class="search-item">
        <a href="Herodetail.html"><img onclick="openDetail(${hero.id})" src="${hero.thumbnail.path}.jpg" alt="${hero.name}"></a>
        <span onclick="openDetail(${hero.id})" class="name" id="name" heroid=${hero.id}><a href="Herodetail.html">${hero.name}</a></span>
        <span onclick="addFavourite(${hero.id})" class="favbtn"><i class="fa-solid fa-bookmark" ></i></span></div>
    </div>
    `;
    searchResult.append(heroCard)
}

function displaydata(heros){
    searchResult.innerHTML="";
    for(let i=0;i<heros.length;i++) {
        card(heros[i]);
    }
}

async function loadHerodata(textSearched) {
    let update = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${textSearched}&limit=100&ts=1&apikey=6c921bc276d308c6784937cce8063c07&hash=${hash}`
    if(textSearched === 0){
        return;
    }
    const response = await fetch(update);
    const movies = await response.json();
    const data = movies.data.results
    displaydata(data);
}

search.addEventListener("input",()=>loadHerodata(search.value));
// loadHerodata();