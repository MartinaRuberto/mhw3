
const btn= document.querySelector('#get_meal.button');
btn.addEventListener('click',get_meal);

function onResponse(response){
    return response.json();
}

function get_meal(event)
{

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(onResponse).then(onJson);
}

function onJson(json){

    console.log('jason derulo');
    console.log(json);

    const meal=json.meals[0];

    const meal_container = document.querySelector('#meal');
    const img= document.createElement('img');
    img.classList.add('image');
    meal_container.innerHTML='';
    img.src=meal.strMealThumb;
    meal_container.appendChild(img);
}

const id_client = '17b85217111d4f88ad4ca541d0181f11';
const id_Client_Secret ='18fcef047582472ab0160ee8ffe42f16';
let token;
const button_cerca= document.querySelector('form');
button_cerca.addEventListener('submit',Cerca);

function onTokenResponse(response){
    return response.json();
}

function onTokenJson(json){
    console.log(json);
    token=json;
}
//richiesta token
fetch("https://accounts.spotify.com/api/token",
{
    method: "post",
    body: 'grant_type=client_credentials',
    headers:
    {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(id_client + ':' + id_Client_Secret )
    }
}
).then(onTokenResponse).then(onTokenJson);

function onResult(response){
    return response.json();
}

function onJsonFinal(json){
    console.log(json);
    const spotify_view=document.querySelector('#spotify-view');
    spotify_view.innerHTML='';
    const song= json.tracks.items[0].name;
    const img= json.tracks.items[0].album.images[0].url;
    
    const suono_link=document.createElement('a');
    suono_link.href=json.tracks.items[0].uri;
    const play=document.createElement('img');
    play.src="play.png";
    play.classList.add('img_play');
    const album=document.createElement('div');
    album.classList.add('album');
    const image=document.createElement('img');
    image.src=img;
    image.classList.add('image');
    const title=document.createElement('span');
    title.classList.add('span');
    title.textContent=song;
    album.appendChild(title);
    album.appendChild(image);
    suono_link.appendChild(play);
    album.appendChild(suono_link);
    
    spotify_view.appendChild(album);
}

function Cerca(event){
event.preventDefault();
const text=document.querySelector('#song').value;
const encodedText= encodeURIComponent(text);
fetch("https://api.spotify.com/v1/search?type=track&q=" +  encodedText,
    {
        headers:
        {
            'Authorization': 'Bearer ' + token.access_token 
        }
    }
).then(onResult).then(onJsonFinal);
}




