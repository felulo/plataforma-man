define(['element', 'animateFrame'], function(Element, AnimateFrame) {

	var DisplayObject = (function() {

		var DisplayObject = function(params) {

			if (!params)
				params = {};

			this.tipo = params.tipo || 'DisplayObject';

			this.x = params.x || 0;
			this.y = params.y || 0;

			this.gridX = params.gridX || 0;
			this.gridY = params.gridY || 0;

			this.width = params.width || 16;
			this.height = params.height || 16;

			this.widthTile = params.widthTile || 16;
			this.heightTile = params.heightTile || 16;

			this.imagemCarregada = false;
			this.sprite = params.sprite || undefined;

			this.controleAnimacao = new AnimateFrame();

			this.animacoes = params.animacoes || [];
			this.animacaoAtual = params.animacaoAtual || 'idle';
			
		};

		DisplayObject.prototype = new Element();
		DisplayObject.prototype.constructor = DisplayObject;

		DisplayObject.prototype.setSprite = function(valor) {

			if (!valor) {
				console.error('Valor para imagem inválido')
				return;
			}

			if (typeof valor == 'HTMLImageElement') {
				if ((valor.width % this.width == 0) && (valor.height % this.height == 0)) {
					this.sprite = valor;
					return;
				}
			}

			if (typeof valor == 'string') {
				var self = this;

				this.sprite = new Image();
				this.sprite.src = valor;
				this.sprite.onload = function() {
					if ((this.width % self.width != 0) && (this.height % self.height != 0)) {
						console.error('Valor para imagem inválido')
						return;
					}

					self.imagemCarregada = true;
				};
			}

		};

		DisplayObject.prototype.setAnimacao = function(nome) {

			this.animacaoAtual = nome;
			
			this.controleAnimacao.frameInicial = this.animacoes[this.animacaoAtual].frameInicial;
			this.controleAnimacao.frameFinal = this.animacoes[this.animacaoAtual].frameFinal;
			
			this.controleAnimacao.repetir = this.animacoes[this.animacaoAtual].repetir;
			this.controleAnimacao.tempo = this.animacoes[this.animacaoAtual].tempo;

		};

		DisplayObject.prototype.render = function(ctx) {

			ctx.drawImage(
				this.sprite,
				(this.animacoes[this.animacaoAtual].sx + this.controleAnimacao.frameInicial + this.controleAnimacao.frameAtual) * this.animacoes[this.animacaoAtual].width,
				(this.animacoes[this.animacaoAtual].sy + (this.flipX ? 1 : 0)) * this.animacoes[this.animacaoAtual].height,
				this.animacoes[this.animacaoAtual].width,
				this.animacoes[this.animacaoAtual].height,
				this.x,
				this.y,
				this.widthTile,
				this.heightTile
			);

			// ctx.beginPath();
			// ctx.rect(
			// 	this.x,
			// 	this.y,
			// 	this.widthTile,
			// 	this.heightTile
			// );
			// ctx.lineWidth = 2;
			// ctx.strokeStyle = 'black';
			// ctx.stroke();

		};

		DisplayObject.prototype.setPosicao = function(x, y) {
			this.gridX = x;
			this.gridY = y;

			this.x = x * this.widthTile;
			this.y = y * this.heightTile;
		}

		return DisplayObject;

	})();

	return DisplayObject;

});