/** @type {HTMLTextAreaElement} */
const textarea = document.getElementById('textarea');
const generateButton = document.getElementById('generate');
const countDecButton = document.getElementById('count-dec');
const countIncButton = document.getElementById('count-inc');
const clipboardButton = document.getElementById('clipboard');
const clipboardOneButton = document.getElementById('clipboard-one');
const copiedText = document.getElementById('copied-text');

/** @type {HTMLInputElement} */
const uppercaseCheckbox = document.getElementById('uppercase');
/** @type {HTMLInputElement} */
const hyphensCheckbox = document.getElementById('hyphens');
/** @type {HTMLInputElement} */
const countInput = document.getElementById('count');

let uppercaseChecked = uppercaseCheckbox.checked;
let hyphensChecked = hyphensCheckbox.checked;
let countValue = countInput.valueAsNumber;

uppercaseCheckbox.addEventListener('change', function () {
    uppercaseChecked = this.checked;
    generate();
});
hyphensCheckbox.addEventListener('change', function () {
    hyphensChecked = this.checked;
    generate();
});
countInput.addEventListener('keyup', function () {
    countInput.dispatchEvent(new Event('change'));
    generate();
});
countInput.addEventListener('change', function () {
    countValue = this.valueAsNumber;
    generate();
});
countDecButton.addEventListener('click', function () {
    countInput.valueAsNumber = countValue - 1;
    countInput.dispatchEvent(new Event('change'));
});
countIncButton.addEventListener('click', function () {
    countInput.valueAsNumber = countValue + 1;
    countInput.dispatchEvent(new Event('change'));
});


var timeoutHandle = NaN;
clipboardButton.addEventListener('click', function () {
    navigator.clipboard.writeText(textarea.value);
    copiedText.style.opacity = 1;
    copiedText.innerHTML = `Copied ${countValue} GUIDs!`;
    clearTimeout(timeoutHandle);
    timeoutHandle = setTimeout(() => { copiedText.style.opacity = 0; }, 3000);
});

clipboardOneButton.addEventListener('click', function () {
    const newGuid = uuidv4();
    navigator.clipboard.writeText(newGuid);
    copiedText.style.opacity = 1;
    copiedText.innerHTML = `Copied<br/>${newGuid}`;
    clearTimeout(timeoutHandle);
    timeoutHandle = setTimeout(() => { copiedText.style.opacity = 0; }, 3000);
});

function uuidv4() {
    /** @type {string} */
    let result = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
    if (uppercaseChecked) {
        result = result.toUpperCase();
    }
    if (!hyphensChecked) {
        result = result.replace(/-/g, '');
    }
    return result;
}

function generate() {
    textarea.value = Array.from(Array(countValue).keys())
        .map(_ => uuidv4())
        .join('\n');
}

generateButton.addEventListener('click', () => {
    generate();
});

generate();