// Kamakthecat
// ​​oye oye pero no tiene nada de malo que te termine en la cara yo no juzgo gustos 😈

const preview = document.getElementById('preview');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const downloadLink = document.getElementById('downloadLink');
const recordingList = document.getElementById('recordings');

let mediaRecorder;
let recorderChunks = [];

// Solicitar acceso a la camata y el microfono
startButton.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        preview.srcObjet = stream;

        //Configurar el mediaRecorder
        mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });

        // Escuchar los eventos de grabacion
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recorderChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recorderChunks, {type: 'video/webm' });
            saverecording(blob);
            recorderChunks = [];
        };

        // Iniciar la grabacion
        mediaRecorder.start();
        startButton.disabled = true;
        stopButton.disabled = false;
    } catch (error) {
        console.error('Jesus el donovan', error);
    } 
});

//Detener la grabacion
stopButton.addEventListener('click', () => {
    mediaRecorder.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
    preview.srcObjet = null;
});

function saveRecording(blob) {
    const url = URL.createObjectURL(blob);
    const recording =  { url, timestamp: new Date().toLocaleString() };

    const request indexDB.open('screenRecordings', 1);

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objet)        
    }
}