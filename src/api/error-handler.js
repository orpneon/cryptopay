export function isClientEntry() {
  return !!window
}

function getVueInstance() {
  return isClientEntry() ? window.app.__vue__ : null
}

export function showError(error) {
  if (error) {
    isClientEntry() ? getVueInstance().$noty.error(error) : console.error(new Error(error))
  }
}

export default {
  showError,
  isClientEntry
}
