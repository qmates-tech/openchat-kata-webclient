type LoginResult = string
export default function () {
  return {
    tryLogin: async (username: string, password: string) => {
      return new Promise<LoginResult>((resolve, reject) => {
        setTimeout(() => {
          console.log("try login with:", username, password)

          if(username === "error") {
            reject("Invalid credentials")
            return
          }

          resolve("success")
        }, 1000)
      })
    }
  }
}