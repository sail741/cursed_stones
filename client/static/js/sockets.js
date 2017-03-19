var sio = io();

sio.on('connect', function(){
	console.log('ok?');
});

sio.on('error', function(){
	console.error('Socket error', arguments);
});


sio.on('disconnect', function(){
	console.error('Lost connection', arguments);
});



