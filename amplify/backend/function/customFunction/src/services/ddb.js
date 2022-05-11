"use strict";
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.remove = exports.create = exports.listUsers = exports.list = exports.update = exports.get = void 0;
var aws_sdk_1 = require("aws-sdk");
var ddb = new aws_sdk_1.DynamoDB({
    apiVersion: "2012-10-08",
    httpOptions: {
        timeout: 65000
    }
});
var docClient = new aws_sdk_1.DynamoDB.DocumentClient();
var unmarshall = aws_sdk_1.DynamoDB.Converter.unmarshall;
var tableSuffix = process.env.API_HOUSEBOARD_GRAPHQLAPIIDOUTPUT + "-" + process.env.ENV;
var buildUpdateExpression = function (object) {
    var UpdateExpression = "set";
    var ExpressionAttributeNames = {};
    var ExpressionAttributeValues = {};
    Object.keys(object).forEach(function (key) {
        UpdateExpression += " #" + key + " = :" + key + ",";
        ExpressionAttributeNames["#" + key] = key;
        ExpressionAttributeValues[":" + key] = object[key];
    });
    // trim off trailing comma
    UpdateExpression = UpdateExpression.replace(/,\s*$/, "");
    return {
        UpdateExpression: UpdateExpression,
        ExpressionAttributeNames: ExpressionAttributeNames,
        ExpressionAttributeValues: ExpressionAttributeValues
    };
};
var buildFilterExpression = function (filter) {
    var FilterExpression = "";
    var ExpressionAttributeNames = {};
    var ExpressionAttributeValues = {};
    for (var _i = 0, _a = Object.entries(filter); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        FilterExpression += " #" + key + " = :" + key + " and";
        ExpressionAttributeNames["#" + key] = key;
        if (typeof value === "boolean") {
            ExpressionAttributeValues[":" + key] = { BOOL: filter[key] };
        }
        else {
            ExpressionAttributeValues[":" + key] = { S: filter[key] };
        }
    }
    // trim off trailing 'and'
    FilterExpression = FilterExpression.replace(/ and\s*$/, "");
    return {
        FilterExpression: FilterExpression,
        ExpressionAttributeNames: ExpressionAttributeNames,
        ExpressionAttributeValues: ExpressionAttributeValues
    };
};
var get = function (table, id) { return __awaiter(void 0, void 0, void 0, function () {
    var params;
    return __generator(this, function (_a) {
        params = {
            TableName: table + "-" + tableSuffix,
            Key: {
                id: {
                    S: id
                }
            }
        };
        return [2 /*return*/, ddb
                .getItem(params)
                .promise()
                .then(function (rec) { return unmarshall(rec.Item); })];
    });
}); };
exports.get = get;
var update = function (table, id, updates) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues, params;
    return __generator(this, function (_b) {
        _a = buildUpdateExpression(updates), UpdateExpression = _a.UpdateExpression, ExpressionAttributeNames = _a.ExpressionAttributeNames, ExpressionAttributeValues = _a.ExpressionAttributeValues;
        params = {
            TableName: table + "-" + tableSuffix,
            Key: {
                id: id
            },
            UpdateExpression: UpdateExpression,
            ExpressionAttributeNames: ExpressionAttributeNames,
            ExpressionAttributeValues: ExpressionAttributeValues,
            ReturnValues: "UPDATED_NEW"
        };
        return [2 /*return*/, docClient
                .update(params)
                .promise()
                .then(function (rec) { return unmarshall(rec.Attributes); })];
    });
}); };
exports.update = update;
var list = function (table, filter) { return __awaiter(void 0, void 0, void 0, function () {
    var params, _a, FilterExpression, ExpressionAttributeNames, ExpressionAttributeValues;
    return __generator(this, function (_b) {
        params = {
            TableName: table + "-" + tableSuffix
        };
        if (filter) {
            _a = buildFilterExpression(filter), FilterExpression = _a.FilterExpression, ExpressionAttributeNames = _a.ExpressionAttributeNames, ExpressionAttributeValues = _a.ExpressionAttributeValues;
            params = __assign(__assign({}, params), { 
                // @ts-ignore
                FilterExpression: FilterExpression, ExpressionAttributeNames: ExpressionAttributeNames, ExpressionAttributeValues: ExpressionAttributeValues });
        }
        return [2 /*return*/, ddb
                .scan(params)
                .promise()
                .then(function (recs) { return recs.Items.map(function (rec) { return unmarshall(rec); }); })];
    });
}); };
exports.list = list;
var listUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var params;
    return __generator(this, function (_a) {
        params = {
            TableName: "User-" + tableSuffix
        };
        return [2 /*return*/, ddb
                .scan(params)
                .promise()
                .then(function (recs) { return recs.Items.map(function (rec) { return unmarshall(rec); }); })];
    });
}); };
exports.listUsers = listUsers;
var create = function (table, record) { return __awaiter(void 0, void 0, void 0, function () {
    var params;
    return __generator(this, function (_a) {
        params = {
            TableName: table + "-" + tableSuffix,
            Item: record
        };
        return [2 /*return*/, docClient
                .put(params)
                .promise()
                .then(function (rec) { return unmarshall(rec.Attributes); })];
    });
}); };
exports.create = create;
var remove = function (table, id) { return __awaiter(void 0, void 0, void 0, function () {
    var params;
    return __generator(this, function (_a) {
        params = {
            TableName: table + "-" + tableSuffix,
            Key: {
                id: id
            }
        };
        return [2 /*return*/, docClient["delete"](params)
                .promise()
                .then(function (res) { return res.$response; })];
    });
}); };
exports.remove = remove;
//# sourceMappingURL=ddb.js.map