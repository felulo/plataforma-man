define(['unit'], function(Unit) {

	var Actor = (function() {

		var Actor = function(params) {

			if (!params)
				params = {};

			this.tipo = params.tipo || 'Actor';

			this.items = params.items || [];
			this.itemAtual = '';

			this.estavelPlataforma = true;

			this.pulando = false;
			this.movendo = false;

			this.alturaMaximaPulo = 6;

			this.fase = params.fase || undefined;

			this.aceleracaoX = 3.25;  //30 pixels/s²
			this.aceleracaoY = 8.5;  //30 pixels/s²
			this.velocidadeX = 0;  // 0 pixels/s
			this.velocidadeY = 0;  // 0 pixels/s

			this.velocidadeXMaxima = 6.25;
			this.velocidadeYMaxima = 9;

		};

		Actor.prototype = new Unit();
		Actor.prototype.constructor = Actor;

		var calcularVelocidadeX = function() {
			var velX = this.velocidadeX,
				aceX = this.aceleracaoX;

			switch (this.direcaoAtual) {
				case 0:
					if (velX - aceX < -this.velocidadeXMaxima)
						velX = -this.velocidadeXMaxima;
					else if (velX > 0)
						velX = 0;
					else
						velX -= aceX;

					break;
				case 1:
					if (velX + aceX > this.velocidadeXMaxima)
						velX = this.velocidadeXMaxima;
					else if (velX < 0)
						velX = 0;
					else
						velX += aceX;

					break;
			}

			return velX;
		};

		var calcularVelocidadeY = function() {
			var velY = this.velocidadeY,
				aceY = this.aceleracaoY;

			if (this.pulando) {
				if (velY - aceY < -this.velocidadeYMaxima)
					velY = -this.velocidadeYMaxima;
				else if (velY < 0)
					velY = 0;
				else
					velY -= aceY;
			} else {
				if (velY + aceY > this.velocidadeYMaxima)
					velY = this.velocidadeYMaxima;
				else if (velY > 0)
					velY = 0;
				else
					velY += aceY
			}

			return velY;
		};

		var mover = function() {

			var velX = this.velocidadeX,
				moverFlag = false,
				xReal,
				x, y1, y2,
				diff;

			// Calculo da Velocidade
			velX = calcularVelocidadeX.call(this);

			xReal = (this.x + velX + (this.direcaoAtual == 1 ? this.widthTile : 0));
			x = parseInt(xReal / this.widthTile);

			if (!this.estavelPlataforma) {
				y1 = parseInt(this.y / this.heightTile);
				y2 = parseInt((this.y + this.heightTile) / this.heightTile);

				if ((this.fase.mapa[y1][x] == 0 && this.fase.mapa[y2][x] == 0) &&
					(xReal > 0 && xReal < (this.fase.mapa[this.gridY].length * this.widthTile)))
					moverFlag = true;
			} else {
				y1 = parseInt(this.gridY);

				if (this.fase.mapa[y1][x] == 0 && xReal > 0 && xReal < (this.fase.mapa[y1].length * this.widthTile))
					moverFlag = true;
			}

			if (moverFlag) {
				this.velocidadeX = velX;

				this.x += this.velocidadeX;
				this.gridX = Math.floor(this.x / this.widthTile);

				if (this.estavelPlataforma) {
					switch (this.direcaoAtual) {
						case 0:
							this.flipX = true;
							this.setAnimacao('moveLeft');

							break;
						case 1:
							this.flipX = false;
							this.setAnimacao('moveRight');

							break;
					}

					this.controleAnimacao.iniciar();
				}
			} else {
				diff = this.x - (this.gridX * this.widthTile);

				this.velocidadeX = 0;

				if (this.direcaoAtual == 0 && (this.x - diff) >= 0)
					this.x -= diff;
				else if (this.direcaoAtual == 1 && (this.x + (this.widthTile - diff)) <= (this.fase.mapa[this.gridY].length - 1) * this.widthTile)
					this.x += (this.widthTile - diff);
			}

		};

		var pular = function() {

			var velY = this.velocidadeY,
				x1, x2, y;

			if (this.estavelPlataforma) {
				this.controleAnimacao.parar();

				this.estavelPlataforma = false;
				this.yAnterior = this.gridY;
			}

			velY = calcularVelocidadeY.call(this);

			y = parseInt((this.y + velY) / this.heightTile);
			x1 = this.gridX;
			x2 = (this.x == this.gridX * this.widthTile ? this.gridX : this.gridX + 1);

			if (y > (this.yAnterior - this.alturaMaximaPulo) && (this.fase.mapa[y][x1] == 0) && (this.fase.mapa[y][x2] == 0)) {
				this.velocidadeY = velY;

				if (this.y + this.velocidadeY < 0)
					this.y = 0;
				else
					this.y += this.velocidadeY;

				this.gridY = Math.floor(this.y / this.heightTile);

				this.setAnimacao('jump');
			} else {
				this.velocidadeY = 0;
				this.y = this.gridY * this.heightTile;

				this.pulando = false;
			}

			this.controleAnimacao.iniciar();

		};

		var caindo = function() {

			var velY = this.velocidadeY,
				x1, x2, y;

			velY = calcularVelocidadeY.call(this);

			x1 = this.gridX;
			x2 = (this.x == this.gridX * this.widthTile ? this.gridX : this.gridX + 1);
			y = parseInt((this.y + velY + this.heightTile) / this.heightTile);

			if ((this.fase.mapa[y][x1] == 0) && (this.fase.mapa[y][x2] == 0)) {
				this.velocidadeY = velY;

				if (this.y + this.velocidadeX + this.heightTile > (this.fase.mapa.length * this.heightTile))
					this.y = (this.fase.mapa.length - 1) * this.heightTile;
				else
					this.y += this.velocidadeY;
				
				this.gridY = Math.floor((this.y + this.heightTile) / this.heightTile);

				if (this.estavelPlataforma)
					this.estavelPlataforma = false;

				this.setAnimacao('fall');
			} else {
				this.velocidadeY = 0;
				this.y = this.gridY * this.heightTile;

				this.estavelPlataforma = true;

				if (!this.movendoAcao)
					this.setAnimacao('idle');
			}

			this.controleAnimacao.iniciar();

		};

		var usarItem = function() {

			if (this.itemAtual.tipo == 'Item')
				this.itemAtual.usar(this);

		};

		Actor.prototype.acao = function() {

			//this.controleAnimacao.parar();

			if (this.movendoAcao) {

				this.velocidadeXMaxima = 6.25;
				this.aceleracaoX = 1.25;

				mover.call(this);
				
			}

			if (this.pulandoAcao) {

				if (this.pulando) {

					this.velocidadeYMaxima = 9;

					if (this.estavelPlataforma)
						this.aceleracaoY = 6.5;

					pular.call(this);

				}

			}

			if (this.caindoAcao && !this.pulando) {

				this.velocidadeYMaxima = 9;
				this.aceleracaoY = 6.5;

				caindo.call(this);

			}

			if (!this.pulandoAcao && !this.movendoAcao) {
				this.controleAnimacao.parar();
			}

		}

		return Actor;

	})();

	return Actor

});