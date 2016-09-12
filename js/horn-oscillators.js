$(document).ready(function(){
	
// to do: partials for tuning fork;
// try offsetting start of tones to see if it makes less nasty interference.

// off button
// info
// Menus?

var ctx = new AudioContext();

var real = new Float32Array([0,0.4,0.4,1,1,1,0.3,0.7,0.6,0.5,0.9,0.8]);
var imag = new Float32Array(real.length);
var hornTable = ctx.createPeriodicWave(real, imag);

var pitches = [256, 288, 320, 341.3, 384, 426.7, 480, 512, 128];
var amplitudes = [0.7, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
var oscillators = [];
var gainNodes = [];

for (var i = 0; i < 9; i++) {
	oscillators.push(ctx.createOscillator());
	gainNodes.push(ctx.createGain());
}

for (var j = 0; j < 9; j++) {
	// oscillators[j].type = "sine"; // Sine wave
	oscillators[j].setPeriodicWave(hornTable);
	oscillators[j].frequency.value = pitches[j];
	oscillators[j].connect(gainNodes[j]);
	gainNodes[j].gain.value = 0.0;
	gainNodes[j].connect(ctx.destination);
	oscillators[j].start();
}

$('.fork').click(function(){
	oscNum = $(this).data('oscnum');
	if(gainNodes[oscNum].gain.value == 0.0){
		gainNodes[oscNum].gain.value = amplitudes[oscNum];
	} else {
		gainNodes[oscNum].gain.value = 0.0;
	}
});

}); // document.ready end

