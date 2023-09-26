const ts =1;
const privatekey = "852d39a3cc4c0dd6b73111eb66da06db0ab61e03"; 
const publickey = "6c921bc276d308c6784937cce8063c07";
var value = ts+privatekey+publickey;
var hash = CryptoJS.MD5(value).toString();
let showfav = JSON.parse(localStorage.getItem("favourite"));

const favContainer = document.getElementById("fav-container");
let favArray = [];

// function to set id in localStorage for herodetail page 
function openDetail(id){
    localStorage.setItem("id",id);
}

// function to create card for favourite list and append it into favlist display 
function FavouritelistCard(data){
    let div = document.createElement("div");
    div.classList.add("col-sm-6", "col-md-4", "col-lg-3");
    div.innerHTML=`
    <div class="card" style="width: 18rem;">
        <a onclick="openDetail(${data.id})" href="Herodetail.html"><img src="${data.thumbnail.path}.jpg" class="card-img-top img-width" alt="${data.name}"></a>
        <div class="card-body">
            <h5 class="card-title"><a onclick="openDetail(${data.id})" href="Herodetail.html">${data.name}</a></h5>
            <a href="#" class="btn btn-danger" onclick="RemoveFavourite(${data.id})">Remove from Favourite</a>
        </div>
    </div>
    `;
    favContainer.append(div);
}

// function to display fav list 
function favlist(favArray){
    favContainer.innerHTML="";
    for (i=0 ; i<favArray.length; ++i) {
        FavouritelistCard(favArray[i][0]);
    }
}

// function to remove hero from favourite list 
function RemoveFavourite(id){
    let index=-1;
    for(let i=0 ;i<showfav.length;i++){
        if(showfav[i]===id){
            index=i;
        }
    }
    if(index>-1){
        showfav.splice(index,1);
    }
    let changeinString = JSON.stringify(showfav);
    localStorage.setItem("favourite",changeinString);
    favArray=[];
    showfavourite();
    alert("Hero Remove from Favourite List");
}

// function to fetch data from marvel api for favourite list 
async function fetchDataForFav(id){
    let characters = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=6c921bc276d308c6784937cce8063c07&hash=${hash}`
    const response = await fetch(characters);
    const herodata = await response.json();
    const data = herodata.data.results
    favArray.push(data);
    favlist(favArray);
}

// function to show favlist card and favlist 
function showfavourite(){
    for(let i=0;i<showfav.length;i++){
        fetchDataForFav(showfav[i]);
    }
}
showfavourite()
