const key="0f31d84dd451445da26bf194a1e8af82";
const url="https://newsapi.org/v2/everything?q=";
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
const getData = async(query) =>{
    let res=await fetch(`${url}${query}&apiKey=${key}`);
    const jsonData= await res.json();
    searchType.innerText="Search : "+query;
    inputData.value="";
    cardData.innerHTML="";
  
    jsonData.articles.forEach(function(article){
        if(!article.urlToImage) return;
        if((article.title.length+article.description.length)>270){
            return ;
        }
        let divs=document.createElement("div");
        divs.classList.add("card");
        cardData.appendChild(divs);
        divs.innerHTML=`
        <img src="${article.urlToImage}" alt="Loading">
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                
        `
        divs.addEventListener("click",function(){
            window.open(article.url)
        });
    });
}
window.addEventListener("load",function(){
    getData("Trending");
})

SearchBtn.addEventListener("click",function(){
    if(inputData.value.trim()==""){
        return ;
    }
    let inputText=inputData.value;
    getData(inputText);
});


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
