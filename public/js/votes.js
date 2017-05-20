$(document).ready(function() {

$(document).on("click",".voteBtn", totalVotes);


function totalVotes(){

	console.log("button pressed");
	var increaseVote = $(".btn-success") + 1;
	var decreaseVote = $(".btn-danger") - 1;

	console.log(increaseVote);

}



});


