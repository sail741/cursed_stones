var sio = io({reconnection: false});

sio.on('connect', function(){
	console.log('Connected');
	console.log('send join game');
	//TODO : j'ai fait des modifs ici
    reconnect();
});

sio.on('error', function(){
	console.error('Socket error', arguments);
});


sio.on('disconnect', function(){
	console.error('Lost connection', arguments);
	vNotify.error({title: 'Erreur', text: 'Perte de connexion'});
});



