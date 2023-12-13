const getParliamentVotesData = async (csvFileName) => {
  try {
    const response = await fetch(`https://raw.githubusercontent.com/anerodata/data-elecciones-congreso-espana/main/${csvFileName}.csv`)
    if (response.ok) {
      return await response.text()
    }
    throw new Error(`Error fetching data: ${response.status} ${response.statusText}`)
  } catch (error) {
    throw new Error(error.message)
  }
}
export default getParliamentVotesData
