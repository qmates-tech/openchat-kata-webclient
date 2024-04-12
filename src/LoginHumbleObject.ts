export default function () {
  return {
    tryLogin: async (username: string, password: string) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          console.log("try login with:", username, password)
          resolve()
        }, 1000)
      })
    }
  }
}