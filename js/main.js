$(document).ready(function () {

	var ctx = new AudioContext();
	var oscillatorsPlaying = 0;

	var pitches = [256, 288, 320, 341.3, 384, 426.7, 480, 512, 128];
	var amplitudes = [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2];
	var oscillators = [];
	var gainNodes = [];

	for (var i = 0; i < 9; i++) {
		oscillators.push(ctx.createOscillator());
		gainNodes.push(ctx.createGain());
	}

	for (var j = 0; j < 9; j++) {
		oscillators[j].type = "sine"; // Sine wave
		oscillators[j].frequency.value = pitches[j];
		oscillators[j].connect(gainNodes[j]);
		gainNodes[j].gain.value = 0.0;
		gainNodes[j].connect(ctx.destination);
		oscillators[j].start();
	}

	$('.fork').click(function () {
		oscNum = $(this).data('oscnum');
		if (gainNodes[oscNum].gain.value == 0.0) {
			if (oscillatorsPlaying > 3) {
				return;
			}
			gainNodes[oscNum].gain.value = amplitudes[oscNum];
			oscillatorsPlaying++;
		} else {
			gainNodes[oscNum].gain.value = 0.0;
			oscillatorsPlaying--;
		}
		console.log(oscillatorsPlaying);
	});

	$('#reset > button').click(function () {
		for (var i = 0; i < gainNodes.length; i++) {
			gainNodes[i].gain.value = 0;
			oscillatorsPlaying = 0;
		}
	});

}); // document.ready end
