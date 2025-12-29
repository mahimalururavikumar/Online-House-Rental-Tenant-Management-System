"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PropertyController_1 = require("../controller/PropertyController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = express_1.default.Router();
// Owner Routes
router.post("/", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.authorizeRoles)("OWNER"), PropertyController_1.addProperty);
router.get("/owner", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.authorizeRoles)("OWNER"), PropertyController_1.getOwnerProperties);
router.put("/:id", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.authorizeRoles)("OWNER"), PropertyController_1.updateProperty);
router.delete("/:id", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.authorizeRoles)("OWNER"), PropertyController_1.deleteProperty);
exports.default = router;
