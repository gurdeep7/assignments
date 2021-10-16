 var hidden = document.getElementsByClassName("hidden")
 let i = 0;
 var grid = document.getElementById("grid")
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
    grid.style.gridTemplateColumns = "1fr"
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

async function popualar(){
    grid.innerHTML= null;
    grid.style.gridTemplateColumns = "1fr 1fr 1fr 1fr"
    grid.style.gridGap= "10px";
    let res1 = await fetch("https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&key=AIzaSyAxNvQuD7hhfL1FSv_mfjPgtrz87IKQclo&part=snippet&maxResults=20&regionCode=IN")
    let data1 = await res1.json();
    console.log(res1)
    console.log("data:",data1)
    showpopualar(data1.items)
}
function showpopualar(video_data){
    video_data.forEach(({id,snippet:{channelTitle}}) => {
        let div2 = document.createElement("div")
        div2.style.margin = "20px"
        div2.style.boxSizing="border-box"
        div2.innerHTML = `<iframe width="300px" height="300px" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        let snippet2 = document.createElement("div")
        snippet2.style.verticalAlign= "top"
        snippet2.innerHTML = `<h5>${channelTitle}</h5>`
        div2.append(snippet2)
        grid.append(div2)
     });
}
popualar()

logincheck()

function logincheck(){
    if(localStorage.getItem("youtube")=== null){
        localStorage.setItem("youtube", JSON.stringify([]))
    }

    let user_details = JSON.parse(localStorage.getItem("youtube"))
    console.log(user_details)
}

function login(){
    window.location.href = "login.html"
}