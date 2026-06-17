import AsyncStorage from '@react-native-async-storage/async-storage';


const key = "recent-searches"

const setItem = async (value: string) => {

  try {
    // await AsyncStorage.setItem(key, JSON.stringify(["shoes"])) // debugging line
    const allRecentSearches = await getItem()
    if (!allRecentSearches || allRecentSearches.length < 1) {
      await AsyncStorage.setItem(key, JSON.stringify([value]))
      return
    }

    if (allRecentSearches.includes(value) || value.trim().length == 0) {
      return
    }
    // console.log("existing", existingValue)
    // console.log("value", value)
    // console.log("allRecentSearches", allRecentSearches)
    allRecentSearches.push(value)
    await AsyncStorage.setItem(key, JSON.stringify(allRecentSearches))
  } catch (e) {
    // saving error
    console.log(e)
  }
}

const getItem = async (): Promise<string[] | undefined> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return JSON.parse(value) as string[]
    }
    return [] 
  } catch (e) {
    // error reading value
    console.log(e)
  }
}

const removeItem = async () => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // error reading value
    console.log(e)
  }
}

export { setItem, getItem, removeItem }