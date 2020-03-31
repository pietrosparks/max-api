module.exports = {
  starwarsBaseUrl: 'https://swapi.co/api',
  sortHelper: (sortField, order = 'asc') => {
    const validSortFields = ['name', 'gender', 'height']

    if (!validSortFields.includes(sortField.toLowerCase())) return

    if (order.toLowerCase() === 'desc') {
      return function(a, b) {
        const checkOne =
          sortField === 'height'
            ? Number(a[sortField]) > Number(b[sortField])
            : a[sortField] > b[sortField]

        const checkTwo =
          sortField === 'height'
            ? Number(b[sortField]) > Number(a[sortField])
            : b[sortField] > a[sortField]

        if (checkOne) {
          return -1
        }

        if (checkTwo) {
          return 1
        }
        return 0
      }
    }

    return function(a, b) {
      const checkOne =
        sortField === 'height'
          ? Number(b[sortField]) > Number(a[sortField])
          : b[sortField] > a[sortField]

      const checkTwo =
        sortField === 'height'
          ? Number(a[sortField]) > Number(b[sortField])
          : a[sortField] > b[sortField]

      if (checkOne) {
        return -1
      }
      if (checkTwo) {
        return 1
      }
      return 0
    }
  }
}
