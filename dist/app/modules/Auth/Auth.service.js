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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const Users_model_1 = require("../Users/Users.model");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield Users_model_1.User.isUserExistsByEmail(payload.email);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    if (!(yield Users_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password)))
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Password do not matched");
    //create token and sent to the  client
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, jwtHelpers_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, jwtHelpers_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        user,
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = (0, jwtHelpers_1.verifyToken)(token, config_1.default.jwt_access_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid Refresh Token");
    }
    const { email } = verifiedToken;
    const isUserExist = yield Users_model_1.User.isUserExistsByEmail(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    //generate new token
    const newAccessToken = (0, jwtHelpers_1.createToken)({
        email: isUserExist.id,
        role: "user",
    }, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    // checking if the user is exist
    const UserExists = yield Users_model_1.User.isUserExistsByEmail(user === null || user === void 0 ? void 0 : user.email);
    if (!UserExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    if (UserExists.password &&
        !(yield Users_model_1.User.isPasswordMatched(oldPassword, UserExists.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Old Password is incorrect");
    }
    // hash password before saving
    const newHashedPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bycrypt_salt_rounds));
    const query = { email: user === null || user === void 0 ? void 0 : user.email };
    const updatedData = {
        password: newHashedPassword, //
        // needsPasswordChange: false,
        // passwordChangedAt: new Date(), //
    };
    yield Users_model_1.User.findOneAndUpdate(query, updatedData);
});
exports.AuthService = {
    loginUser,
    refreshToken,
    changePassword,
    // forgotPass,
    // resetPassword
};
