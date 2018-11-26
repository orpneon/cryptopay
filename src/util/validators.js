const DEFAULT_ERROR = 'Неверный формат'

export function validateNumberField(validationError) {
  const error = validationError || DEFAULT_ERROR

  return function(val) {
    const checkRule = /^\d*\.?\d+$/

    if (checkRule.test(val) || !val) {
      return true
    }

    return error
  }
}
