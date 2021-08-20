const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');

let photoArray=[];

// helper function to set Attribute on DOM Elements

function setAttributes(element,attributes){
  for(const key in attributes){
    element.setAttribute(key,attributes[key])
  }
}


//Create Elements for link & photos

function displayPhotos(){

  photoArray.forEach((photo)=>{
    //Cretae <a> link to unslpah

    const item = document.createElement('a');
    // item.setAttribute('href',photo.links.html);
    // item.setAttribute('target','_blank');

    setAttributes(item,{
      href:photo.links.html,
      target:'_blank',
    });

    // create <img> for photo

    const img=document.createElement('img');
    // img.setAttribute('src',photo.urls.regular);
    // img.setAttribute('alt',photo.alt_description);
    // img.setAttribute('title',photo.alt_description);

    setAttributes(img,{
      src:photo.urls.regular,
      alt:photo.alt_description,
      title:photo.alt_description,
    })

    //put <img> inside <a>, then put both inside image container

    item.appendChild(img);
    imageContainer.appendChild(item);

  });
}

// unsplash API

const count=10;
const apiKey='2aau97B58qfOpVfoMaz17cTQ-FDTdxWaRwVkZnMNoLI';

const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from unsplash api

async function getPhotos(){
  try{
    const response = await fetch(apiUrl);
    photoArray=await response.json();
    
    displayPhotos();

  }
  catch(error){

  }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll',()=>{

  if(window.innerHeight+window.scrollY >= document.body.offsetHeight - 1000){
    getPhotos();
  }

});

//on load
getPhotos();