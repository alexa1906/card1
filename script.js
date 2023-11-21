const cardNumberInput = document.getElementById('cardNumber');
const displayCardNumber = document.getElementById('displayCardNumber');
const imgCompany = document.querySelector("#company_card");
const form = document.querySelector('form');
const errorText = document.getElementById('error_text');
const cardCvvInput = document.querySelector("#cvv")
const cardCvvDisplay = document.querySelector(".displayCardCvv")
const cardNameInput = document.getElementById('cardName');
const displayCardName = document.getElementById('displayCardName');


const maskCardNumber = (cardNumber) => {
    let cardNumbersDisplay = '';

    cardNumber.split('').forEach((character, index) => {
        if (!isNaN(character) && character !== ' ') {
            if (index > 0 && index % 4 === 0) {
                cardNumbersDisplay += ' ';
            }
            cardNumbersDisplay += character;
        }
    });

    if (cardNumbersDisplay.charAt(0) === '6') {
        imgCompany.src = "img/amex.png";
    } else if (cardNumbersDisplay.charAt(0) === '4') {
        imgCompany.src = "img/visa.png";
    } else {
        imgCompany.src = "img/mastercard.png";
    }

    return cardNumbersDisplay;
};


cardNumberInput.addEventListener('input', (event) => {
    const inputValue = event.target.value;
    displayCardNumber.textContent = maskCardNumber(inputValue);

    showError(inputValue, errorText);
});

// schimb de nume

cardNameInput.addEventListener('input', () => {
    displayCardName.textContent = cardNameInput.value;
});

// schimb de data
const inputDate = document.getElementById('inputDate');
const inputYear = document.getElementById('inputYear');
const displayCardExpire = document.getElementById('displayCardExpire');

const updateCardExpire = () => {
    const selectedMonth = inputDate.value;
    const selectedYear = inputYear.value.slice(-2);

    displayCardExpire.textContent = `${selectedMonth}/${selectedYear}`;
};

inputDate.addEventListener('change', updateCardExpire);
inputYear.addEventListener('change', updateCardExpire);

// schimb cvv

let isFlipped = false;

const toggleCardView = () => {
    const cardFace = document.querySelector('.card-face');
    const cardFront = document.querySelector('.card-front');
    const cardBack = document.querySelector('.card-back');

    if (!isFlipped) {
        cardFace.style.transform = 'rotateY(180deg)';
        cardBack.style.display = 'block';
        cardFront.style.display = 'none';
        isFlipped = true;
    } else {
        cardFace.style.transform = 'rotateY(0deg)';
        cardBack.style.display = 'none';
        cardFront.style.display = 'block';
        isFlipped = false;
    }
};

cardCvvInput.addEventListener("focus", toggleCardView);
cardCvvInput.addEventListener("focusout", toggleCardView);


const maskCardCvv = (cardCvv) => {
    let nr = ""
   cardCvv.split('').forEach(character => {
    if (!isNaN(character) && character !== ' ') {
        nr += character;
    }
 });

    return nr;
};

cardCvvInput.addEventListener('input', () => {
    const inputCvv = cardCvvInput.value;
    cardCvvDisplay.textContent = maskCardCvv(inputCvv);

    showError(inputCvv, errorText);
});


const showError = (inputValue, errorElement) => {
    const containsNonNumeric = /[^0-9]/.test(inputValue);

    if (containsNonNumeric) {
        errorElement.textContent = 'Please enter only numeric characters.';
        errorElement.style.display = 'block';
        return true; 
    } else {
        errorElement.style.display = 'none';
        return false; 
    }
};

const buttonSubmit = document.querySelector("#submitButton")
form.addEventListener('submit', (ev) => {

    const cardNumberError = showError(cardNumberInput.value, errorText);
    const cardCvvError = showError(cardCvvInput.value, errorText);

    if (cardNumberError || cardCvvError) {
        ev.preventDefault(); 
        
        buttonSubmit.style.backgroundColor = "red"
    }
});

// const cardForm = document.querySelector('#box form');

// const handleSubmit = (ev) => {

//     ev.preventDefault();
//     const cardData = {
//         cardNumber: cardNumberInput.value,
//         cardName: cardNameInput.value,
//         expirationMonth: inputDate.value,
//         expirationYear: inputYear.value,
//         cvv: cardCvvInput.value,
//     };

//     // console.log(cardData);
//     toggleCardView();

//     const cardDataJson = JSON.stringify(cardData)
//     console.log(cardDataJson)

//     cardForm.reset();
//     isFlipped = false

// };

// cardForm.addEventListener('submit', handleSubmit);


