## visa-validation

visa-validation is a module that help you validate a visa credit card.

### Basic Usage

To use this module you only have to insert the visa credit card informations into the method `validateVisa()`, as shown on the example bellow.
```javascript
var visaCard = require('visa-validation');
var card = {
  number: '4916396764746993',
  expiryMonth: '12',
  expiryYear: '2017',
  cvv: '123'
};
var validation = visaCard.validateVisa(card);
```

So `validateVisa()` will return an object like this:

```javascript
{ card:
   { number: '4916396764746993',
     expiryMonth: '12',
     expiryYear: '2017',
     cvv: '123' },
  validCardNumber: true,
  validExpiryMonth: true,
  validExpiryYear: true,
  validCvv: true,
  isExpired: false }
}
```

### Methods

You can also use those methods, to get each information of the visa card separately: **hasVisaPatterns(), isValidCvv(), isExpired(), isValidExpiryYear(), isValidExpiryMonth(), isValidCardNumber(), luhn()**

### Other Credit Card Types

To test other credit card you can use the module [credit-card](https://www.npmjs.com/package/credit-card).
