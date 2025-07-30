const myaudio = document.getElementById('audio'),
  switchCarsd = document.querySelector('.js-switch'),
  imageInput = document.getElementById('imageInput'),
  previewImage = document.getElementById('previewImage'),
  imageHere = document.getElementById('imageHere'),
  imgConatainer = document.getElementById('imgConatainer'),
  saveDtaails = document.getElementById('saveDtaails'),
  Edit = document.getElementById('Edit'),
  messagesaved = document.getElementById('message'),
  messageClear = document.getElementById('messageClear'),
  clearData = document.getElementById('clearData'),
  containaer = document.getElementById('containaer'),
  Expertise = document.getElementById('Expertise'),
  inputs = document.querySelectorAll('input'),
  userName = document.getElementById('userName'),
  fronts = document.getElementById('front')

let uploadedImageData = null; // To hold image temporarily

// Toggle view
switchCarsd.addEventListener('click', function () {
  const parent = containaer.parentNode
  document.body.classList.toggle('as-card');
  switchCarsd.style.display = 'none'
  parent.insertBefore(Expertise, containaer)
  // inputs.style.display= "none"
  userName.disabled = true
  inputs.forEach(search=> search.disabled = true)
});

// Background music volume
myaudio.volume = 0.2;

document.addEventListener('visibilitychange', ()=>{
  if (document.visibilityState === 'hidden') {
    myaudio.pause();
    myaudio.currentTime = 0
  }else{
    myaudio.play()
  }
})
// SAVE BUTTON: save image & mode to localStorage
saveDtaails.addEventListener('click', function () {
  if (document.body.classList.contains('as-card')) {
    localStorage.setItem('mode', 'save');
    localStorage.setItem('fullName', userName.value);
localStorage.setItem('checkbox', fronts.key)
    inputs.forEach((input, index) => {
      localStorage.setItem(`input-${index}`, input.value);
    });

    if (uploadedImageData) {
      localStorage.setItem('userImage', uploadedImageData);
    }
    switchCarsd.style.display = 'none'
    // alert('Saved');
    saveDtaails.style.display = 'none';
    messagesaved.style.display = "flex";
    // imageHere.removeEventListener();
    setTimeout(() => {
      messagesaved.style.display = "none";
    }, 2000);
  }
});

clearData.addEventListener('click', function () {
  messageClear.style.display = 'flex'
  localStorage.clear()
  setTimeout(() => {
    window.location.href = window.location.href;
    
    messageClear.style.display = 'none'
  }, 2000);
})

// RESTORE MODE & IMAGE FROM LOCALSTORAGE
let savemode = localStorage.getItem('mode');
const storedImage = localStorage.getItem('userImage');
const storedFullName = localStorage.getItem('fullName');
const storedCheckValue = localStorage.getItem('checkbox');
if (savemode === 'save') {
  document.body.classList.add('as-card');
  saveDtaails.style.display = 'none';

  if (storedImage) {
    previewImage.style.backgroundImage = `url('${storedImage}')`;
    previewImage.style.display = "flex";
    imgConatainer.style.display = "flex";
    imageHere.style.display = 'none';
  }
  inputs.forEach((input, index) => {
    const savedValue = localStorage.getItem(`input-${index}`);
    if (savedValue !== null) {
      input.value = savedValue;
    }
  });
  
  if (storedFullName) {
    userName.value = storedFullName;
  }
  if (storedCheckValue) {
    fronts.key = storedCheckValue;
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
  if (!document.body.classList.contains('as-card')) {
    imageInput.click();
    imageHere.style.cursor = 'default'
    
  }
});
