
const apikey = '12e7d6c65fd2727e9bb5947a3803b860';
const url = 'https://gnews.io/api/v4/search?q=';

let SearchBtn=document.getElementById("searchBtn");
let inputData=document.getElementById("inputData");

let cardData=document.querySelector(".cardData");
let searchType=document.getElementById("type");


inputData.addEventListener('keyup', (event) => {
    if(inputData.value.trim()==""){
        return ;
    }
    if (event.keyCode=== 13) {
      SearchBtn.click();
    }
});

const getData =(query) =>{

fetch(`${url}${query}&lang=en&apikey=${apikey}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    articles = data.articles;
    searchType.innerText="Search : "+query;
    inputData.value="";
    cardData.innerHTML="";

    for (i = 0; i < articles.length; i++) {

      let divs=document.createElement("div");
        divs.classList.add("card");
        cardData.appendChild(divs);
        divs.innerHTML=`
        <img src="${articles[i]['image']}" alt="Loading">
                <h3>${articles[i]['title']}</h3>
                <p>${articles[i]['description']}</p>
                
        `
        let link =articles[i]['url'];
        divs.addEventListener("click",function(){
            window.open(link);
        }); 
    }
  });

}
window.addEventListener("load",function(){
    getData("India");
})

SearchBtn.addEventListener("click",function(){
    if(inputData.value.trim()==""){
        return ;
    }
    let inputText=inputData.value;
    getData(inputText);
})


function navClick(navName){
    if(navName=="politics"){
        document.getElementById("politics").style.color="rgb(0, 140,255)";
        document.getElementById("sports").style.color="white";
        document.getElementById("technology").style.color="white";
    }
    if(navName=="sports"){
        document.getElementById("politics").style.color="white";
        document.getElementById("sports").style.color="rgb(0, 140,255)";
        document.getElementById("technology").style.color="white";
    }
    if(navName=="technology"){
        document.getElementById("politics").style.color="white";
        document.getElementById("sports").style.color="white";
        document.getElementById("technology").style.color="rgb(0, 140,255)";
    }
    getData(navName);
}
