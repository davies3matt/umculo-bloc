"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var ddb_1 = require("../../services/ddb");
exports["default"] = (function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    var user, group, items, usersGroups;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ddb_1.get("User", event.identity.sub)];
            case 1:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 2];
                throw new Error("User not found!");
            case 2: return [4 /*yield*/, ddb_1.get("Group", event.arguments.groupId)];
            case 3:
                group = _a.sent();
                if (!group) {
                    throw new Error("Group Not Found!");
                }
                return [4 /*yield*/, ddb_1.list("Item", { itemGroupId: group.id })
                    // map through and remove all items
                ];
            case 4:
                items = _a.sent();
                // map through and remove all items
                return [4 /*yield*/, Promise.all(__spreadArray([], items.map(function (item) {
                        return ddb_1.remove("Item", item.id);
                    })))
                    // get users-groups records
                ];
            case 5:
                // map through and remove all items
                _a.sent();
                return [4 /*yield*/, ddb_1.list("UsersGroups", { groupID: group.id })
                    // map through and remove all records affiliated with group
                ];
            case 6:
                usersGroups = _a.sent();
                // map through and remove all records affiliated with group
                return [4 /*yield*/, Promise.all(__spreadArray([], usersGroups.map(function (item) {
                        return ddb_1.remove("UsersGroups", item.id);
                    })))
                    // remove group
                ];
            case 7:
                // map through and remove all records affiliated with group
                _a.sent();
                // remove group
                return [4 /*yield*/, ddb_1.remove("Group", group.id)];
            case 8:
                // remove group
                _a.sent();
                return [2 /*return*/, "Successfully removed group!"];
        }
    });
}); });
//# sourceMappingURL=removeGroup.js.map