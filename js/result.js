var result;
if (!result)
	result = {};

result.onLoad = function(){
	result.loadingShow();
	var searchURL = window.location.search;  
	earchURL = searchURL.substring(1, searchURL.length);  
	var resultNum = searchURL.split("&")[0].split("=")[1];  
	var resultText = QuestionDataUtil.ansData[resultNum];
	var imageRandom = searchURL.split("&")[1].split("=")[1];  
	var resText = common.addEnterSign(resultText,imageRandom);
	$("#result_image").attr("src","image/resBg_" + imageRandom + ".png");

	$("#result_title").text(resText);
	$("#result_title").addClass("resultBg_text_" + imageRandom);
	var thisPage = document.getElementById("result_area");
	try{
		html2canvas(thisPage).then(function(canvas) {
			try {
				// result.loadingShow();
			    $("#result_canvasImg").attr("src",canvas.toDataURL("image/png"));
			    $("#result_canvasImg").css("visibility","visible");
			    $.get("http://woodyhello.com/api/updatecount", function(result){
				    console.log('python result=====>'+result);
				});
			}
			catch(err) {
			} 
			finally {
				result.loadingHide();
			}	
		});
	}catch(e){
		result.loadingHide();
		alert("生成失败，如果不介意，我们再来一次");
	}
};
result.repageToQuestion = function(){
	window.location.href = "question.html";
};
result.loadingShow = function(){
	$("#loadingModal").show();
};
result.loadingHide = function(){
	$("#loadingModal").hide();
};