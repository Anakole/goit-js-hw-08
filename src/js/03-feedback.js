import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
    form: document.querySelector('.feedback-form');
    email: document.querySelector('.feedback-form input');
    massage: document.querySelector('.feedback-form textarea');
}

refs.form.addEventListener('submit', submitForm);
refs.form.addEventListener('input', throttle(inputForm));

let formData = {};

const inputForm = event => {
    formData[event.tardet.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

const submitForm = event => {
    event.preventDefault();
    event.currentTarget.reset();

    localStorage.removeItem(STORAGE_KEY);
    formData = {};
}

function populateTextarea() {
    const formData = localStorage.getItem(STORAGE_KEY);

    if (!formData) {
        return;
    }

    Object.entries(formData).forEach(([name, value]) => {
    inputRef.elements[name].value = value;
    });
}

populateTextarea();