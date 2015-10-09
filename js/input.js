define(function() {

	var Input = {

		receptor: undefined,

		iniciarInput: function() {

			var self = this;

			$(window).bind('keydown keyup', function(evt) {

				switch (evt.which) {
					case 37: //esquerda
					case 38: //acima
					case 39: //direita
					case 40: //baixo
					case 13: //pausar e continuar
						self.receptor.telas[self.receptor.telaAtual].verificarInput(evt);

						break;
				}

			});

		}

	}

	return Input;

});