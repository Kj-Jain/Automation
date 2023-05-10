const puppie = require('puppeteer');
// console.log(puppie.version());
const fs = require('fs')
const pdf = require('pdfkit')


let page
(async function(){
    try{
        let browserOpen = puppie.launch({
         
            headless: false,
            defaultViewport:null,
            args :['--start-maximized']
        })

        let browserIns = await browserOpen
        let allTabArr = await browserIns.pages();
        page = allTabArr[0]
     
        await page.goto('https://www.youtube.com/playlist?list=PLW-S5oymMexXTgRyT3BWVt_y608nt85Uj')
        await page.waitForSelector('.style-scope.yt-dynamic-sizing-formatted-string.yt-sans-28')
      
        let nameOfPlaylist = await page.evaluate
        (
            function(select){
            return document.querySelector(select).innerText} ,'.style-scope.yt-dynamic-sizing-formatted-string.yt-sans-28'
            )

        console.log(nameOfPlaylist);


await page.waitForSelector('.byline-item.style-scope.ytd-playlist-byline-renderer')
      
        let Likes_Views = await page.evaluate(Video_Likes,' .byline-item.style-scope.ytd-playlist-byline-renderer')
        
        let totalVideo = Likes_Views.videoLength.split(" ")[0]-13;

        console.log(Likes_Views.videoLength,Likes_Views.videoLikes)


        // total video 778 but 13 videos are unavailabel to solve this problem 
        //  totalvideo - 13 = 765;
        // let unavailabelVideo = 13;

        // let exactVideo = totalVideo-unavailabelVideo;
        // console.log(exactVideo)
        
        let cPageVideo = await videoLength()
       



        
        while(totalVideo-cPageVideo>=20){
             await page.evaluate(function(){window.scrollBy(0,window.innerHeight)})
           
             cPageVideo = await videoLength();
             console.log(cPageVideo)

           
            }
            console.log("after ------=============")
            for(let i = 0 ; i<12 ; i++){
                await page.evaluate(function(){window.scrollBy(0,window.innerHeight)})
                console.log("hu",i)
           
            }

            // geting name and video timing

            await page.waitForSelector('span#text.style-scope.ytd-thumbnail-overlay-time-status-renderer')
            await new Promise(resolve => setTimeout(resolve,3000))

            let finalList = await page.evaluate(VName_Time,'span#text.style-scope.ytd-thumbnail-overlay-time-status-renderer','a#video-title.yt-simple-endpoint.style-scope.ytd-playlist-video-renderer')
            console.log(finalList)

            await new Promise(resolve => setTimeout(resolve,2000))
            const pdfFile = new pdf()
            pdfFile.pipe(fs.createWriteStream('youtubePlayList.pdf'))
            pdfFile.text(JSON.stringify(finalList))
            pdfFile.end()

            await new Promise(resolve => setTimeout(resolve,5000))
            page.close()
                      
        }
        















     
    
    catch(error){
        console.log(error)


    }
})()
async function videoLength(){
    let length = await page.evaluate(  function(duration){

        let durationelement = document.querySelectorAll(duration)
    return durationelement.length}
,'#thumbnail .yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail')

    return length
}

function Video_Likes (select){
    let alldata = document.querySelectorAll(select)
    let videoLength = alldata[0].innerText
    let videoLikes = alldata[1].innerText;
    return{
        videoLength ,
        videoLikes
    }
}

function VName_Time(Vname ,Vtime){
    let videoname = document.querySelectorAll(Vname)
    let videotime = document.querySelectorAll(Vtime);
    let arr = []

    for(let i = 0 ; i< videoname.length ; i++){
        let  name  = videoname[i].innerText;
        let time = videotime[i].innerText;
        arr.push({name,time})
    }
    return arr
}

