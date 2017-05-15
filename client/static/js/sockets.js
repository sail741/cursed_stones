var sio = io({reconnection: false});

sio.on('connect', connect);

sio.on('error', function(){
	console.error('Socket error', arguments);
});


sio.on('disconnect', function(){
	console.error('Lost connection', arguments);
	vNotify.error({title: 'Erreur', text: 'Perte de connexion'});
});



