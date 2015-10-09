define(['element', 'platforms'], function(Element, Platforms) {

	var Level = (function() {

		var Level = function(params) {

			if (!params)
				params = {};

			this.tipo = params.tipo || 'Level';

			this.gravidade = params.gravidade || 10;
			this.faseEstatica = params.faseEstatica || false;
			this.velocidadeBackground = params.velocidadeBackground || 20;

			this.background = params.background || undefined;

			this.mapa = params.mapa || [];

		}

		Level.prototype = new Element();
		Level.prototype.constructor = Level;

		Level.prototype.construirLevel = function() {
			for (var i = 0; i < this.mapa.length; i++)
				for (var j = 0; j < this.mapa[i].length; j++) {
					if (this.mapa[i][j] != 0) {
						this.mapa[i][j] = Platforms.createPlatformByIndex(this.mapa[i][j]);

						this.mapa[i][j].widthTile = this.widthTile;
						this.mapa[i][j].heightTile = this.heightTile;

						this.mapa[i][j].setPosicao(j, i);		
					}
				}
		};

		Level.prototype.setBackground = function(valor) {

			if (!valor) {
				console.error('Valor para imagem inválido')
				return;
			}

			if (typeof valor == 'HTMLImageElement') {
				this.background = valor;
				return;
			}

			if (typeof valor == 'string') {
				var self = this;

				this.background = new Image();
				this.background.src = valor;
				this.background.onload = function() {
					self.backgroundCarregado = true;
				};
			}

		};

		Level.prototype.render = function(ctx) {
			if (this.background)
				ctx.drawImage(
					this.background,
					0,
					0,
					ctx.canvas.width,
					ctx.canvas.height
				);

			for (var i = 0; i < this.mapa.length; i++)
				for (var j = 0; j < this.mapa[i].length; j++)
					if (this.mapa[i][j] != 0)
						this.mapa[i][j].render.call(this.mapa[i][j], ctx);
		};

		return Level;

	})();

	return Level;

});