"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataModel_1 = __importDefault(require("../../model/DataModel"));
const mathjs_1 = __importDefault(require("mathjs"));
module.exports = async (req, res) => {
    try {
        const result = await DataModel_1.default.find();
        const expensesValues = result.map((entry) => entry.expenses);
        const earningValues = result.map((entry) => entry.earning);
        // Calculate variance and standard deviation
        const expensesVariance = mathjs_1.default.variance(expensesValues);
        const expensesStdDeviation = mathjs_1.default.std(expensesValues);
        const earningVariance = mathjs_1.default.variance(earningValues);
        const earningStdDeviation = mathjs_1.default.std(earningValues);
        res.status(200).send({
            expensesVariance,
            expensesStdDeviation,
            earningVariance,
            earningStdDeviation,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
//# sourceMappingURL=calculate.js.map