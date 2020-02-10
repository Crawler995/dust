const audio = document.getElementsByTagName('audio')[0];
const title = document.getElementsByClassName('title')[0];
let analyser = undefined;
let loading = true;

audio.onloadedmetadata = () => {
  title.innerHTML = 'Click anywhere to start.';
  loading = false;
}

analyseFrequency = () => {
  if(loading || audio.paused || analyser === undefined) {
    return [];
  }
	const frequencyArray = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(frequencyArray);
	return frequencyArray;
}

mouseClicked = () => {
  if(!loading && audio.paused) {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(audio);
    analyser = audioContext.createAnalyser();

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    audio.play();
    audio.loop = true;
    title.innerHTML = 'Dust.';
  }
}