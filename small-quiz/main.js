$(document).ready(function(){
    //建立currentQuiz,儲存目前作答到第幾題
    let currentQuiz=null;
    let score=0;
    //當按下按鈕後，要做的事情放在這裡面
    $("#startButton").click(function(){
        //如果還沒作答就從這裡開始
        if(currentQuiz==null){
            $("#illustration").attr("src","");
            //設定目前作答到第0題
            currentQuiz=0;
            //顯示題目
            $("#question").text(questions[0].question);
            //清空選項區域
            $("#options").empty();
            //加入選項
            for(let x=0;x<questions[0].answers.length;x++){
                $("#options").append(
                    "<input name='options' type='radio' value="+x+">"+
                    "<label>"+questions[0].answers[x][0]+
                    "</label><br><br>"
                );
            }
            //將按鈕文字換成Next或下一題
            $("#startButton").attr("value","Next");
        }else{ //如果已經開始作答就從這裡繼續
            //巡訪每選項是否有被選取
            $.each(
                $(":radio"),function(i,val){ //function(index,value)
                    if(val.checked){
                        if(currentQuiz==9){
                            //顯示最終成果
                            $("#question").text("共答對"+score+"題！");
                            //清空選項區域
                            $("#options").empty();
                            //顯示最終成果內容
                            if(score>=9){
                                $("#options").append("恭喜你成為園藝小達人！<br>");
                                $("#illustration").attr("src",images[0]);
                            } 
                            else if(score<=3){
                                $("#options").append("看來你對園藝還不太熟悉喔！<br>");
                                $("#illustration").attr("src",images[1]);
                            }
                            else{
                                $("#options").append("再接再厲!<br>");
                                $("#illustration").attr("src",images[2]);
                            }
                            //將目前作答到第幾題的變數清空
                            currentQuiz=null;
                            score=0;
                            //修改按鈕為重新開始
                            $("#startButton").attr("value","Restart");
                        }else{
                            score+=questions[currentQuiz].answers[i][1];
                            currentQuiz++;
                            //顯示新的題目
                            $("#question").text(questions[currentQuiz].question);
                            //清空舊的選項內容
                            $("#options").empty();
                            //顯示新的選項內容
                            for(let x=0;x<questions[currentQuiz].answers.length;x++){
                                $("#options").append(
                                    "<input name='options' type='radio' value"+x+">"+
                                    "<label>"+questions[currentQuiz].answers[x][0]+
                                    "</label><br><br>" 
                                );
                            }
                        }
                        //完成後即可跳離迴圈
                        return false;
                    }
                }
            )
        }
    });
})