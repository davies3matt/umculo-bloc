import { get } from "../../services/ddb"

export default async (event, context) => {
  const user = await get("User", event.identity.sub)
  console.log("User", user)
  return user
}
