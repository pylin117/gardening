/*
window.onload=function(){
    //this.document.write("Hello JavaScript!");
};*/

//$ jquery識別符號
$(document).ready(function(){
    $("#choice").hide();
    let numberOfListItem;
    let randomChildNumber;
    $("input").click(function(){
        //let numberOfListItem=$("#choices li").length;
        numberOfListItem=plants.length;
        randomChildNumber=Math.floor(Math.random()*numberOfListItem); //Math.floor向下整數
        //$("#random-result").text($("#choices li").eq(randomChildNumber).text());
        $("#random-result").text(plants[randomChildNumber]);
        //$("#img").attr("src","img"+randomChildNumber+".jpg"); //更改圖片
        $("#random-pic").attr("src",pictures[randomChildNumber]);
        console.log(characteristic[randomChildNumber]);
        $("#random-characteristic").text(characteristic[randomChildNumber]);
    });

    for(let i=0;i<plants.length;i++){
        $('#menu').append('<li class="menu_btn" href="#" id="'+i+'">'+plants[i]+"</li>");
    }
    
    $('.menu_btn').click(function(){
        numberOfListItem=plants.length;
        randomChildNumber=$(this).attr('id');
        console.log(randomChildNumber);
        //$("#random-result").text($("#choices li").eq(randomChildNumber).text());
        $("#random-result").text(plants[randomChildNumber]);
        //$("#img").attr("src","img"+randomChildNumber+".jpg"); //更改圖片
        $("#random-pic").attr("src",pictures[randomChildNumber]);
        console.log(characteristic[randomChildNumber]);
        $("#random-characteristic").text(characteristic[randomChildNumber]);
    })
});