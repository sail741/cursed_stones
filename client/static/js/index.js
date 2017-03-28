function Index(element)
{
	this.element = element;

	this.showIndex = function(){


		var context = this;

		//context.element.getElementById('nav').style.display = 'none';
		//context.element.getElementById('index').style.display = 'none';
		//context.element.getElementById('loading').style.display = 'block';
		// Check status from Leo
		$.ajax({
           url : '/status',
           type : 'GET',
           data : '',
           success : function(data, statut){
 	
 				
				if(data.status == 'connected')
				{
					context.element.getElementById('connected').style.display = 'block';
				}
				else
				{
					context.element.getElementById('not_connected').style.display = 'block';
				}

				context.element.getElementById('loading').style.display = 'none';
				context.element.getElementById('login').style.display = 'none';
				context.element.getElementById('register').style.display = 'none';
				context.element.getElementById('nav').style.display = 'block';
				context.element.getElementById('index').style.display = 'block';

			},
           error: function(error){
           		alert(error.statusText);
           }
        });
	}

	this.showLogin = function(){
		this.element.getElementById('connected').style.display = 'none';
		this.element.getElementById('not_connected').style.display = 'none';
		this.element.getElementById('register').style.display = 'none';
		this.element.getElementById('login').style.display = 'block';
		this.element.getElementById('loading').style.display = 'none';
		this.element.getElementById('nav').style.display = 'block';
		this.element.getElementById('index').style.display = 'block';
	}

	this.showRegister = function(){
		this.element.getElementById('connected').style.display = 'none';
		this.element.getElementById('not_connected').style.display = 'none';
		this.element.getElementById('register').style.display = 'block';
		this.element.getElementById('login').style.display = 'none';
		this.element.getElementById('loading').style.display = 'none';
		this.element.getElementById('nav').style.display = 'block';
		this.element.getElementById('index').style.display = 'block';
	}

	this.login = function(){
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
				}
			},
           error: function(error){
           		alert(error.statusText);
           }
        });

        return false;
	}
}