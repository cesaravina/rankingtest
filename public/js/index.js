$(document).ready(function() {
  /* global moment */
var newImageForm = $("#inputURL");
var newSubjectForm = $("#inputName");
var newTopicForm = $("#inputTopic");

$("#thanks").hide();

var rankingViews = $(".ranking_view");
var ranking = $("#ranking");

$("#newRanking").on("click", function(event){
	event.preventDefault();
	createModal();
	$("#thanks").hide();


	//createNewRow();
});

$("#submitButton").on("click", function(event){
event.preventDefault();
handleSubmit();

$("#thanks").show();
$("#form").hide();
});

getRankings();

//function to get the inputs from the modal forms

var handleSubmit = function(){
	
    // Don't do anything if the name fields hasn't been filled out
    if (!newSubjectForm.val().trim().trim() || !newImageForm.val().trim().trim()||!newTopicForm.val().trim().trim()) {
      return;
    }
    if(!validateURL(newImageForm.val().trim())){

    postRanking({
      name: newSubjectForm
        .val()
        .trim(),
      topicURL: "http://pmdvod.nationalgeographic.com/NG_Video/960/211/moon-101-nasa_640x360_808580163611.jpg",
       category : newTopicForm
		.val()
        .trim()
    });

    }else{
    // Calling the upsertAuthor function and passing in the value of the name input
    postRanking({
      name: newSubjectForm
        .val()
        .trim(),
      topicURL: newImageForm
      	.val()
        .trim(),
       category : newTopicForm
		.val()
        .trim()
    });
    }
  }


function postRanking(rankingData){
	$.post('/api/topics', rankingData)
	.then(getRankings);
}



function getRankings(){
	$.get('/api/topics', function(data){
		console.log("rankings", data);
		var rankings = data;
		rankingViews.empty();
		var rankingToAdd = [];
		for (var i = 0; i<rankings.length; i++){
			rankingToAdd.push(createNewRow(rankings[i]));
		}
		rankingViews.append(rankingToAdd);
		})
	};





function createNewRow(rankingData){

var newRankingPanel = $("<div>");
newRankingPanel.data("ranking",rankingData);
newRankingPanel.addClass("thumbnail placeholder");
var newRankImage = $("<img>");
newRankImage.addClass('ranking_image');
newRankImage.attr("src",rankingData.topicURL);


var newText = $("<a href=/ranking?id="+rankingData.id+"></a>");
newText.addClass("caption");
var newSubjectContent = $("<p>");
newSubjectContent.addClass("subject");
newSubjectContent.text("Subject: " +rankingData.name);


var newTopicContent = $("<p>");
newTopicContent.addClass("topic");
newTopicContent.text("Topic: " +rankingData.category);


newRankingPanel.append(newRankImage);
newRankingPanel.append(newText);
newText.append(newSubjectContent);
newText.append(newTopicContent);

return newRankingPanel;


}



function createModal(){
$('.modal').modal('toggle')
$("#form").show();
}

headerDesign();
function headerDesign(){
	var header = $(".header");
 	header.css({
    "background-image": "url('./img/header.png')"
 })
};

function validateURL(textval) {
    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
}



});




