"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.updateUSerProfile = void 0;
const Users_model_1 = require("./Users.model");
const email_1 = require("../../middlewares/email");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createUSer = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.location) {
      const verificationToken = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      payload = Object.assign(Object.assign({}, payload), {
        verificationToken,
      });
    }
    const result = yield Users_model_1.User.create(payload);
    // If location exists, send a verification email
    if (
      !payload.location &&
      (result === null || result === void 0 ? void 0 : result.email) &&
      payload.verificationToken
    ) {
      yield (0, email_1.sendVerificationUser)(
        result.email,
        payload.verificationToken
      );
    }
    return result;
  });
const verifyEmailService = (code) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // console.log("Received code:", code);
    // Find the user with a matching token that hasn't expired
    const user = yield Users_model_1.User.findOne({
      verificationToken: code,
    });
    if (!user) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        "User not found"
      );
    }
    // Update the user's verification status and clear token fields
    user.isVerified = true;
    user.verificationToken = undefined;
    yield user.save();
    return user;
  });
const updateUSerProfile = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
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
  verifyEmailService,
};
