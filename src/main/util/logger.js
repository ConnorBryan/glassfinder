/**
 * @func logger
 * @desc Gracefully handle error reporting.
 * @param {Error} error 
 */
export default function logger(error) {
  console.error(`GLASSFINDER ERROR: > ${error.toString()} <`);
}
