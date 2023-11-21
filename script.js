const cardNumberInput = document.getElementById('cardNumber');  
const imgCompany = document.querySelector("#company_card");
const form = document.querySelector('form');
const errorText = document.getElementById('error_text');
const cardCvvInput = document.querySelector("#cvv")
const cardCvvDisplay = document.querySelector(".displayCardCvv")
const cardNameInput = document.getElementById('cardName');
const displayCardName = document.getElementById('displayCardName');
const cardNumberDivs = document.querySelectorAll(".card-number-div");
const inputDate = document.getElementById('inputDate');
const inputYear = document.getElementById('inputYear');
const displayCardExpire = document.getElementById('displayCardExpire');

cardNumberInput.addEventListener("input", () => {

    const digits = cardNumberInput.value.split("");

    if (digits[0] === "6") {
        imgCompany.src = "img/amex.png";
      } else if (digits[0] === "4") {
        imgCompany.src = "img/visa.png";
      }else{
        imgCompany.src = "img/mastercard.png";
      }
    

  cardNumberDivs.forEach((item) => {
    const cardNumberHiddens = item.querySelectorAll(".card-number-hidden");
    cardNumberHiddens.forEach((digit) => {
      digit.textContent = "#";
    });
  });



    digits.forEach((digit, index) => {
        if (/[^0-9]/.test(digit)) {
        textError(inputNumber, error, "Please only use digits");
        } else {
        const cardNumberHidden = cardNumberDivs[
            Math.floor(index / 4)
        ].querySelectorAll(".card-number-hidden")[index % 4];

        cardNumberHidden.textContent = "#";

        if (index === digits.length - 1) {
            cardNumberHidden.classList.add("slide-up");
            setTimeout(() => {
            cardNumberHidden.textContent = digit;
            cardNumberHidden.classList.remove("slide-up");
            }, 300);
        } else {
            cardNumberHidden.textContent = digit;
        }
        }
    });

});

cardNumberInput.addEventListener("keypress", (event) => {
    const keyValue = event.key;

    if (isNaN(keyValue) && !event.ctrlKey) {
        event.preventDefault();
        const popup = document.getElementById('popup');
        popup.style.display = 'block';
        popup.innerText = "Please enter only numbers.";

        setTimeout(() => {
            popup.style.display = 'none';
        }, 2000);
    }
});



// schimb de nume

cardNameInput.addEventListener("input", (event) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[0-9]/g, '');

    displayCardName.innerText = sanitizedValue !== "" ? sanitizedValue.toUpperCase() : "AD SOYAD";

    if (inputValue !== sanitizedValue) {
        event.target.value = sanitizedValue; 
        const popup = document.getElementById('popup');
        popup.innerText = "Please do not enter numbers in the name.";
        popup.style.display = 'block';

        setTimeout(() => {
            popup.style.display = 'none';
        }, 2000);
    }
});


// schimb de data

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
    let nr = "";
    cardCvv.split('').forEach(character => {
        if (!isNaN(character) && character !== ' ') {
            nr += character;
        }
    });

    return nr;
};

cardCvvInput.addEventListener('input', (event) => {
    const inputCvv = event.target.value;
    const sanitizedCvv = maskCardCvv(inputCvv);

    cardCvvDisplay.textContent = sanitizedCvv;

    if (inputCvv !== sanitizedCvv) {
        event.target.value = sanitizedCvv;
        const popup = document.getElementById('popup');
        popup.innerText = "Please enter only numbers.";
        popup.style.display = 'block';

        setTimeout(() => {
            popup.style.display = 'none';
        }, 2000);
    }
});




const cardForm = document.querySelector('#box form');

const resetCard = () => {
  if (isFlipped) {
    toggleCardView();
    isFlipped = false; 
  }
}

const handleSubmit = (ev) => {
    ev.preventDefault();
    const cardData = {
      cardNumber: cardNumberInput.value,
      cardName: cardNameInput.value,
      expirationMonth: inputDate.value,
      expirationYear: inputYear.value,
      cvv: cardCvvInput.value,
    };
  
    console.log(cardData);
  
    displayCardName.innerText = 'AD SOYAD';
  
    cardCvvDisplay.textContent = '';
  
    displayCardExpire.textContent = "MM/YY"
  
    cardNumberDivs.forEach((item) => {
      const cardNumberHiddens = item.querySelectorAll(".card-number-hidden");
      cardNumberHiddens.forEach((digit) => {
        digit.textContent = "#";
      });
    });
  
    resetCard();
    cardForm.reset();
};
  
cardForm.addEventListener('submit', handleSubmit);
  









