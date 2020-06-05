//ctx: HTML5 Canvas使用
let mapArray, ctx, currentImgMainX=0, currentImgMainY=0;
let currentImgStoneX=0,currentImgStoneY=0;
let imgRanger, imgMain, imgStone, imgGoal;
let count=0; //計算達終點的個數

$(document).ready(function(){
    //0:可走, 1:障礙物, 2:終點, 3:敵人, 4:初始地點
    mapArray = [[0,0,1,1,1,0,0,0],
                [0,0,1,2,1,0,0,0],
                [0,0,1,0,1,1,1,1],
                [1,1,1,3,0,3,2,1],
                [1,2,0,3,4,1,1,1],
                [1,1,1,1,3,1,0,0],
                [0,0,0,1,2,1,0,0],
                [0,0,0,1,1,1,0,0]];
    ctx = $("#myCanvas")[0].getContext("2d");

    //擺障礙物與敵人
    imgMain = new Image();
    imgMain.src = "simple-rpg/images/spriteSheet.png";
    imgRanger = new Image();
    imgRanger.src = "simple-rpg/images/ranger.png";
    imgStone = new Image();
    imgStone.src = "simple-rpg/images/material.png";
    imgGoal = new Image();
    imgGoal.src = "simple-rpg/images/goal.png";
    imgRanger.onload = function(){
        for(let x=0;x<8;++x){
            for(let y=0;y<8;++y){
                if(mapArray[x][y]==1){
                    ctx.drawImage(imgRanger,0,0,32,32,x*100,y*100,100,100);
                }
            }
        }
    }
    imgMain.onload = function(){
        for(let x=0;x<8;++x){
            for(let y=0;y<8;++y){
                if(mapArray[x][y]==4){
                    currentImgMainX=x*100;
                    currentImgMainY=y*100;
                    ctx.drawImage(imgMain,0,0,80,130,currentImgMainX+20,currentImgMainY,80,100);
                }
            }
        }
    }

    imgStone.onload = function(){
        for(let x=0;x<8;++x){
            for(let y=0;y<8;++y){
                if(mapArray[x][y]==3){
                    ctx.drawImage(imgStone,0,192,32,32,x*100+6,y*100+6,90,90);
                }
            }
        }
    }
    
    imgGoal.onload = function(){
        for(let x=0;x<8;++x){
            for(let y=0;y<8;++y){
                if(mapArray[x][y]==2){
                    ctx.drawImage(imgGoal,0,0,32,32,x*100+17,y*100+15,70,70);
                }
            }
        }
    }
});

$(document).keydown(function(event){
    let targetImgMainX,targetImgMainY,targetBlockX,targetBlockY,cutImagePositionX;
    let targetImgStoneX,targetImgStoneY;
    //targetBlock 主角即將移過去的那一格編號
    //cutImagePositionX 依據主角朝向什麼方向而決定的圖片
    event.preventDefault();
    //避免點擊鍵盤出現瀏覽器的其他行為
    console.log(event);

    switch(event.keyCode){
        case 37:
            targetImgMainX = currentImgMainX-100;
            targetImgMainY = currentImgMainY;
            currentImgStoneX = currentImgMainX-100;
            currentImgStoneY = currentImgMainY;
            targetImgStoneX = currentImgStoneX-100;
            targetImgStoneY = currentImgStoneY;
            cutImagePositionX = 175;
            break;
        case 38:
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY-100;
            currentImgStoneX = currentImgMainX;
            currentImgStoneY = currentImgMainY-100;
            targetImgStoneX = currentImgStoneX;
            targetImgStoneY = currentImgStoneY-100;
            cutImagePositionX = 355;
            break;
        case 39:
            targetImgMainX = currentImgMainX+100;
            targetImgMainY = currentImgMainY;
            currentImgStoneX = currentImgMainX+100;
            currentImgStoneY = currentImgMainY;
            targetImgStoneX = currentImgStoneX+100;
            targetImgStoneY = currentImgStoneY;
            cutImagePositionX = 540;
            break;
        case 40:
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY+100;
            currentImgStoneX = currentImgMainX;
            currentImgStoneY = currentImgMainY+100;
            targetImgStoneX = currentImgStoneX;
            targetImgStoneY = currentImgStoneY+100;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }

    //在邊界內
    if(targetImgMainX<=800 && targetImgMainX>=0 &&
        targetImgMainY<=700 && targetImgMainY>=0){
            targetBlockX = targetImgMainX/100;
            targetBlockY = targetImgMainY/100;
    }else{ //超出邊界
        targetBlockX = -1;
        targetBlockY = -1;
    }

    //清除主角原本所在位置
    let move=false; //石頭是否要動  
    ctx.clearRect(currentImgMainX,currentImgMainY,100,100);
    if((targetBlockX == -1 && targetBlockY == -1) || mapArray[targetBlockX][targetBlockY] == 1){
        //所有異常(出界、遇到障礙物都不動)
    }else if(mapArray[targetBlockX][targetBlockY] == 3){
        if(mapArray[targetImgStoneX/100][targetImgStoneY/100] != 1 || targetBlockX == -1 && targetBlockY == -1){
            ctx.clearRect(currentImgStoneX,currentImgStoneY,100,100);
            currentImgStoneX = targetImgStoneX;
            currentImgStoneY = targetImgStoneY;
            mapArray[targetBlockX][targetBlockY] = 0;
            if(mapArray[targetImgStoneX/100][targetImgStoneY/100] == 2){
                count=count+1;
                console.log("count="+count);
                $("#talkbox").text("還差"+(4-count)+"個");
            }
            mapArray[targetImgStoneX/100][targetImgStoneY/100] = 3;
            move=true;
            currentImgMainX = targetImgMainX;
            currentImgMainY = targetImgMainY;
        }            
        //遇到石頭
    }else{
        $("talkbox").empty();
        currentImgMainX = targetImgMainX;
        currentImgMainY = targetImgMainY;
    }
    //在新位置上畫上主角
    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMainX+20,currentImgMainY,80,100);
    if(move==true)
        ctx.drawImage(imgStone,0,192,32,32,currentImgStoneX+6,currentImgStoneY+6,90,90);
    if(count==4){
        $("#talkbox").text("完成");
    }
        
    //對應用文字顯示狀態
    switch(mapArray[targetBlockX][targetBlockY]){
        case undefined:
            $("#talkbox").text("邊界");
            break;
        case 1:
            $("#talkbox").text("邊界");
            break;
        case 2:
            break;
        case 3:
            $("#talkbox").text("邊界");
            break;
    }
});