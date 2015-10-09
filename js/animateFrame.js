define(function() {

	var AnimateFrame = (function() {

		var AnimateFrame = function(params) {

			if (!params)
				params = {};

			this.frameInicial = params.frameInicial || 0;
			this.frameFinal = params.frameFinal || 0;

			this.frameAtual = 0;

			this.tempo = params.tempo || 0;

			this.repetir = params.repetir || false;
			this.repetirQtdeVezes = params.repetirQtdeVezes || -1;
			this.repetirQtde = 0;
			this.pausar = params.pausar || false;

			this.estado = 'parado';

			this.tempoCalculado = this.tempo / (this.frameFinal - this.frameInicial);

			this.onStartAnimateFrame = params.onStartAnimateFrame || function() { };
			this.onTickAnimateFrame = params.onTickAnimateFrame || function() { };
			this.onEndAnimateFrame = params.onEndAnimateFrame || function() { };

		};

		var animar = function() {

			if ((this.frameInicial + this.frameAtual + 1) > this.frameFinal) {
				this.repetirQtde++;

				this.onEndAnimateFrame();

				if ((this.repetir && this.repetirQtdeVezes == -1) || (this.repetir && (this.repetirQtde < this.repetirQtdeVezes)))
					this.frameAtual = this.frameInicial;
				else {
					this.estado = 'parado';

					clearInterval(this.interval);

					return;
				}

				this.onStartAnimateFrame();
			} else
				this.frameAtual++;

			var objEvt = {
				frameAtual: this.frameAtual,
				intervaloFrames: this.frameFinal - this.frameInicial
			};

			this.onTickAnimateFrame(objEvt);

		};

		AnimateFrame.prototype.iniciar = function() {

			var self = this;

			if (this.tempo > 0 && this.estado == 'parado') {
				this.estado = 'correndo';

				this.frameAtual = 0;

				this.onStartAnimateFrame();

				this.tempoCalculado = this.tempo / (this.frameFinal - this.frameInicial);

				this.interval = setInterval(
					function() {
						animar.call(self);
					},
					this.tempoCalculado
				);
			}

		};

		AnimateFrame.prototype.pausa = function() {

			if (this.tempo > 0 && this.interval && this.estado == 'correndo') {
				this.estado = 'pausado';

				clearInterval(this.interval);
			}

		};


		AnimateFrame.prototype.parar = function() {

			if (this.tempo > 0 && this.interval && this.estado == 'correndo') {
				this.estado = 'parado';

				clearInterval(this.interval);

				this.frameAtual = 0;
			}

		};

		AnimateFrame.prototype.continuar = function() {

			var self = this;

			if (this.tempo > 0 && this.interval && this.estado == 'parado') {
				this.estado = 'correndo';

				this.tempoCalculado = this.tempo / (this.frameFinal - this.frameInicial);

				this.interval = setInterval(function() {
					animar.call(self);
				}, this.tempoCalculado);
			}

		};

		return AnimateFrame;

	})();

	return AnimateFrame;

});