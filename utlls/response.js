module.exports = {
  responses: (res, response) => {
    if (response?.errors?.length > 0) {
      res.status(response.httpCode).send({ error: response.errors })
      res.end()
    } else {
      res.status(response.httpCode).send(response.data)
      res.end()
    }
  }
}
