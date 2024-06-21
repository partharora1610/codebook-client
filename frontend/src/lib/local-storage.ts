class LocalStorageManager {
  constructor() {}

  private isLocalStorageSupported(): boolean {
    try {
      const testKey = "__test__"
      localStorage.setItem(testKey, testKey)
      localStorage.removeItem(testKey)
      return true
    } catch (error) {
      return false
    }
  }

  public setItem(key: string, value: any): void {
    try {
      const jsonValue = JSON.stringify(value)
      localStorage.setItem(key, jsonValue)
    } catch (error) {
      console.error("Error setting item in local storage:", error)
    }
  }

  public getItem<T>(key: string): T | null {
    try {
      const jsonValue = localStorage.getItem(key)
      if (jsonValue !== null) {
        return JSON.parse(jsonValue) as T
      }
      return null
    } catch (error) {
      console.error("Error getting item from local storage:", error)
      return null
    }
  }

  public removeItem(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error("Error removing item from local storage:", error)
    }
  }

  public clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      console.error("Error clearing local storage:", error)
    }
  }
}

const storageManager = new LocalStorageManager()

export default storageManager
