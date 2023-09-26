
const herodetail = document.getElementById("herodetail-container");
const ts =1;
const privatekey = "852d39a3cc4c0dd6b73111eb66da06db0ab61e03"; 
const publickey = "6c921bc276d308c6784937cce8063c07";
var value = ts+privatekey+publickey;
var hash = CryptoJS.MD5(value).toString();
console.log(hash);

let fav = [1009368,1017320];

function addFavourite(data){
    fav.push(data);
    let changeinString = JSON.stringify(fav)
    localStorage.setItem("favourite",changeinString)
    console.log(localStorage.getItem("favourite"));

}

function displayherodetail(data){
    herodetail.innerHTML="";
    let container = document.createElement("div");
    container.setAttribute("id","detailblock");

    container.innerHTML=`
            <div id="heading">
                <h1>${data.name}</h1>
                <hr />
            </div>
            <div id="hero-img-personaldetail">
                <div id="hero-img">
                    <img src="${data.thumbnail.path}.jpg" alt="${data.name}">
                </div>
                <div id="hero-personaldetail">
                    <div><h5>Id: </h5><span> ${data.id}</span></div>
                    <div><h5>Comics: </h5><span> ${data.comics.available}</span></div>
                    <div><h5>Series: </h5><span> ${data.series.available}</span></div>
                    <div><h5>Stories: </h5><span> ${data.stories.available}</span></div>
                </div>
            </div>
            <hr />
            <div id="hero-detail-column">
                <h2>Details</h2>
                <p>${data.description? data.description:"No description Available"}</p>
            </div>
            <div id="favouriteBtn">
                <button onclick="addFavourite(${data.id})" class="addtofav"><i class="fa-solid fa-bookmark" style=" margin: 0px 10px;"></i>Add to Favourite</button>
            </div>
    `;
    herodetail.append(container);
}
async function openDetail(id){
    let characters = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=6c921bc276d308c6784937cce8063c07&hash=${hash}`
    const response = await fetch(characters);
    const herodata = await response.json();
    const data = herodata.data.results
    console.log(data);
    displayherodetail(data[0])
}
let id= localStorage.getItem("id");
document.addEventListener("load",openDetail(id));