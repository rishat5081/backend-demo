const JSONAPIError = require('jsonapi-serializer').Error
module.exports = {
  error: (code, pointer, title, detail) => {
    if (Array.isArray(title)) {
      return new JSONAPIError(
        title.map((data) => ({
          code,
          source: { pointer },
          title: data.msg,
          detail
        }))
      )
    } else {
      return new JSONAPIError({
        code,
        source: { pointer },
        title,
        detail
      })
    }
  }
}
