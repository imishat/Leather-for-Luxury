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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.updateUSerProfile = void 0;
const Users_model_1 = require("./Users.model");
const createUSer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Users_model_1.User.create(payload);
    return result;
});
const updateUSerProfile = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate the ID format
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   throw new Error("Invalid ID format");
    // }
    // Find and update the parent category
    const result = yield Users_model_1.User.findByIdAndUpdate(id, payload, {
        new: true, // Return the updated document
        runValidators: true, // Enforce schema validations
    });
    return result;
});
exports.updateUSerProfile = updateUSerProfile;
exports.UserService = {
    createUSer,
    updateUSerProfile: exports.updateUSerProfile,
};
