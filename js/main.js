//initial speecSynth API
const synth=window.speechSynthesis;
//DOM
const textForm=document.querySelector('form');
const textInput=document.querySelector('#text-input');
const voiceSelect=document.querySelector('#voice-select');
const rate=document.querySelector('#rate');
const rateValue=document.querySelector('#rate-value');
const pitch=document.querySelector('#pitch');
const pitchRate=document.querySelector('#pitch-value');
const body=document.querySelector('body');

//inite voice array
let voices=[];

const getVoices=()=>{
	voices=synth.getVoices();

	//loop //
	voices.forEach(voice=>{
          const option=document.createElement('option');
          option.textContent=voice.name+'('+voice.lang+')';
          option.setAttribute('data-lang', voice.lang);
          option.setAttribute('data-name', voice.name);
          voiceSelect.appendChild(option);
	})
};

getVoices();
if (synth.onvoiceschanged!==undefined) {
	synth.onvoiceschanged=getVoices;
}

//speak
const speak=()=>{
	//add background animation
	body.style.background='#000000 url(https://media.giphy.com/media/dnoyd6rMvw29q/giphy.gif)';
	body.style.backgroundRepeat = 'repeat-x';
	body.backgroundSize='100% 100%';
	if (synth.speaking) {
		console.error('already speaking');
		return;
	}
	if (textInput.value!=='') {
		const speakText=new SpeechSynthesisUtterance(textInput.value);
		speakText.onend=e=>{
			console.log('done speaking');
		}
	
	speakText.onerror=e=>{
		console.log('something went wrong');
	}
	const selectedVoice=voiceSelect.selectedOptions[0].getAttribute('data-name');
	//loop through voices
	voices.forEach(voice=>{
		if (voice.name===selectedVoice) {
			speakText.voice=voice;
		}
	})

	//set pitch and rate
	speakText.rate=rate.value;
	speakText.pitch=pitch.value;

	//speak
	synth.speak(speakText);
}
}

//event listeners
textForm.addEventListener('submit', e=>{
	e.preventDefault();
	speak();
	textInput.blur()
})

//rate value change
rate.addEventListener('change',e=>rateValue.textContent=rate.value)
pitch.addEventListener('change',e=>pitchValue.textContent=pitch.value)
//voice select change
voiceSelect.addEventListener('change',e=>speak())