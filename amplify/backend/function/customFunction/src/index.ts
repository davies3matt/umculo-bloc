/* Amplify Params - DO NOT EDIT
	API_HOUSEBOARD_GRAPHQLAPIENDPOINTOUTPUT
	API_HOUSEBOARD_GRAPHQLAPIIDOUTPUT
	API_HOUSEBOARD_GRAPHQLAPIKEYOUTPUT
	API_HOUSEBOARD_GROUPTABLE_ARN
	API_HOUSEBOARD_GROUPTABLE_NAME
	API_HOUSEBOARD_ITEMTABLE_ARN
	API_HOUSEBOARD_ITEMTABLE_NAME
	API_HOUSEBOARD_USERTABLE_ARN
	API_HOUSEBOARD_USERTABLE_NAME
	AUTH_HOUSEBOARD52FF8A69_USERPOOLID
	ENV
	FUNCTION_COGNITOPOSTCONFIRMATION_NAME
	REGION
Amplify Params - DO NOT EDIT */
import {inviteUsersToGroup} from './resolvers/index';
exports.handler = async (event, context) => {
    console.log(`EVENT: ${JSON.stringify(event, context)}`);
	switch (event.fieldName) {
		case 'inviteUsersToGroup': 
		return inviteUsersToGroup(event, context);
		default:
	}
    context.done(null, 'Hello World'); // SUCCESS with message
};
