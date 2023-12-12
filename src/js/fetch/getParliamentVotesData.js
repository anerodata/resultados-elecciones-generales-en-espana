const getParliamentVotesData = async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/anerodata/data-elecciones-congreso-espana/main/PROV_02_201911_1.csv')
    if (response.ok) {
      return await response.text()
    }
    throw new Error(response.statusText)
  } catch (error) {
    return error
  }
}
export default getParliamentVotesData
