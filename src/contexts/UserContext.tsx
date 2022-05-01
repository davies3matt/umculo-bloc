import * as React from "react"

interface IUserContextInterface {
  userId: string
  updateUserId: React.Dispatch<React.SetStateAction<string>>
}

type Props = {
  children: React.ReactNode
}

export const HouseBoardUserContext = React.createContext<IUserContextInterface>(
  {
    userId: "",
    updateUserId: () => {},
  }
)

export const HouseBoardUserContextConsumer = HouseBoardUserContext.Consumer

export const useUserContext = () => React.useContext(HouseBoardUserContext)

const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [userId, updateUserId] = React.useState("")
  return (
    <HouseBoardUserContext.Provider
      value={{
        userId,
        updateUserId,
      }}
    >
      {children}
    </HouseBoardUserContext.Provider>
  )
}

export default UserContextProvider
