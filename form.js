const myaudio = document.getElementById('audio'),
  switchCarsd = document.querySelector('.js-switch'),
  imageInput = document.getElementById('imageInput'),
  previewImage = document.getElementById('previewImage'),
  imageHere = document.getElementById('imageHere'),
  imgConatainer = document.getElementById('imgConatainer'),
  saveDtaails = document.getElementById('saveDtaails'),
  Edit = document.getElementById('Edit'),
  messages = document.getElementById('message')

let uploadedImageData = null; // To hold image temporarily

// Toggle view
switchCarsd.addEventListener('click', function () {
  document.body.classList.toggle('as-card');
  switchCarsd.style.display = 'none'
});

// Background music volume
myaudio.volume = 0.2;

// SAVE BUTTON: save image & mode to localStorage
saveDtaails.addEventListener('click', function () {
  if (document.body.classList.contains('as-card')) {
    localStorage.setItem('mode', 'save');

    if (uploadedImageData) {
      localStorage.setItem('userImage', uploadedImageData);
    }
    switchCarsd.style.display = 'none'
    // alert('Saved');
    saveDtaails.style.display = 'none';
    messages.style.display = "flex"
    setTimeout(() => {
      messages.style.display = "none"
    }, 2000);
  }
});

document.addEventListener('visibilitychange', ()=>{
  if (document.visibilityState === 'hidden') {
    myaudio.pause();
    myaudio.currentTime = 0
  }else{
    myaudio.play()
  }
})
// RESTORE MODE & IMAGE FROM LOCALSTORAGE
let savemode = localStorage.getItem('mode');
const storedImage = localStorage.getItem('userImage');

if (savemode === 'save') {
  document.body.classList.add('as-card');
  saveDtaails.style.display = 'none';

  if (storedImage) {
    previewImage.style.backgroundImage = `url('${storedImage}')`;
    previewImage.style.display = "flex";
    imgConatainer.style.display = "flex";
    imageHere.style.display = 'none';
  }
}

// IMAGE UPLOAD
imageInput.addEventListener('change', function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function () {
      uploadedImageData = reader.result;

      previewImage.style.backgroundImage = `url('${uploadedImageData}')`;
      previewImage.style.display = "flex";
      imgConatainer.style.display = "flex";
      imageHere.style.display = 'none';
    };

    reader.readAsDataURL(file);
  }
});

// Trigger file input when the image container is clicked
imageHere.addEventListener('click', function () {
  imageInput.click();
});
