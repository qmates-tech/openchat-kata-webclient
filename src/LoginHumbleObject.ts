type LoggedUser = {
  id: string,
  username: string,
  about: string,
}

export default function () {
  return {
    tryLogin: async (username: string, password: string): Promise<LoggedUser> => {
      return new Promise<LoggedUser>((resolve, reject) => {
        setTimeout(() => {
          console.log("try login with:", username, password)

          if(username === "wrong") {
            reject()
            return
          }

          const loggedUser = {
            id: "45cd408b-9546-4fea-a49a-47a1e230892b",
            username: username,
            about: "This is the about of the user."
          }
          resolve(loggedUser)
        }, 1000)
      })
    }
  }
}
