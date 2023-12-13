const getParliamentVotesData = async (csvFileName) => {
  try {
    const response = await fetch(`https://raw.githubusercontent.com/anerodata/data-elecciones-congreso-espana/main/${csvFileName}.csv`)
    if (response.ok) {
      return await response.text()
    }
    throw new Error(response.statusText)
  } catch (error) {
    return error
  }
}
export default getParliamentVotesData
