define(['actor'], function(Actor) {

	var Actors = {

		Mario: (function() {

			var Mario = function(params) {

				if (!params)
					params = {};

				this.fase = params.fase || undefined;

				this.widthTile = this.fase.widthTile;
				this.heightTile = this.fase.heightTile;

				this.setPosicao(this.fase.localInicialX, this.fase.localInicialY)

				this.setSprite('images/mario.png');

				this.totalVida = 1;
				this.direcaoAtual = 1;

				this.animacoes = {
					idle: {
						sx: 0,
						sy: 0,
						width: 16,
						height: 16,
						frameInicial: 0,
						frameFinal: 0,
						repetir: false,
						tempo: 0
					},
					moveLeft: {
						sx: 0,
						sy: 0,
						width: 16,
						height: 16,
						frameInicial: 0,
						frameFinal: 2,
						repetir: true,
						repetirQtdeVezes: -1,
						tempo: 300
					},
					moveRight: {
						sx: 0,
						sy: 0,
						width: 16,
						height: 16,
						frameInicial: 0,
						frameFinal: 2,
						repetir: true,
						repetirQtdeVezes: -1,
						tempo: 300
					},
					jump: {
						sx: 0,
						sy: 0,
						width: 16,
						height: 16,
						frameInicial: 3,
						frameFinal: 3,
						repetir: false,
						tempo: 0
					},
					fall: {
						sx: 0,
						sy: 0,
						width: 16,
						height: 16,
						frameInicial: 3,
						frameFinal: 1,
						repetir: false,
						tempo: 0
					}
				};

				this.setAnimacao('idle');

			};

			Mario.prototype = new Actor();
			Mario.prototype.constructor = Mario;

			return Mario;

		})()

	};

	return Actors;

});