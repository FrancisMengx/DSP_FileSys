function addcourse() {
	$('.courses').append("<div class = 'classInfo'>" +
		"<input type = 'text' placeholder='Class ID' class = 'course'>" +
		"<input type = 'number' placeholder='Credits' class = 'credits', min = 1>" +
		"<select class = 'grade'>" +
		"<option value = 'a'>A</option>" +
		"<option value = 'b+'>B+</option>" +
		"<option value = 'b'>B</option>" +
		"<option value = 'c+'>C+</option>" +
		"<option value = 'c'>C</option>" +
		"<option value = 'd+'>D+</option>" +
		"<option value = 'd'>D</option>" +
		"<option value = 'f'>F</option>" +
		"</select>" +
		"</div>");
}

function calculateGPA() {
	var courseIds = $('.course').get();
	var creditsList = $('.credits').get();
	var gradeList = $('.grade').get();
	var gradePoints = []
	var creditPoint = 0;
	var credits = 0;
	for (var i = 0; i < gradeList.length; i++) {
		if (gradeList[i].value == 'a') {
			console.log('haha');
			gradePoints[i] = 4;
		} else if (gradeList[i].value == 'b+') {
			gradePoints[i] = 3.5;
		} else if (gradeList[i].value == 'b') {
			gradePoints[i] = 3;
		} else if (gradeList[i].value == 'c+') {
			gradePoints[i] = 2.5;
		} else if (gradeList[i].value == 'c') {
			gradePoints[i] = 2;
		} else if (gradeList[i].value == 'd+') {
			gradePoints[i] = 1.5;
		} else if (gradeList[i].value == 'd') {
			gradePoints[i] = 1;
		} else if (gradeList[i].value == 'f') {
			gradePoints[i] = 0;
		}
	}
	for (var j = 0; j < creditsList.length; j++) {
		if (courseIds[j].value) {
			creditPoint += gradePoints[j] * parseInt(creditsList[j].value);
			credits += parseInt(creditsList[j].value);
		}
	}
	var GPA = Math.round(creditPoint / credits * 100) / 100;
	$('.courses').empty();
	$('.courses').append("<div class = 'classInfo'>" +
		"<input type = 'text' placeholder='Class ID' class = 'course'>" +
		"<input type = 'number' placeholder='Credits' class = 'credits', min = 1>" +
		"<select class = 'grade'>" +
		"<option value = 'a'>A</option>" +
		"<option value = 'b+'>B+</option>" +
		"<option value = 'b'>B</option>" +
		"<option value = 'c+'>C+</option>" +
		"<option value = 'c'>C</option>" +
		"<option value = 'd+'>D+</option>" +
		"<option value = 'd'>D</option>" +
		"<option value = 'f'>F</option>" +
		"</select>" +
		"<button class = 'btn btn-primary' id = 'addcourse' onclick='addcourse()'><i class = 'icon-plus'></i></button>" +
		"</div>");
	if (GPA > 2.5) {
		$('.courses').prepend("<p class = 'alert alert-success'>Your GPA is " + GPA + "</p>");
	} else {
		$('.courses').prepend("<p class = 'alert alert-error'>Your GPA is " + GPA + "</p>");
	}

}

function ajaxSearch() {

	$('.searchResult').empty();
	var id;
	if($('#courseId').val()){
		id = $('#courseId').val().toLowerCase();
	}
	$.ajax({
		url: "http://localhost:8000/search",
		type: "post",
		data: JSON.stringify({depart: $('#departSelect').val(), id: id,
			cat: $('#categorySelect').val(), pName: $('#profName').val(),
			year: $('#year').val(), term: $('#termSelect').val(),
			examNo: $('#examSelect').val()}),
		dataType: "json",
		contentType: 'application/json',
		success: function (message) {
			if(message.body.length == 0){
				$('.searchResult').append('<p class = "alert alert-info">No Result Found</p>');
			}else{

			$('.searchResult').append('<table class="table table-bordered table-striped"><tbody>');
			$('.table').append('<thead>' +
				'<tr><th colspan="2">File Name</th><th>Course ID</th><th>File Type</th></thead>');
			for(var k = 0; k < message.body.length; k++){
				console.log(message.body[k].name);
				$('.table').append(
					'<tr>' +
						'<td colspan="2"><a href = "">'+message.body[k].name+'</a></td>' +
						'<td colspan="1">'+message.body[k].id.toUpperCase()+'</td>' +
						'<td colspan="1">'+message.body[k].cat+'</td>'
					+'</tr>');
			}
			$('.searchResult').append('</tbody></table>');
//				'<p>'+JSON.stringify(message.body.id.toUpperCase())+'</p>');

			}
		},
		error: function (errorMessage) {
			$('.searchResult').append('<p>Error</p>')
			console.log(JSON.stringify(errorMessage))
		}
	});
}
