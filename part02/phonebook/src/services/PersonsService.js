import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}


const create = (newPerson) => {
  return axios
    .post(baseUrl, newPerson)
    .then(response => response.data)
}

const remove = (id) => {
  const url = `${baseUrl}/${id}`
  return axios
    .delete(url)
}

const modify = (id, person) => {
  const url = `${baseUrl}/${id}`
  return axios
    .put(url, person)
    .then(response => response.data)
}

export default { getAll, create, remove, modify }