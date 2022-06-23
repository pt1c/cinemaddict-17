import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const humanizeRuntime = (runtime) => dayjs.duration(runtime, 'minutes').format('H[h] m[m]').replace(/\b0h\b/, '');
const humanizeReleaseDate = (date) => dayjs(date).format('D MMMM YYYY');
const checkMaxStringLength = (inputString, maxLength) => inputString.length <= maxLength;
const chopString = (inputString, maxLength, etcSymbol) => (checkMaxStringLength(inputString, maxLength)) ? inputString : (inputString.substr(0, maxLength - 1) + etcSymbol);

dayjs.extend(duration);

export {
  humanizeRuntime,
  humanizeReleaseDate,
  checkMaxStringLength,
  chopString
};
