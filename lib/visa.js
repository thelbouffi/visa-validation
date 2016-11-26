'use strict'

let _defaults = {
  patterns: {
      cardPattern: /^4[0-9]{12}(?:[0-9]{3})?$/,
      cvvPattern: /^\d{3}$/
  },
  expiryMonths: {
    min: 1,
    max: 12
  },
  expiryYears: {
    min: 2000,
    max: 2100
  }
};
////////////////////////////////////////////////////////////////////////////////
function isValidCardNumber (number) {
  return hasVisaPatterns (number) && luhn (number);
}

function luhn (number) {

  if (/[^\d]+/.test(number) || typeof number !== 'string' || !number) {
    return false;
  }

  let nCheck = 0;
  let bEven = false;
  let nDigit;

  for (let i = number.length - 1; i >= 0; --i) {
    nDigit = ~~number.charAt(i);

    if (bEven) {
      if ((nDigit *= 2) > 9) {
        nDigit -= 9;
      }
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  return (nCheck % 10) === 0;
}
////////////////////////////////////////////////////////////////////////////////
function isValidExpiryMonth (month) {
  const settings = _defaults.expiryMonths;

  if (typeof month === 'string' && month.length > 2) {
    return false;
  }

  return month >= settings.min && month <= settings.max;
}
////////////////////////////////////////////////////////////////////////////////
function isValidExpiryYear (year) {
  const settings = _defaults.expiryYears;

  if (typeof year === 'string' && year.length !== 4) {
    return false;
  }

  return year >= settings.min && year <= settings.max;
}
////////////////////////////////////////////////////////////////////////////////
function isExpired (month, year) {

  const expiration = new Date(year, month);

  return Date.now() >= expiration;
}
////////////////////////////////////////////////////////////////////////////////
function isValidCvv(cvv) {
  const patterns = _defaults.patterns;
  return patterns.cvvPattern.test(cvv);
}
////////////////////////////////////////////////////////////////////////////////
function hasVisaPatterns (number) {
  const patterns = _defaults.patterns;
  return patterns.cardPattern.test(number);
}
////////////////////////////////////////////////////////////////////////////////
function validateVisa (card) {
  card = card || {};
  return {
    card,
    validCardNumber: isValidCardNumber(card.number),
    validExpiryMonth: isValidExpiryMonth(card.expiryMonth),
    validExpiryYear: isValidExpiryYear(card.expiryYear),
    validCvv: isValidCvv(card.cvv),
    isExpired: isExpired(card.expiryMonth, card.expiryYear)
  };
}
////////////////////////////////////////////////////////////////////////////////
module.exports = {
  validateVisa,
  hasVisaPatterns,
  isValidCvv,
  isExpired,
  isValidExpiryYear,
  isValidExpiryMonth,
  isValidCardNumber,
  luhn
};
