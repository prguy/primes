/*
 This program generates prime numbers in a given range.
 This program is called from range.html
 The search skips even numbers as well as numbers with a last digit of 5 as they cannot be primes.
 The square root of the number is used to limit the ceiling of the search.
*/
//** Declaration of global variables
var N; // number searching for
var startN; // start of range search, big loop
var stopN; // stop of range search, big loop
var s = 2; // iteration value to start search, inner loop
var n; // max index to iterate to, inner loop
//var composite = 0; //composite counter
var compArray = []; //composite array
//** ---------------------------------

document.getElementById('reset').addEventListener('click', function () {
  document.getElementById('startN').focus();
  document.getElementById('nav-primes').innerHTML = '';
  document.getElementById('prmsFound').innerHTML = 'PRIME NUMBERS FOUND: ';
});

function validate() {
  if (
    /e/.test(startN) ||
    /E/.test(startN) ||
    /e/.test(stopN) ||
    /E/.test(stopN)
  ) {
    document.getElementById('prmsFound').innerHTML =
      'EXPONENTIAL ENTRY NOT ALLOWED ';
    return true;
  }

  if (startN.length > 16 || stopN.length > 16) {
    document.getElementById('prmsFound').innerHTML =
      'ENTERED RANGE IS OUT OF ALOWED LIMIT ';
    return true;
  }

  startN = parseInt(startN);
  stopN = parseInt(stopN);

  if (startN == stopN) {
    document.getElementById('prmsFound').innerHTML =
      'WRONG RANGE ENTERED: START SAME AS STOP';
    return true;
  } else if (startN > stopN) {
    document.getElementById('prmsFound').innerHTML =
      'WRONG RANGE ENTERED: START BIGGER THEN STOP';
    return true;
  } else if ((startN || stopN) < 0) {
    document.getElementById('prmsFound').innerHTML =
      'WRONG RANGE ENTERED: ONLY POSITIVE INTEGERS ALLOW';
    return true;
  }
  return false;
}

function primeCheck() {
  // composite found
  if (N % s == 0 && s != N) return 1;

  // number is prime
  if (s == n || s == N) return 0;

  return 4; //keep going
}

function checkExceptions() {
  // 0 or 1 are not primes
  if (N == 0 || N == 1) return 5;

  // check if N is even; allow N=2
  if (N % 2 == 0 && N != 2) return 2;

  // check if last digit is 5; allow N=5
  if (N % 10 == 5 && N != 5) return 3;

  return 4;
}

function iterate() {
  do {
    //result = primeCheck(N, n, s, composite);
    result = primeCheck(N, n, s);
    if (result == 0) {
      s = 2; // reset var
      // prime found
      compArray.push(N);
      //composite++;
      break;
    }
    if (result == 1) break;
    s++;
  } while (s <= n);

  return result;
}

function main() {
  // clear output display from previous operation
  compArray = [];
  document.getElementById('prmsFound').innerHTML =
    'Prime Numbers Found: ' + compArray.length;
  document.getElementById('nav-primes').innerHTML = compArray;

  // Set elapse time
  let elapse_start = new Date();

  // Selecting input elements and get its values
  startN = document.getElementById('startN').value;
  stopN = document.getElementById('stopN').value;

  var err = validate();

  if (err) {
    // Error found. End procedure
  } else {
    //Overall range loop
    for (let i = startN; i <= stopN; i++) {
      N = i;

      if (N > 12) {
        n = Math.pow(N, 0.5);
      }

      // Exceptions
      var result = checkExceptions(N);

      // skip Sq root of N or even number or last digit 5 or 0, 1
      if (result != 4) {
        // skip
      } else if (N > 12) {
        n = Math.pow(N, 0.5);

        if (!Number.isInteger(n)) {
          n = Math.floor(n); // max index to iterate to.
          result = iterate();
        }
      } else if (N <= 12) {
        n = N;
        result = iterate();
      }

      s = 2;
    }

    // Diplay results
    let elapse_end = new Date();
    let elapsed = elapse_end.getTime() - elapse_start.getTime();

    document.getElementById('nav-primes').innerHTML = compArray;
    document.getElementById('prmsFound').innerHTML =
      'PRIME NUMBERS FOUND: ' +
      compArray.length +
      ';  Calculation Elapsed time: ' +
      elapsed / 1000 +
      ' sec';
  }
}
