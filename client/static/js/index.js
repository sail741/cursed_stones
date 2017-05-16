function Index(element)
{
	this.element = element;

	this.showIndex = function(){


		var context = this;

		//context.element.getElementById('nav').style.display = 'none';
		//context.element.getElementById('index').style.display = 'none';
		//context.element.getElementById('loading').style.display = 'block';
		// Check status from Leo

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
	}

	this.showSelectDeck = function(){

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

	this.play = function(){
		this.showLoading();

		var context = this; 
		sio.emit('check_already_in_game',function (is_reconnect) {
			if(is_reconnect){
				context.showGame();
			}else{
				//context.showSelectDeck();
				context.select_deck(1);
			}
	    });
	}

	this.select_deck = function(id){
		this.showLoading();
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

			sio.on('startGame', function(data){
				alert("Holla again");
				localPseudoAdv = data.Pseudo_adv;
				localPseudoActual = data.Pseudo;
				// afficher plateau
			});
		}
		
	}

	
}