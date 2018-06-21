var common;
if (!common)
	common = {};

common.setLeftToolAuth = function(pageId,auth){
	if(auth == "admin"){
		$("#" + pageId).find(".common-manager").hide();
		$("#" + pageId).find(".common-admin").show();
	}else if(auth == "manager"){
		$("#" + pageId).find(".common-admin").hide();
		$("#" + pageId).find(".common-manager").show();
	}
};
common.showErrorToast = function(pageId,text){
	var toastAlert = '<div id="common_toast" class="common_toastBg fontColor_red"><div class="common_toastText">' + text + '</div></div>';
	$("#" + pageId).parent().append(toastAlert);

	setTimeout(function(){
		$("#common_toast").remove();
	},1500)
};
common.subStringByUnderline = function (str) {
	var strIndex = str.indexOf("_") + 1;
	var resultStr = str.substr(strIndex, str.length);
	return resultStr;
};
common.subStringByUnderlineGetBefore = function (str) {
	var strIndex = str.indexOf("_");
	var resultStr = str.substr(0, strIndex);
	return resultStr;
};
common.logout = function(){
	localStorage.clear();
	window.location.href = "login.html";
}
common.getQuestionIndex = function(){
	var indexList = [];
	for(var i = 0; i < QuestionDataUtil.Q_NUM - 1;i++){
		var randomItem;
		do {
			randomItem = parseInt(Math.random() * 12);
			var flag = '0';
			for(var j = 0; j < indexList.length;j++){
				if(randomItem == indexList[j]){
					flag = '1';
				}
			}	
		} while (flag == "1");
		
		indexList.push(randomItem);
	}
	imgQRandom = parseInt(Math.random() * 4) + 12;
	indexList.push(imgQRandom);
	return indexList;
};
common.addEnterSign = function(text,imageRandom){
	var nNum = 0;
	switch (imageRandom) {
		case "0":
			nNum = 14;
			$("#imageQRcode").find(".qrcodeArea").addClass("qrcode_bottom");
			$("#imageQRcode").addClass("color_white");
			break;
		case "1":
			nNum = 16;
			$("#imageQRcode").find(".qrcodeArea").addClass("qrcode_bottom");
			break;
		case "2":
			nNum = 18;
			$("#imageQRcode").find(".qrcodeArea").addClass("qrcode_bottom");
			break;
		case "3":
			nNum = 18;
			$("#imageQRcode").find(".qrcodeArea").addClass("qrcode_bottom");
			break;
		case "4":
			nNum = 16;
			$("#imageQRcode").find(".qrcodeArea").addClass("qrcode_bottom");
			break;
		case "5":
			nNum = 14;
			$("#imageQRcode").find(".qrcodeArea").addClass("qrcode_bottom");
			break;
		case "6":
			nNum = 15;
			$("#imageQRcode").find(".qrcodeArea").addClass("qrcode_bottom");
			break;
		case "7":
			nNum = 9;
			$("#imageQRcode").find(".qrcodeArea").addClass("qrcode_bottomRight");
			$("#imageQRcode").find(".qrcode_common").addClass("qrcode_imgBottomRight");
			break;
		default:
			break;
	}
	var returnStr = "";
	if(nNum != 0){
		var textList = text.split('');
		
		for(var i = 1; i < textList.length + 1; i++){
			var item = textList[i-1];
			if(i % nNum == 0 && i != 0){
				returnStr += item + "\r";
			}else{
				returnStr += item;
			}
		}
	}
	return returnStr;
};