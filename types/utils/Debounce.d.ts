/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * E.g.
 * VueComponent.vue
 * export default {
 *    methods: {
 *      // MUST use function() {} instead of arrow function () => {}
 *      addNumber: debounce(function (a, b) {
 *        return a + b
 *      })
 *    }
 * }
 *
 * @param {Function} func function need to call
 * @param {number} wait time to delay in milliseconds
 * @param {boolean} immediate call function immediate or wait
 * @returns {Function} debounce function to call
 */
export function debounce(
  func: Function,
  wait: number,
  immediate: boolean
): Function;
