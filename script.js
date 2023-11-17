// schimb de #

const cardNumberInput = document.getElementById('cardNumber');
const displayCardNumber = document.getElementById('displayCardNumber');
const imgCompanie = document.querySelector("#company_card");

const maskCardNumber = (cardNumber) => {
    const digits = cardNumber.split('');
    let masked = '';

    digits.forEach((character, index) => {
        if (isNaN(character)) {
            masked += '#';
        } else {
            masked += character;
        }

        if ((index + 1) % 4 === 0 && index !== digits.length - 1) {
            masked += ' ';
        }

        if (cardNumberInput.value.charAt(0) === '6') {
            imgCompanie.src = "img/amex.png";
        } else if (cardNumberInput.value.charAt(0) === '4') {
            imgCompanie.src = "img/visa.png";
        } else {
            imgCompanie.src = "img/mastercard.png"
        }
    });

    return masked;
};

cardNumberInput.addEventListener('input', () => {
    const inputNumbers = cardNumberInput.value;
    const maskedNumbers = maskCardNumber(inputNumbers);

    displayCardNumber.textContent = maskedNumbers;
});

// schimb de nume
const cardNameInput = document.getElementById('cardName');
const displayCardName = document.getElementById('displayCardName');

const maskCardName = (cardName) => {
    const leters = cardName.split('');
    let masked = '';

    leters.forEach(character => {
        masked += character;
    });

    return masked;
};

cardNameInput.addEventListener('input', () => {
    const inputName = cardNameInput.value;
    const maskedName = maskCardName(inputName);

    displayCardName.textContent = maskedName;
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

const cardCvvInput = document.querySelector("#cvv")
const cardCvvDisplay = document.querySelector(".displayCardCvv")

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

cardCvvInput.addEventListener("click", toggleCardView);


const maskCardCvv = (cardCvv) => {
    const nr = cardCvv.split('');
    let masked = '';

    nr.forEach(character => {
        masked += character;
    });

    return masked;
};

cardCvvInput.addEventListener('input', () => {
    const inputCvv = cardCvvInput.value;
    const maskedCvv = maskCardCvv(inputCvv);

    cardCvvDisplay.textContent = maskedCvv;
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

