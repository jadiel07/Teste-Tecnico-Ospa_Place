const BASE_URL = 'https://data.cityofchicago.org/resource/d7as-muwj.json'

export async function fetchSchools() {
  const response = await fetch(BASE_URL)
  return response.json()
}

export async function fetchSchoolById(id) {
  const response = await fetch(`${BASE_URL}?school_id=${id}`)
  const data = await response.json()
  return data[0]
}
