"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const catchError = (err, req, res, next) => {
    console.log(`[${req.method}][${req.path}]:${err.message} [body]:${JSON.stringify(req.body)} [query]:${JSON.stringify(req.query)}`);
    try {
        const errJson = JSON.parse(err.message);
        res.status(500).json(errJson);
    }
    catch (e) {
        res.status(500).json((0, utils_1.httpBody)(5000, err.message));
    }
    next(err);
};
exports.default = catchError;
//# sourceMappingURL=catch_error.js.map