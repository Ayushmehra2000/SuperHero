
const herodetail = document.getElementById("herodetail-container");
const ts =1;
const privatekey = "852d39a3cc4c0dd6b73111eb66da06db0ab61e03"; 
const publickey = "6c921bc276d308c6784937cce8063c07";
var value = ts+privatekey+publickey;
var hash = CryptoJS.MD5(value).toString();

let fav = [];

let toggle = false;


// function to check if hero is present in favourite list or not 
function checkHeroInFavouriteList(data){
    let check = false;
    for(let i=0;i<fav.length;i++){
        if(fav[i] === data){
            check = true;
        }
    }
    return check;
}

// function to add hero in favourite list 
function addFavourite(data){
    // Checking the chero is in favourite list or not 
    let checkHero = checkHeroInFavouriteList(data);
    if(checkHero){
        alert("Hero is already in your favourites");
        return;
    }

    // if not the add the hero to Favourite list 
    fav.push(data);
    let changeinString = JSON.stringify(fav)
    localStorage.setItem("favourite",changeinString);
    alert("Hero Added to Favourite");
    updatefavourite();
}

// function to display the deatails of hero in herodeatails page
function displayherodetail(data){
    herodetail.innerHTML="";
    let container = document.createElement("div");
    container.setAttribute("id","detailblock");
    toggle = checkHeroInFavouriteList(data.id);
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



// function to update favourite list after add to favlist 
function updatefavourite(){
    let updatefav = JSON.parse(localStorage.getItem("favourite"));
    fav=[];
    for(let i=0;i<updatefav.length;i++){
        fav.push(updatefav[i]);
    }
}

// function to fetch data from Marvel Api for herodetail page 
async function openDetail(id){
    let characters = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=6c921bc276d308c6784937cce8063c07&hash=${hash}`
    const response = await fetch(characters);
    const herodata = await response.json();
    const data = herodata.data.results
    displayherodetail(data[0]);
    updatefavourite();
}
let id= localStorage.getItem("id");
document.addEventListener("load",openDetail(id));