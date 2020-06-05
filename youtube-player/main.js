var player; //Youtube播放器
var currentPlay = 0;

function onYouTubeIframeAPIReady(){
    console.log("onYouTubeIframeAPIReady");
    player = new YT.Player("player",{
        height:"487.5",
        width:"800",
        videoId:playList[currentPlay],
        playerVars:{
            "autoplay":0, //不自動播放
            "controls":0, //不顯示控制項
            "start":playTime[currentPlay][0],
            "end":playTime[currentPlay][1],
            "showinfo":0, //關掉上方標題，2018/9/25被廢除
            "rel":0,
            "iv_load_policy":3 //不顯示影片註解式行銷
        },
        events:{
            "onReady":onPlayerReady,
            "onStateChange":onPlayerStateChange
        }
    });
}

function onPlayerReady(event){
    console.log("onPlayerReady");
    $("#playButton").click(function(){
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    });
}

function onPlayerStateChange(event){
    console.log("onPlayerStateChange");
    if(Math.floor(player.getCurrentTime())==playTime[currentPlay][1]){   
        //正常播下一首
        if(currentPlay<playList.length-1){
            currentPlay++;
            player.loadVideoById({
                "videoId":playList[currentPlay],
                "startSeconds":playTime[currentPlay][0],
                "endSeconds":playTime[currentPlay][1],
                "suggestedQuality":"large"
            });    
        }else{ //已經播到最後一首的話，就將第一首準備好，並且停止播放
            currentPlay = 0;
            player.cueVideoById({
                "videoId":playList[currentPlay],
                "startSeconds":playTime[currentPlay][0],
                "endSeconds":playTime[currentPlay][1],
                "suggestedQuality":"large"
            });
        } //影片開始時抓取影片標題來顯示
    }
    console.log(player.getVideoLoadedFraction());
    if(player.getVideoLoadedFraction()>0){
        $("h2").text(player.getVideoData().title);
    }
}