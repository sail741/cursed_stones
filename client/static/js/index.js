function Index(element)
{
	this.defaultDeck = 1;

	this.element = element;

	this.showIndex = function(){


		var context = this;

		this.showLoading();

		$.ajax({
           url : '/status',
           type : 'GET',
           data : '',
           success : function(data, statut){
 	
				if(data.status == 'connected')
				{
					context.connectToGameSocketEngine()
					setTimeout(function() {
						context.showConnected();
					}, 500);
				}
				else
				{
					setTimeout(function() {
						context.showNotConnected();
					}, 500);
				}

			},
           error: function(error){
           		alert(error.statusText);
           }
        });
	}

	this.showConnected = function(){
		this.element.getElementById('loading').style.display = 'none';
		this.element.getElementById('nav').style.display = 'block';
		this.element.getElementById('index').style.display = 'block';
		this.element.getElementById('connected').style.display = 'block';
		this.element.getElementById('not_connected').style.display = 'none';
		this.element.getElementById('login').style.display = 'none';
		this.element.getElementById('register').style.display = 'none';
		this.element.getElementById('game').style.display = 'none';
		this.element.getElementById('classement').style.display = 'none';
		this.element.getElementById('instructions').style.display = 'none';
		this.element.getElementById('create_deck').style.display = 'none';
		this.element.getElementById('select_deck').style.display = 'none';
		this.element.getElementById('loadingplayer').style.display = 'none';
	}

	this.showNotConnected = function(){
		this.element.getElementById('loading').style.display = 'none';
		this.element.getElementById('nav').style.display = 'block';
		this.element.getElementById('index').style.display = 'block';
		this.element.getElementById('connected').style.display = 'none';
		this.element.getElementById('not_connected').style.display = 'block';
		this.element.getElementById('login').style.display = 'none';
		this.element.getElementById('register').style.display = 'none';
		this.element.getElementById('game').style.display = 'none';
		this.element.getElementById('classement').style.display = 'none';
		this.element.getElementById('instructions').style.display = 'none';
		this.element.getElementById('create_deck').style.display = 'none';
		this.element.getElementById('select_deck').style.display = 'none';
		this.element.getElementById('loadingplayer').style.display = 'none';
	}

	this.showLogin = function(){
		this.element.getElementById('loading').style.display = 'none';
		this.element.getElementById('nav').style.display = 'block';
		this.element.getElementById('index').style.display = 'block';
		this.element.getElementById('connected').style.display = 'none';
		this.element.getElementById('not_connected').style.display = 'none';
		this.element.getElementById('login').style.display = 'block';
		this.element.getElementById('register').style.display = 'none';
		this.element.getElementById('game').style.display = 'none';
		this.element.getElementById('classement').style.display = 'none';
		this.element.getElementById('instructions').style.display = 'none';
		this.element.getElementById('create_deck').style.display = 'none';
		this.element.getElementById('select_deck').style.display = 'none';
		this.element.getElementById('loadingplayer').style.display = 'none';
	}

	this.showRegister = function(){
		this.element.getElementById('loading').style.display = 'none';
		this.element.getElementById('nav').style.display = 'block';
		this.element.getElementById('index').style.display = 'block';
		this.element.getElementById('connected').style.display = 'none';
		this.element.getElementById('not_connected').style.display = 'none';
		this.element.getElementById('login').style.display = 'none';
		this.element.getElementById('register').style.display = 'block';
		this.element.getElementById('game').style.display = 'none';
		this.element.getElementById('classement').style.display = 'none';
		this.element.getElementById('instructions').style.display = 'none';
		this.element.getElementById('create_deck').style.display = 'none';
		this.element.getElementById('select_deck').style.display = 'none';
		this.element.getElementById('loadingplayer').style.display = 'none';
	}

	this.showGame = function(){
		this.element.getElementById('loading').style.display = 'none';
		this.element.getElementById('nav').style.display = 'none';
		this.element.getElementById('index').style.display = 'none';
		this.element.getElementById('connected').style.display = 'none';
		this.element.getElementById('not_connected').style.display = 'none';
		this.element.getElementById('login').style.display = 'none';
		this.element.getElementById('register').style.display = 'none';
		this.element.getElementById('game').style.display = 'block';
		this.element.getElementById('classement').style.display = 'none';
		this.element.getElementById('instructions').style.display = 'none';
		this.element.getElementById('create_deck').style.display = 'none';
		this.element.getElementById('select_deck').style.display = 'none';
		this.element.getElementById('loadingplayer').style.display = 'none';
	}

	this.showClassement = function(){
		this.element.getElementById('loading').style.display = 'none';
		this.element.getElementById('nav').style.display = 'block';
		this.element.getElementById('index').style.display = 'block';
		this.element.getElementById('connected').style.display = 'none';
		this.element.getElementById('not_connected').style.display = 'none';
		this.element.getElementById('login').style.display = 'none';
		this.element.getElementById('register').style.display = 'none';
		this.element.getElementById('game').style.display = 'none';
		this.element.getElementById('classement').style.display = 'block';
		this.element.getElementById('instructions').style.display = 'none';
		this.element.getElementById('create_deck').style.display = 'none';
		this.element.getElementById('select_deck').style.display = 'none';
		this.element.getElementById('loadingplayer').style.display = 'none';
	}

	this.showLoadingPlayer = function(){
		this.element.getElementById('loading').style.display = 'none';
		this.element.getElementById('nav').style.display = 'none';
		this.element.getElementById('index').style.display = 'none';
		this.element.getElementById('connected').style.display = 'none';
		this.element.getElementById('not_connected').style.display = 'none';
		this.element.getElementById('login').style.display = 'none';
		this.element.getElementById('register').style.display = 'none';
		this.element.getElementById('game').style.display = 'none';
		this.element.getElementById('classement').style.display = 'none';
		this.element.getElementById('instructions').style.display = 'none';
		this.element.getElementById('create_deck').style.display = 'none';
		this.element.getElementById('select_deck').style.display = 'none';
		this.element.getElementById('loadingplayer').style.display = 'block';
	}

	this.showLoading = function(){
		this.element.getElementById('loading').style.display = 'block';
		this.element.getElementById('nav').style.display = 'none';
		this.element.getElementById('index').style.display = 'none';
		this.element.getElementById('connected').style.display = 'none';
		this.element.getElementById('not_connected').style.display = 'none';
		this.element.getElementById('login').style.display = 'none';
		this.element.getElementById('register').style.display = 'none';
		this.element.getElementById('game').style.display = 'none';
		this.element.getElementById('classement').style.display = 'none';
		this.element.getElementById('instructions').style.display = 'none';
		this.element.getElementById('create_deck').style.display = 'none';
		this.element.getElementById('select_deck').style.display = 'none';
		this.element.getElementById('loadingplayer').style.display = 'none';
	}

	this.showCreateDeck = function(){
		this.element.getElementById('loading').style.display = 'none';
		this.element.getElementById('nav').style.display = 'block';
		this.element.getElementById('index').style.display = 'none';
		this.element.getElementById('connected').style.display = 'none';
		this.element.getElementById('not_connected').style.display = 'none';
		this.element.getElementById('login').style.display = 'none';
		this.element.getElementById('register').style.display = 'none';
		this.element.getElementById('game').style.display = 'none';
		this.element.getElementById('classement').style.display = 'none';
		this.element.getElementById('instructions').style.display = 'none';
		this.element.getElementById('create_deck').style.display = 'block';
		this.element.getElementById('select_deck').style.display = 'none';
		this.element.getElementById('loadingplayer').style.display = 'none';
	}

	this.showSelectDeck = function(){
		this.element.getElementById('loading').style.display = 'none';
		this.element.getElementById('nav').style.display = 'none';
		this.element.getElementById('index').style.display = 'none';
		this.element.getElementById('connected').style.display = 'none';
		this.element.getElementById('not_connected').style.display = 'none';
		this.element.getElementById('login').style.display = 'none';
		this.element.getElementById('register').style.display = 'none';
		this.element.getElementById('game').style.display = 'none';
		this.element.getElementById('classement').style.display = 'none';
		this.element.getElementById('instructions').style.display = 'none';
		this.element.getElementById('create_deck').style.display = 'none';
		this.element.getElementById('select_deck').style.display = 'block';
		this.element.getElementById('loadingplayer').style.display = 'none';
	}

	this.showInstructions = function(){
		this.element.getElementById('loading').style.display = 'none';
		this.element.getElementById('nav').style.display = 'block';
		this.element.getElementById('index').style.display = 'block';
		this.element.getElementById('connected').style.display = 'none';
		this.element.getElementById('not_connected').style.display = 'none';
		this.element.getElementById('login').style.display = 'none';
		this.element.getElementById('register').style.display = 'none';
		this.element.getElementById('game').style.display = 'none';
		this.element.getElementById('classement').style.display = 'none';
		this.element.getElementById('instructions').style.display = 'block';
		this.element.getElementById('create_deck').style.display = 'none';
		this.element.getElementById('select_deck').style.display = 'none';
		this.element.getElementById('loadingplayer').style.display = 'none';
	}

	this.classement = function(){
		this.showLoading();

		var context = this;
		$.ajax({
           url : '/classement',
           type : 'GET',
           success : function(data, statut){
           		context.element.getElementById('classementTable').innerHTML = '<tr>\
				<th>Rang</th>\
				<th>Pseudo</th>\
				<th>Points</th>\
				</tr>';

				var rang = 1;
				data.classement.forEach(function(element) {
					if(rang > 10)
						return;

				  context.element.getElementById('classementTable').innerHTML += '<tr>\
					<td>'+ rang +'</td>\
					<td>'+ element.pseudo +'</td>\
					<td>'+ element.points +'</td>\
					</tr>';
					rang++;	

				});

				setTimeout(function() {
					context.showClassement();
				}, 500);
				
			},
           error: function(error){
           		alert(error.statusText);
           }
        });
	}

	this.login = function(){

		this.showLoading();

		userName = this.element.getElementById('user_name_login').value;
		password = this.element.getElementById('password_login').value;

		var context = this;
		$.ajax({
           url : '/login',
           type : 'POST',
           data : 'username=' + userName + "&password=" + password,
           success : function(data, statut){
				if(data.status == 'success')
				{
					context.showIndex();
				}
				else
				{
					context.showLogin();
					alert('Utilisateur non trouvé');
				}
			},
           error: function(error){
           		alert(error.statusText);
           }
        });

        return false;
	}

	this.register = function(){
		userName = this.element.getElementById('user_name_register').value;
		password = this.element.getElementById('password_register').value;
		passwordConfirm = this.element.getElementById('password_confirm_register').value;

		if(passwordConfirm != password)
		{
			alert('Mot de passe non conforme');
			return false;
		}

		this.showLoading();

		var context = this;
		$.ajax({
           url : '/register',
           type : 'POST',
           data : 'username=' + userName + '&password=' + password,
           success : function(data, statut){
				if(data.status == 'success')
				{
					alert('Bienvenue !');
					context.showIndex();
				}
				else
				{
					alert('Erreur');
					context.showRegister();
				}
			},
           error: function(error){
           		alert(error.statusText);
           }
        });

        return false;
	}

	this.logout = function(){
		this.showLoading();

		userName = this.element.getElementById('user_name_login').value;
		password = this.element.getElementById('password_login').value;

		var context = this;
		$.ajax({
           url : '/logout',
           type : 'POST',
           success : function(data, statut){
				if(data.status == 'success')
				{
					context.showIndex();
					sio = null;
				}
				else
				{
					context.showIndex();
					alert('Erreur');
				}
			},
           error: function(error){
           		alert(error.statusText);
           }
        });
	}

	this.addCard = function(button, e){

		var number = button.getElementsByClassName("number")[0];
		var numberInt = parseInt(number.innerHTML);

		if(numberInt < 5)
		{
			number.innerHTML = numberInt + 1;
		}
		else
		{
			number.innerHTML = 0;
		}

		
	}

	this.createDeck = function(){

		this.showLoading();

		var context = this;
		$.ajax({
           url : '/get_cards',
           type : 'GET',
           success : function(data, statut){

				var content = '';
           		for (var i = 0; i < data.cards.length; i++) {

           			card = data.cards[i];
           			content += '<button class="carte" onclick="index.addCard(this)" id='+ card.id_card +'>\
           							<div class="number">0</div>\
									<h3>'+card.name+'</h3>\
									<img src="/static/img/cards/'+card.img+'"> \
									<div class="groupe">\
									<p><i class="fa fa-tint" aria-hidden="true">'+card.cost+'</i></p>\
									<p><i class="fa fa-heart" aria-hidden="true">'+card.life+'</i></p>\
									</div>\
									<div class="groupe">\
										<p><i class="fa fa-arrows" aria-hidden="true">'+card.movement+'</i></p>\
                <p><i class="fa fa-shield " aria-hidden="true">'+card.defence+'</i></p>\
				<div class="clear"></div>\
									</div>\
									<div class="groupe">\
										<p><i class="fa fa-bomb" aria-hidden="true">'+card.attack+'</i></p>\
										<p><i class="fa fa-bullseye" aria-hidden="true">'+card.range+'</i></p>\
										<div class="clear"></div>\
									</div>			\
									<div class="description">'+ card.description +'</div>\
								</button>'
           		}

           		context.element.getElementById('cartes').innerHTML = content;

           		setTimeout(function() {
           			context.showCreateDeck();
           		}, 500);

			},
           error: function(error){
           		alert(error.statusText);
           }
        });

        return false;
	}

	this.submitDeck = function(){


		var cards = this.element.getElementsByClassName("carte");
		
		// check somme
		var somme = 0;
		for(i = 0; i < cards.length; i++)
		{
			var number = cards[i].getElementsByClassName("number")[0];
			somme += parseInt(number.innerHTML);
		}

		
		if(somme != 30)
		{
			alert('Il faut avoir 30 cartes');
			return false;
		}

		this.showLoading();

		var params = "name_deck=" + this.element.getElementById('deck_name').value;

		for(i = 0; i < cards.length; i++)
		{
			var number = cards[i].getElementsByClassName("number")[0];
			var intNumber = parseInt(number.innerHTML);
			
			if(intNumber == 0)
				continue;
			params += "&qty_" + cards[i].getAttribute("id") + "=" + intNumber;
		}
		
		var context = this;
		$.ajax({
           url : '/create_deck',
           type : 'POST',
           data : params,
           success : function(data, statut){
				context.showIndex();
			},
           error: function(error){
           		alert(error.statusText);
           		context.showIndex();
           }
        });

        return false;
	}

	this.play = function(){
		this.showLoading();

		var context = this; 
		sio.emit('check_already_in_game',function (is_reconnect) {
			if(is_reconnect){
				context.showGame();
			}else{

				$.ajax({
		           url : '/get_decks',
		           type : 'get',
		           success : function(data, statut){
						if(data.status == 1)
						{
							var content = '';
							for (var i = data.id_decks.length - 1; i >= 0; i--) {			
								content += '<button onclick="index.select_deck(' + data.id_decks[i] + ');">'+ data.name_decks[i] +'</button>';
							}

							content += '<button onclick="index.select_deck('+ context.defaultDeck + ');">Default</button>';

							context.element.getElementById('decks').innerHTML = content;

							setTimeout(function() {
								context.showSelectDeck();	
							}, 500);

							
						}
						else
						{
							alert('Erreur');
							context.showIndex();
						}
					},
		           error: function(error){
		           		alert(error.statusText);
		           }
		        });

				
				//context.showSelectDeck();
				//context.select_deck(5);
			}
	    });
	}

	this.select_deck = function(id){
		this.showLoadingPlayer();
		sio.emit('select_deck',id,function () {
			sio.emit('joinGame');
	    })
	}

	this.connectToGameSocketEngine = function(){

		if(sio == null)
		{
			sio = io({reconnection: false});

			sio.on('error', function(){
				console.error('Socket error', arguments);
			});


			sio.on('disconnect', function(){
				console.error('Lost connection', arguments);
				vNotify.error({title: 'Erreur', text: 'Perte de connexion'});
			});

			initSocketServer();

			var context = this;
			sio.on('startGame', function(data){
				localPseudoAdv = data.Pseudo_adv;
				localPseudoActual = data.Pseudo;
				// afficher plateau
				context.showGame();
			});
			sio.on('gameOver', function (data) {
			    displayAction("Fin de la partie", data.winner_self ? "Bravo tu as gagné" : "Dommage. La prochaine fois tu y arriveras", "Rejouer", function(){
			    	context.play();
				});
			});
		}
		
	}

	
}