define(['screen', 'actors', 'levels'], function(Screen, Actors, Levels) {

	var Screens = {

		Inicial: (function() {

			var Inicial = function(params) {

				if (!params)
					params = {};

				var self = this;

				this.fase = new Levels.Fase1();

				for (var i = 0; i < this.fase.mapa.length; i++)
					for (var j = 0; j < this.fase.mapa[i].length; j++)
						if (this.fase.mapa[i][j] != 0)
							this.items.push(this.fase.mapa[i][j]);

				this.atorPrincipal = new Actors.Mario({
					fase: self.fase,
					inicioX: self.fase.localInicialX,
					inicioY: self.fase.localInicialY
				});

				this.items.push(this.atorPrincipal);

				this.game = params.game || undefined;

				this.teclas = [false,false,false];

				this.teclaUltimaAcao = -1;

			};

			Inicial.prototype = new Screen();
			Inicial.prototype.constructor = Inicial;

			Inicial.prototype.verificarInput = function(evt) {

				if (evt.type == 'keydown') {
					switch (evt.which) {
						case 37: //esquerda
							if (!this.teclas[0] && this.teclaUltimaAcao != 0) {
								this.teclaUltimaAcao = 0;
								this.teclas[0] = true;
							}

							break;
						case 39: //direita
							if (!this.teclas[1] && this.teclaUltimaAcao != 1) {
								this.teclaUltimaAcao = 1;
								this.teclas[1] = true;
							}

							break;
						case 38: //acima
							this.teclas[2] = true;
							
							break;
					}
				} else if (evt.type == 'keyup') {
					switch (evt.which) {
						case 37: //esquerda
							this.teclas[0] = false;

							if (!this.teclas[0] && !this.teclas[1])
								this.teclaUltimaAcao = -1;

							break;
						case 39: //direita
							this.teclas[1] = false;
							
							if (!this.teclas[0] && !this.teclas[1])
								this.teclaUltimaAcao = -1;

							break;
						case 38: //acima
							this.teclas[2] = false;

							break;
					}
				}

			};

			Inicial.prototype.logicaPrincipal = function(context) {

				if (this.teclas[0] || this.teclas[1]) {
					if (this.teclas[0] && this.teclaUltimaAcao == 0)
						this.atorPrincipal.direcaoAtual = 0;
					else if (this.teclas[1] && this.teclaUltimaAcao == 1)
						this.atorPrincipal.direcaoAtual = 1;

					this.atorPrincipal.movendoAcao = true;					
				} else {
					this.atorPrincipal.movendoAcao = false;

					this.atorPrincipal.controleAnimacao.parar();
				}

				if (this.teclas[2]) {
					if (this.atorPrincipal.estavelPlataforma)
						this.atorPrincipal.pulando = true;

					this.atorPrincipal.pulandoAcao = true;
				} else {
					this.atorPrincipal.pulando = false;
					this.atorPrincipal.pulandoAcao = false;
				}
				
				this.atorPrincipal.caindoAcao = true;

				this.atorPrincipal.acao();

				this.render(context);
				
			};

			return Inicial;

		})()

	}

	return Screens;

});