"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controller/AuthController");
const router = express_1.default.Router();
router.post("/register", AuthController_1.registerUser);
router.post("/register-admin", AuthController_1.registerAdmin);
router.post("/login", AuthController_1.login);
router.post("/login-admin", AuthController_1.loginAdmin);
exports.default = router;
