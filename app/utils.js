const json = (status, statusText, res, message, data, meta) => {
  const response = {
    message
  }
  if (typeof data !== 'undefined') {
    response.data = data
  }
  if (typeof meta !== 'undefined') {
    response.meta = meta
  }
  if (typeof statusText !== 'undefined') {
    response.status = statusText
  }

  return res.status(status).json(response)
}

const jsonResolveError = (err, res, message) => {
  const response = {
    response: {
      message: 'Validation error has occured'
    }
  }

  if (typeof message !== 'undefined') {
    response.response.message = message
  }
  if (err.message) {
    response.response.message = err.message
  }
  if (err.response && err.response.body) {
    response.response.message = err.response.body.message
    response.response.errors = err
    return res.status(400).json(response)
  }
  if (err.Errors) {
    response.response.errors = err.Errors
    return res.status(400).json(response)
  }
  if (err.name === 'StatusCodeError') {
    response.response.message = err.message
    response.response.errors = err
    return res.status(err.statusCode).json(response)
  }
  if (err.name === 'RequestError') {
    response.response.message = 'External Server Is Down'
    response.response.errors = err
    return res.status(500).json(response)
  }
  if (err.cause && err.cause.code === 'ECONNREFUSED') {
    response.response.message = 'External Server Is Down'
    response.response.errors = err
    return res.status(500).json(response)
  }
  if (err.error && err.error.message) {
    response.response.message = err.error.message
    response.response.errors = err
    return res.status(500).json(response)
  }

  return res.send(response)
}

const cmToFeetConverter = (heightInCm) => {
  let inches = (heightInCm * 0.393700787).toFixed(0)
  const feet = Math.floor(inches / 12)
  inches %= 12

  const totalHeightInFt = `${feet}ft ${inches} inches`
  return totalHeightInFt
}

module.exports = {
  response: json,
  errorResponse: jsonResolveError,
  cmToFeetConverter
}
