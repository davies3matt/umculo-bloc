import { get } from "../../services/ddb"

export default async (event, context) => { 
    const user = await get('User', context.identity.sub);
    console.log('User', user);
    return user;
}