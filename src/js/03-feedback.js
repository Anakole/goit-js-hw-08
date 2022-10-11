import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', submitForm);
refs.form.addEventListener('input', throttle(inputForm, 500));

let formData = {};

populateTextarea();

function inputForm(event) {
  formData[event.target.name] = event.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function submitForm(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    formData = JSON.parse(savedMessage);
    if (formData.email === undefined) {
      formData.email = '';
    }
    refs.email.value = formData.email;

    if (formData.message === undefined) {
      formData.message = '';
    }
    refs.message.value = formData.message;
  }
}
