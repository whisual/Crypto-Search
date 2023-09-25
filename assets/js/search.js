


function searchData(){
    const currentURL=window.location.href;
    const url_obj=new URL(currentURL);
    const params = new URLSearchParams(url_obj.search);
    if(!params.has('q')){
        return;
    }

    document.getElementsByName('q')[0].value = params.get('q');
    fetch('https://api.coingecko.com/api/v3/search?query=' + params.get('q'))
    .then(convertToJson)
    .then(render);
}


function render(data){
    for (let i=0;i<data.coins.length;i++)
    {
        const singlecoin=data.coins[i];
        console.log(singlecoin);

        const index=i+1;
        const logo =singlecoin.thumb;
        const name =singlecoin.name;
        const symbol=singlecoin.id;
        const coinId=singlecoin.id;
        createSingleCard(index,logo,name,symbol,coinId);
    }
}

function createSingleCard(index , logo, name, symbol, coinId)
{

    const id_elem=document.createElement('p');
    id_elem.innerHTML=index;
    const logo_elem=document.createElement('img');
    logo_elem.src=logo;
    logo_elem.alt="logo";
    const name_elem=document.createElement('h3');
    name_elem.innerText=name;
    const symbol_elem=document.createElement('h3');
    symbol_elem.innerText=symbol;
    const anchor_elem=document.createElement('a');
    anchor_elem.innerText="More Info"
    anchor_elem.href="./detail.html?id=" + coinId;

    const container_elem=document.createElement('div');
    container_elem.classList.add('single-search-result', 'card');
    
    container_elem.appendChild(id_elem);
    container_elem.appendChild(logo_elem);
    container_elem.appendChild(name_elem);
    container_elem.appendChild(symbol_elem);
    container_elem.appendChild(anchor_elem);

    document.getElementById('search-results').appendChild(container_elem);


}




window.onload=function(){

    searchData();
}
