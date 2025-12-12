export { sleep };
/// utils for theokrueger.dev
///
/// (c) theokrueger 2024
/// GPL-3.0 Licensed

/* Util Functions */
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
