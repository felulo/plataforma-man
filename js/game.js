define(['input', 'screens'], function(Input, Screens) {
	
	var Game = {

		iniciar: function() {
			
			var self = this,
				canvas = $('#cvPrincipal'),
				ctx = canvas[0].getContext('2d');

			this.telas = [];
			this.telaAtual = 0;

			this.adicionarTela(new Screens.Inicial({
				game: self
			}));

			Input.receptor = this;
			Input.iniciarInput();

			this.terminar = false;

			(function Loop(ticks) {
				self.telas[self.telaAtual].logicaPrincipal(ctx);

				ticks++;

				if (ticks > 16)
					ticks = 1;

				if (!self.terminar) {
					setTimeout(function() {

						Loop(ticks);

					}, 1000/60 );
				}
			})(1);

		},

		adicionarTela: function(tela) {
			this.telas.push(tela);
		},

		pegarTelaIndice: function(indice) {
			if (indice < 0 || indice > (this.telas.length - 1))
				return this.telas[indice];

			return -1;
		},

		pegarTelaNome: function(nome) {
			for (var i = 0; i < this.telas.length; i++)
				if (this.telas[i].nome === nome)
					return this.telas[i];

			return -1;
		},

		removerTela: function(tela) {
			for (var i = 0; i < this.telas.length; i++)
				if (this.telas[i] === tela) {
					this.telas.splice(i, 1);
					break;
				}
		},

		removerTelaIndice: function(indice) {
			if (indice < 0 || indice > (this.telas.length - 1)) {
				this.telas.splice(indice, 1);
				return;
			}

			return -1;
		}

	};

	return Game;

});