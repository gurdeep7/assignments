 var hidden = document.getElementsByClassName("hidden")
 let i = 0;
 var grid = document.getElementById("grid")
console.log(hidden)
 function sidebar(){
     if(i == 0){
     for(let i = 0; i < hidden.length; i++){
         hidden[i].style.display = "inline-block"
     }
     i++;
    }else{
        for(let i = 0; i < hidden.length; i++){
            hidden[i].style.display = "none"
        }
        i = 0;
    }
 }
async function Search(){
    grid.innerHTML = null;
    let search = document.getElementById("search").value
    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${search}&type=video&key=AIzaSyAxNvQuD7hhfL1FSv_mfjPgtrz87IKQclo&maxResults=20&part=snippet`)
    let data = await res.json();


console.log("Data:", data);
appendsearchvideos(data.items)
}

function appendsearchvideos(video_data){
    video_data.forEach(({id:{videoId},snippet:{description,channelTitle}}) => {
        let div2 = document.createElement("div")
        div2.style.width= "1000px"
        div2.style.margin = "20px"
        div2.style.boxSizing="border-box"
        div2.innerHTML = `<iframe width="400px" height="300px" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        let snippet2 = document.createElement("div")
        snippet2.style.width = "600px"
        snippet2.style.verticalAlign= "top"
        snippet2.style.display= "inline-block"
        snippet2.innerHTML = `<h3>${description}<h3>
        <h5>${channelTitle}</h5>`
        div2.append(snippet2)
        grid.append(div2)
     });
}