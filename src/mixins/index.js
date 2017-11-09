
// поиск следующего идентификатора в пуле
const nextId = {
  methods: {
    nextId (pool) {
      let id = null
      if (pool && typeof pool.length !== 'undefined') {
        for (id = 1; pool.indexOf(id) !== -1; id++) {}
        pool.push(id)
      }
      return id
    }
  }
}

export default {
  nextId
}
