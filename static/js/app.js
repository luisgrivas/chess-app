
var cfg = {
	draggable: true,
	dropOffBoard: 'snapback',
	position: 'start',
	onDrop: onDrop
}

var board = Chessboard('board', cfg);


function onDrop(source, target, piece) {

	var move = source + target;
	var is_valid = null; 

	console.log('Move: ' + move)
	
	 $.ajax({
		url: '/move',
		type: 'get',
		contentType: 'application/json',
		data: {
			'move': move
		},
		async: false,
		success: function(request){
			console.log(request);
			is_valid = request.is_move_valid;
			} 
	});
	console.log(is_valid)
	if (!is_valid) return 'snapback'		

}




$('#startPositionBtn').on('click', board.start)



