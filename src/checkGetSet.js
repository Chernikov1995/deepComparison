/**
 * @param obj
 */
function checkGetSet (obj) {
  const entries = Object.entries(Object.getOwnPropertyDescriptors(obj)).filter(([, PropDecriptor]) => {
    return Object.hasOwnProperty.call(PropDecriptor, 'value')
  })

  return entries.length !== Object.entries(obj).length
}
