var expect = require('chai').expect;
const creditCard = require('../lib/visa');

describe('#isValidExpiryMonth()', function() {
  it('returns true for valid month', function (done) {
    expect(creditCard.isValidExpiryMonth('01')).to.equal(true);
    expect(creditCard.isValidExpiryMonth('02')).to.equal(true);
    expect(creditCard.isValidExpiryMonth('03')).to.equal(true);
    expect(creditCard.isValidExpiryMonth(04)).to.equal(true);
    expect(creditCard.isValidExpiryMonth(5)).to.equal(true);
    expect(creditCard.isValidExpiryMonth(6)).to.equal(true);
    expect(creditCard.isValidExpiryMonth(7)).to.equal(true);
    expect(creditCard.isValidExpiryMonth(8)).to.equal(true);
    expect(creditCard.isValidExpiryMonth(9)).to.equal(true);
    expect(creditCard.isValidExpiryMonth('10')).to.equal(true);
    expect(creditCard.isValidExpiryMonth(11)).to.equal(true);
    expect(creditCard.isValidExpiryMonth(12)).to.equal(true);
    done();
  });

  it('returns false for invalid month', function(done) {
    expect(creditCard.isValidExpiryMonth('001')).to.equal(false);
    expect(creditCard.isValidExpiryMonth(0)).to.equal(false);
    expect(creditCard.isValidExpiryMonth(13)).to.equal(false);
    done();
  });
});

describe('#isValidExpiryYear()', function() {
  it('returns true for valid year', function(done) {
    expect(creditCard.isValidExpiryYear('2017')).to.equal(true);
    expect(creditCard.isValidExpiryYear(2000)).to.equal(true);
    expect(creditCard.isValidExpiryYear(2011)).to.equal(true);
    expect(creditCard.isValidExpiryYear(2088)).to.equal(true);
    expect(creditCard.isValidExpiryYear(2100)).to.equal(true);
    done();
  });

  it('returns false for invalid year', function(done) {
    expect(creditCard.isValidExpiryYear('1999')).to.equal(false);
    expect(creditCard.isValidExpiryYear(2101)).to.equal(false);
    expect(creditCard.isValidExpiryYear(201)).to.equal(false);
    done();
  });
});

describe('#isExpired()', function() {
  it('returns false for non-expired card', function(done) {
    expect(creditCard.isExpired(12, 2019)).to.equal(false);
    done();
  });

  it('returns true for an expired card', function(done) {
    expect(creditCard.isExpired(01, 2014)).to.equal(true);
    done();
  });

 it('returns true when card has expired last month', function(done) {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    //console.log(date.setMonth(date.getMonth() - 1));
    //console.log(date.getMonth());
    expect(creditCard.isExpired(date.getMonth() + 1, date.getFullYear())).to.equal(true);
    done();
  });

  it('returns false when card expires this month', function(done) {
    const date = new Date();
    expect(creditCard.isExpired(date.getMonth() + 1, date.getFullYear())).to.equal(false);
    done();
  });
});

describe('#isValidCvv()', function() {
  it('returns true for valid cvv matches', function(done) {
    expect(creditCard.isValidCvv('657')).to.equal(true);
    expect(creditCard.isValidCvv('456')).to.equal(true);
    done();
  });

  it('returns false for invalid cvv', function(done) {
    expect(creditCard.isValidCvv('12')).to.equal(false);
    expect(creditCard.isValidCvv('1234')).to.equal(false);
    expect(creditCard.isValidCvv('1')).to.equal(false);
    expect(creditCard.isValidCvv('')).to.equal(false);
    expect(creditCard.isValidCvv(null)).to.equal(false);
    expect(creditCard.isValidCvv({})).to.equal(false);
    done();
  });


});

describe('#isValidCardNumber()', function() {
   it('returns true for valid cards', function(done) {
     //expect(creditCard.isValidCardNumber('4888888888888888')).to.equal(true);
     //expect(creditCard.isValidCardNumber('4766460513896735')).to.equal(true);
     //expect(creditCard.isValidCardNumber('4111111111111')).to.equal(true);
     expect(creditCard.isValidCardNumber('4539742435907042')).to.equal(true);
     expect(creditCard.isValidCardNumber('4111111111111111')).to.equal(true);
     expect(creditCard.isValidCardNumber('4007000000027')).to.equal(true);
     done();
   });

   it('returns false for numbers that pass luhn but doesn\'t has Visa code Pattern', function(done) {
     expect(creditCard.isValidCardNumber('434')).to.equal(false);
     done();
   });
});

describe('#hasVisaPatterns()', function(){
  it('returns true for valid valid Visa Pattern', function(done) {
    expect(creditCard.hasVisaPatterns('4111111111111111')).to.equal(true);
    expect(creditCard.hasVisaPatterns('4012888888881881')).to.equal(true);
    expect(creditCard.hasVisaPatterns('4222222222222')).to.equal(true);
    done();
  });

  it('returns false for invalid Visa Pattern', function(done) {
    expect(creditCard.hasVisaPatterns('6011000000000012')).to.equal(false);
    done();
  });
});

describe('#luhn()', function() {
  it('returns true for valid credit card code', function(done) {
    expect(creditCard.luhn('378734493671000')).to.equal(true);
    expect(creditCard.luhn('5610591081018250')).to.equal(true);
    expect(creditCard.luhn('3566002020360505')).to.equal(true);
    expect(creditCard.luhn('5555555555554444')).to.equal(true);
    expect(creditCard.luhn('6331101999990016')).to.equal(true);
    done();
  });

  it('returns false for invalid credit card code', function(done) {
    expect(creditCard.luhn('5105105105105101')).to.equal(false);
    expect(creditCard.luhn('4111111111111112')).to.equal(false);
    expect(creditCard.luhn('')).to.equal(false);
    expect(creditCard.luhn(' ')).to.equal(false);
    expect(creditCard.luhn(undefined)).to.equal(false);
    expect(creditCard.luhn([])).to.equal(false);
    expect(creditCard.luhn('abc')).to.equal(false);
    done();
  });
});

describe('#validateVisa()', function() {
  it('no invalid responses on valid card', function(done) {
    const card = {
      number: '4916396764746993',
      expiryMonth: '12',
      expiryYear: '2017',
      cvv: '123'
    };
    const validation = creditCard.validateVisa(card);

    expect(validation.card).to.equal(card);
    expect(validation.validCardNumber).to.equal(true);
    expect(validation.validExpiryMonth).to.equal(true);
    expect(validation.validExpiryYear).to.equal(true);
    expect(validation.validCvv).to.equal(true);
    expect(validation.isExpired).to.equal(false);
    done();
  });

  it('invalid responses on invalid card', function(done) {
    const card = {
      number: '4111111111111112',
      expiryMonth: '13',
      expiryYear: '2100',
      cvv: '463'
    };
    const validation = creditCard.validateVisa(card);

    expect(validation.card).to.equal(card);
    expect(validation.validCardNumber).to.equal(false);
    expect(validation.validExpiryMonth).to.equal(false);
    expect(validation.validExpiryYear).to.equal(true);
    expect(validation.validCvv).to.equal(true);
    expect(validation.isExpired).to.equal(false);
    done();
  });

  it('invalid responses on no card', function(done) {
    //const card = {};
    const validation = creditCard.validateVisa();

    expect(validation.card).to.deep.equal({});
    expect(validation.validCardNumber).to.equal(false);
    expect(validation.validExpiryMonth).to.equal(false);
    expect(validation.validExpiryYear).to.equal(false);
    expect(validation.validCvv).to.equal(false);
    expect(validation.isExpired).to.equal(false);
    done();
  });
});
