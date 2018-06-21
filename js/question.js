var question;
if (!question)
	question = {};

question.TIME = 61;
question.quesList = [];
question.nowPageNum = 0;
question.pageLimit = 0;
question.timerIndex = question.TIME;
question.timer;
question.onLoad = function(){
	var bgArea = $("#questionBg");
	var textArea = $("#textArea");
	var bgHeight = textArea.width() * 0.643;
	bgArea.css("height",(bgArea.width() * 1.78) + "px")
	textArea.css("height", bgHeight + "px");

	question.initData();

	question.timerIndex = question.TIME;
	question.timer = setTimeout(question.timeMethod,1000);
};
question.timeMethod = function(){
	question.timerIndex--;
	if(question.timerIndex != 0){
		question.timer = setTimeout(question.timeMethod,1000);
		if(question.timerIndex <= 60){
			if(question.timerIndex == 59){
				$("#clockSreen").find(".clock_inBg").hide();
				$("#clockSreen").find(".clockSreen").show();
			}
			$("#clockSreen").find(".clockSreen").text(question.timerIndex);
		}
	}else{
		$("#clockSreen").find(".clockSreen").text(question.timerIndex);
		clearTimeout(question.timer);
		question.submitResult();
	}
}
question.initData = function(){
	
	$("#questionArea_list").html("");
	question.nowPageNum = 0;

	var qIndexList = common.getQuestionIndex();

	question.quesList = [];
	for(var i = 0; i < qIndexList.length; i++){
		var qIndex = qIndexList[i];
		var quesItem = QuestionDataUtil.qData[qIndex];
		question.quesList.push(quesItem);
	}
	question.pageLimit = question.quesList.length;
	for(var i = 0; i < question.pageLimit; i++){
		var qItem = '';
		if(i <= 2){
			switch (i) {
				case 0:
					qItem = '<li data-id="' + question.quesList[i].qId + '" id="ques_' + i + '" class="questionAreaList_item pageOne" style="z-index: ' + (question.pageLimit - i) + ';">' + 
							'<div class="questionText">' + question.quesList[i].title + '</div>';
					break;
				case 1:
					qItem = '<li data-id="' + question.quesList[i].qId + '" id="ques_' + i + '" class="questionAreaList_item pageTwo" style="z-index: ' + (question.pageLimit - i) + ';">' + 
							'<div class="questionText">' + question.quesList[i].title + '</div>' + 
							'<div class="pageChangeArea">';
					break;
				case 2:
					qItem = '<li data-id="' + question.quesList[i].qId + '" id="ques_' + i + '" class="questionAreaList_item pageThree" style="z-index: ' + (question.pageLimit - i) + ';">' + 
							'<div class="questionText">' + question.quesList[i].title + '</div>' + 
							'<div class="pageChangeArea">';					
					break;
				default:
					break;
			}
			
		}else{
			qItem = '<li data-id="' + question.quesList[i].qId + '" id="ques_' + i + '" class="questionAreaList_item pageThree" style="display:none;z-index: ' + (question.pageLimit - i) + ';">' + 
					'<div class="questionText">' + question.quesList[i].title + '</div>';
		}
		var ansList = question.quesList[i].qList;
		var questionState = "0";
		if(i == question.pageLimit -1){
			questionState = "1";
		}
		if(questionState == "1"){
			for (let j = 0; j < ansList.length; j++) {
				var aItem = '<div id="ans_' + ansList[j].id + '" data-id="' + questionState + '" onclick="question.chooseAnswer(this)" class="imgAnswerAreaBg"><img src="' + ansList[j].title + '"/></div>';
				qItem += aItem; 
			}
		}else{
			for (let j = 0; j < ansList.length; j++) {
				var aItem = '<div id="ans_' + ansList[j].id + '" data-id="' + questionState + '" onclick="question.chooseAnswer(this)" class="answerAreaBg"><div class="answerArea_text">' + ansList[j].title + '</div>' +
							'<div class="answerArea_point"><img src="image/cb.png" class="answer_checkbox" /></div></div>';
				qItem += aItem; 
			}
		}
		
		
		// qItem += '<div class="pageChangeArea"><div class="pageChangeArea_next" onclick="question.nextQuestion();"></div>';
		// if(i != 0){
		// 	qItem += '<div class="pageChangeArea_last" onclick="question.lastQuestion();"></div>';
		// }

		qItem += '</div><input class="valueArea" type="hidden" value=""></li>';

		$("#questionArea_list").append(qItem);
	}

};
question.nextQuestion = function(){

	if(question.nowPageNum >= question.pageLimit - 1){
		question.submitResult();
		return;
	}
	$("#clickNoneArea").show();
	var nowPage = $("#ques_" + question.nowPageNum);
	question.nowPageNum++;
	var nextPage = $("#ques_" + question.nowPageNum);
	if(nowPage.hasClass("scaleOne")){
		nowPage.removeClass("scaleOne");
	}
	if(nowPage.hasClass("moveIn")){
		nowPage.removeClass("moveIn");
	}
	nowPage.addClass("moveOut");
	if(nextPage.hasClass("scaleTwo")){
		nextPage.removeClass("scaleTwo");
	}
	if(nextPage.hasClass("scaleTwoBack")){
		nextPage.removeClass("scaleTwoBack");
	}
	nextPage.addClass("scaleOne");
	var thirdPage = "";
	if(question.nowPageNum + 1 < question.pageLimit){
		var page = question.nowPageNum + 1;
		thirdPage = $("#ques_" + page);
		thirdPage.addClass("scaleTwo");
		if(thirdPage.hasClass('scaleThreeBack')){
			thirdPage.removeClass('scaleThreeBack');
		}
		if(question.nowPageNum + 2 < question.pageLimit){
			setTimeout(function(){
				var pageTwo = question.nowPageNum + 2;
				$("#ques_" + pageTwo).show();
			},300)
		}
	}
	setTimeout(() => {
		nextPage.removeClass("pageTwo");
		nextPage.addClass("pageOne");
		if(thirdPage != ""){
			thirdPage.removeClass("pageThree");
			thirdPage.addClass("pageTwo");
		}
		$("#clickNoneArea").hide();
	}, 500);
	
};
question.lastQuestion = function(){
	
	var oldThirdPage = "";
	if(question.nowPageNum + 2 < question.pageLimit){
		var pageThree = question.nowPageNum + 2;
		oldThirdPage = $("#ques_" + pageThree);
		oldThirdPage.hide();
		if(oldThirdPage.hasClass('scaleThreeBack')){
			oldThirdPage.removeClass('scaleThreeBack')
		}
	}
	var oldSecondPage = "";
	if(question.nowPageNum + 1 < question.pageLimit){
		var pageTwo = question.nowPageNum + 1;
		oldSecondPage = $("#ques_" + pageTwo);
		if(oldSecondPage.hasClass('scaleTwoBack')){
			oldSecondPage.removeClass('scaleTwoBack')
		}
		if(oldSecondPage.hasClass('scaleTwo')){
			oldSecondPage.removeClass('scaleTwo')
		}
		oldSecondPage.addClass("scaleThreeBack");
	}

	var nowPage = $("#ques_" + question.nowPageNum);
	question.nowPageNum--;
	var nextPage = $("#ques_" + question.nowPageNum);
	if(nowPage.hasClass("moveIn")){
		nowPage.removeClass("moveIn");
	}
	if(nowPage.hasClass("scaleOne")){
		nowPage.removeClass("scaleOne");
	}
	nowPage.addClass("scaleTwoBack");
	if(nextPage.hasClass("moveOut")){
		nextPage.removeClass("moveOut");
	}
	nextPage.addClass("moveIn");
	
	setTimeout(() => {
		nowPage.removeClass("pageOne");
		nowPage.addClass("pageTwo");
		if(oldSecondPage != ""){
			oldSecondPage.removeClass("pageTwo");
			oldSecondPage.addClass("pageThree");
		}
	}, 500);
};
question.chooseAnswer = function(e){
	var that = $(e)
	var answer = common.subStringByUnderline(that.attr("id"));
	var oldValue = that.parent().find(".valueArea").val();
	if(oldValue == answer){
		return;
	}
	if(that.attr("data-id") == "0"){
		if(oldValue != ""){
			that.parent().find("#ans_" + oldValue).find("img").attr("src","image/cb.png");
		}
		that.find("img").attr("src","image/cb_o.png");
	}
	that.parent().find(".valueArea").val(answer);
	question.nextQuestion();
}
question.submitResult = function(){
	var resultList = $("#questionArea_list").find("li");
	var hasSpecialQuestion = "0";
	
	var chooseNum = 0;
	var areaQData = {};
	areaQData.eight = 0;
	areaQData.nine = 0;
	areaQData.zero = 0;
	areaQData.ca = "";
	for(var i = 0;i < resultList.length;i++){
		var item = $(resultList[i]);
		var resultItem = item.find(".valueArea").val();
		var qIdItem = item.attr("data-id");
		if((qIdItem == "11" || qIdItem == "12") && resultItem == "03"){
			hasSpecialQuestion = "1";
		}
		if(resultItem != ""){
			chooseNum++;
		}
		if((qIdItem == "01" || qIdItem == "02" || qIdItem == "03") && resultItem != ""){
			areaQData.eight++;
			if(areaQData.ca == "" || areaQData.ca == "eight"){
				areaQData.ca = "eight";
			}else{
				if(areaQData.eight > areaQData[areaQData.ca]){
					areaQData.ca = "eight";
				}
			}
		}else if ((qIdItem == "04" || qIdItem == "05" || qIdItem == "06") && resultItem != ""){
			areaQData.nine++;
			if(areaQData.ca == "" || areaQData.ca == "nine"){
				areaQData.ca = "nine";
			}else{
				if(areaQData.nine > areaQData[areaQData.ca]){
					areaQData.ca = "nine";
				}
			}
		}else if ((qIdItem == "07" || qIdItem == "08" || qIdItem == "09" || qIdItem == "10") && resultItem != ""){
			areaQData.zero++;
			if(areaQData.ca == "" || areaQData.ca == "zero"){
				areaQData.ca = "zero";
			}else{
				if(areaQData.zero > areaQData[areaQData.ca]){
					areaQData.ca = "zero";
				}
			}
		}
	}
	var resultStr = "";
	if(hasSpecialQuestion == "1"){
		resultStr = "6";
	}else{
		if(chooseNum == 0 || chooseNum == 1){
			resultStr = parseInt(Math.random() * 2) == "0" ? "none1" : "none2";
		}else{
			var resultRadList = [];
			if(areaQData.ca == "eight"){
				resultRadList = ["6","7"];
				
				if(areaQData.nine == areaQData.eight){
					resultRadList.push("3");
					resultRadList.push("4");
					resultRadList.push("5");
				}
				if(areaQData.zero == areaQData.eight){
					resultRadList.push("0");
					resultRadList.push("1");
					resultRadList.push("2");
				}

			}else if(areaQData.ca == "nine"){
				resultRadList = ["3","4","5"];
				if(areaQData.eight == areaQData.nine){
					resultRadList.push("6");
					resultRadList.push("7");
				}
				if(areaQData.zero == areaQData.nine){
					resultRadList.push("0");
					resultRadList.push("1");
					resultRadList.push("2");
				}
			}else if(areaQData.ca == "zero"){
				resultRadList = ["0","1","2"];
				if(areaQData.eight == areaQData.zero){
					resultRadList.push("6");
					resultRadList.push("7");
				}
				if(areaQData.nine == areaQData.zero){
					resultRadList.push("3");
					resultRadList.push("4");
					resultRadList.push("5");
				}
			}

			var randomYearNum = parseInt(Math.random() * resultRadList.length);
			resultStr = resultRadList[randomYearNum];

		}

	}
	var imageRandom = parseInt(Math.random() * 8);
	window.location.href = "result.html?result=" + resultStr + "&imageRandom=" + imageRandom;
}