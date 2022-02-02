/*This programs works with index.html
This program checks if a given integer is a prime number.
 If the number is not a prime, only the first factor is displayed to shorten the search.
 The search skips even numbers as well as numbers with a last digit of 5 as they cannot be primes.
 The square root of the number is used to limit the ceiling of the search.
 js_max_safe_integer: (2^53)-1 = 9007199254740991
*/

//** Declaration of global variables
var N; // number to check
var s = 2; // index value to start search
var n; // max number to iterate to: Sq. Root of N.
var composite = 0; //composite counter
var compArray = []; //composite array
var result = 10; // flags different outcomes:
// 0 = prime found; 1 = not prime; 2 = even num; 3 = last dig 5;
// 4 = not int; 5 = def not prime; 6 = not within min and max limits
// 7 = negative; 8 = exponential entry; 10 = all good, keep going
//** ---------------------------------

document.getElementById('reset').addEventListener('click', function () {
  document.getElementById('inputId').focus();
  document.getElementById('demo').innerHTML = '';
});

function validate() {
  // check for exponential entry
  if (/e/.test(N) || /E/.test(N)) return 8;
  // let sn1 = N.toLowerCase();
  // let sn2 = sn1.replace('e', '**');
  // N = eval(sn2);

  N = parseInt(N);

  // check if N is even; allow N=2
  if (N % 2 == 0 && N != 2) return 2;

  // check if N is not integer
  if (!Number.isInteger(N)) return 4;

  // check if last digit is 5; allow N=5
  if (N % 10 == 5 && N != 5) return 3;

  return 10; // all good keep going
}

function primeCheck() {
  let remainder = N % s;
  if (remainder == 0 && s != N) return 1; // factor found
  if (s == n || s == N) return 0; // prime number

  return 10;
}

function iterate() {
  do {
    if (s == n || s == N) {
      s = 2; // reset var
      result = 0; // prime found
      break;
    } else if (N % s == 0 && s != N) {
      compArray.push(s);
      composite++;
      result = 1;
      break; // factor found not prime; ends search .
    }
    s++;
  } while (s <= n);

  return result;
}

function displayResults(result) {
  var str;

  switch (result) {
    case 0:
      str = ' Prime Number.';
      break;
    case 1:
      str = ' not prime; it has at least one factor: ' + s;
      break;
    case 2:
      str =
        ' is an even number; can not be prime. The only even number that is prime is 2.';
      break;
    case 3:
      str = ' last digit is 5; cannot be prime';
      break;
    case 4:
      str = ' not integer ';
      break;
    case 5:
      str = ' not prime by definition';
      break;
    case 6:
      str = ' not within min and max limits';
      break;
    case 7:
      str = ' negative number; cannot be prime';
      break;
    case 8:
      str = ' exponential entry not allowed';
      break;
    default:
      str = ' encounter problem while checking ';
      break;
  }

  document.getElementById('demo').innerHTML = N + str;
  result = 10;
  s = 2;
}

function main() {
  // Selecting the input element and get its value
  N = document.getElementById('inputId').value;

  do {
    result = validate();
    if (result != 10) break;

    // for small numbers no need sq root
    if (N > 12) {
      n = Math.pow(N, 0.5);

      if (Number.isInteger(n)) {
        s = n;
        result = 1; // sq. root; N not prime
        break;
      }
    }

    if (N > 12) {
      n = Math.floor(n); // max number to iterate to.
    } else {
      n = N;
    }

    result = iterate();
    break;
  } while (result == 10);

  displayResults(result);
}
