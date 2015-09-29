var scriptureUri = require('./scriptureUri');

var scenarios = [
  {
    uri: '/scriptures/dc-testament/dc/110',
    href: '//lds.org/scriptures/dc-testament/dc/110#0',
    ref: 'DC 110'
  },
  {
    uri: '/scriptures/nt/matt/7.24-27',
    href: '//lds.org/scriptures/nt/matt/7.24-27#23',
    ref: 'MATT 7:24-27'
  },
  {
    uri: '/scriptures/pgp/js-h/1.30-34,68-72',
    href: '//lds.org/scriptures/pgp/js-h/1.30-34,68-72#29',
    ref: 'JS-H 1:30-34,68-72'
  },
  {
    uri: '/scriptures/bofm/1-ne/22.12',
    href: '//lds.org/scriptures/bofm/1-ne/22.12#11',
    ref: '1-NE 22:12'
  },
  {
    uri: '/scriptures/dc-testament/dc/133.36-39,52-53',
    href: '//lds.org/scriptures/dc-testament/dc/133.36-39,52-53#35',
    ref: 'DC 133:36-39,52-53'
  },
  {
    uri: '/scriptures/pgp/moses/7.62,67',
    href: '//lds.org/scriptures/pgp/moses/7.62,67#61',
    ref: 'MOSES 7:62,67'
  },
  {
    uri: '/scriptures/pgp/js-h/1.14-20,25',
    href: '//lds.org/scriptures/pgp/js-h/1.14-20,25#13',
    ref: 'JS-H 1:14-20,25'
  },
  {
    uri: '/scriptures/dc-testament/dc/76.56-57,66(50-70)',
    href: '//lds.org/scriptures/dc-testament/dc/76.56-57,66#55',
    ref: 'DC 76:56-57,66(50-70)'
  },
  {
    uri: '/scriptures/pgp/moses/7.13,16-21,63-69',
    href: '//lds.org/scriptures/pgp/moses/7.13,16-21,63-69#12',
    ref: 'MOSES 7:13,16-21,63-69'
  },
  {
    uri: '/scriptures/pgp/js-h/1.30-34,68-72',
    href: '//lds.org/scriptures/pgp/js-h/1.30-34,68-72#29',
    ref: 'JS-H 1:30-34,68-72'
  },
  {
    uri: '/scriptures/ot/ps/148',
    href: '//lds.org/scriptures/ot/ps/148#0',
    ref: 'PS 148'
  },
  {
    uri: '/scriptures/ot/gen/6-8',
    href: '//lds.org/scriptures/ot/gen/6-8#0',
    ref: 'GEN 6-8'
  }
];

describe('scirptureUri', function () {
  it('should generate ref and href from uri', function () {
    scenarios.forEach(function (scenario) {
      scriptureUri.toHref(scenario.uri).should.equal(scenario.href);
      scriptureUri.toRef(scenario.uri).should.equal(scenario.ref);
    });
  });
});
