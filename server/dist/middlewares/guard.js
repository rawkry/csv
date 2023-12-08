"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guard = (token) => (req, res, next) => {
    const given = req.headers["access-token"];
    if (given === undefined) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const accessToken = Array.from(given).reverse().join("");
    if (accessToken !== token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};
exports.default = guard;
//# sourceMappingURL=guard.js.map