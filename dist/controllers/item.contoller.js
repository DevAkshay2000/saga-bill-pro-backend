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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var entities_1 = require("../entities");
var dbconfig_1 = require("../config/dbconfig");
var find = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var appDataSource, itemRepository, items, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                appDataSource = _a.sent();
                return [4 /*yield*/, appDataSource.getRepository(entities_1.Item)];
            case 2:
                itemRepository = _a.sent();
                return [4 /*yield*/, itemRepository.find({
                        relations: {
                            itemImage: true,
                            itemDescription: true
                        }
                    })];
            case 3:
                items = _a.sent();
                return [2 /*return*/, res.status(200).json(items)];
            case 4:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({ message: "Error fetching items", error: error_1 })];
            case 5: return [2 /*return*/];
        }
    });
}); };
var findById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var appDataSource, itemRepository, item, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                appDataSource = _a.sent();
                itemRepository = appDataSource.getRepository(entities_1.Item);
                return [4 /*yield*/, itemRepository.findOne({
                        where: {
                            id: Number(req.params.id),
                        },
                        relations: {
                            itemDescription: true,
                            itemImage: true,
                        },
                    })];
            case 2:
                item = _a.sent();
                if (!item) {
                    return [2 /*return*/, res.status(404).json({ message: "Item not found" })];
                }
                res.status(200).json(item);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(500).json({ message: "Error fetching item", error: error_2 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var appDataSource, data, itemRepository, item, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                appDataSource = _a.sent();
                data = req.body;
                itemRepository = appDataSource.getRepository(entities_1.Item);
                item = itemRepository.create(data.item);
                return [4 /*yield*/, itemRepository.save(item)];
            case 2:
                _a.sent();
                // await appDataSource.transaction(async (transactionEntityManager) => {
                //     const item = await transactionEntityManager.save(Item, data.item);
                //     console.log(item)
                //     if (data.itemDescriptions && data.itemDescriptions.length) {
                //         const itemDescription = data.itemDescriptions.map((val) => {
                //             return {
                //                 ...val,
                //                 itemId: item.id
                //             }
                //         })
                //         transactionEntityManager.save(ItemDescription, itemDescription)
                //     }
                //     if (data.itemImages && data.itemImages.length) {
                //         const itemImages = data.itemImages.map((val) => {
                //             return {
                //                 ...val,
                //                 itemId: item.id
                //             }
                //         })
                //         transactionEntityManager.save(ItemImage, itemImages)
                //     }
                // });
                return [2 /*return*/, res.status(201).json("item created ...")];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, res.status(400).json({ message: "Error creating user", error: error_3 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var updateById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var appDataSource, itemRepository, item, updatedItem, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                appDataSource = _a.sent();
                itemRepository = appDataSource.getRepository(entities_1.Item);
                return [4 /*yield*/, itemRepository.findOneBy({
                        id: parseInt(req.params.id),
                    })];
            case 2:
                item = _a.sent();
                if (!item) {
                    return [2 /*return*/, res.status(404).json({ message: "Item not found" })];
                }
                updatedItem = itemRepository.merge(item, req.body);
                return [4 /*yield*/, itemRepository.save(updatedItem)];
            case 3:
                _a.sent();
                res.status(200).json(updatedItem);
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                res.status(500).json({ message: "Error updating item", error: error_4 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var deleteById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var appDataSource, itemRepository, item, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, (0, dbconfig_1.handler)()];
            case 1:
                appDataSource = _a.sent();
                itemRepository = appDataSource.getRepository(entities_1.Item);
                return [4 /*yield*/, itemRepository.findOneBy({
                        id: parseInt(req.params.id),
                    })];
            case 2:
                item = _a.sent();
                if (!item) {
                    return [2 /*return*/, res.status(404).json({ message: "Item not found" })];
                }
                return [4 /*yield*/, itemRepository.remove(item)];
            case 3:
                _a.sent();
                res.status(200).json({ message: "Item removed successfully" });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                res.status(500).json({ message: "Error removing item", error: error_5 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.default = { find: find, findById: findById, create: create, deleteById: deleteById, updateById: updateById };
//# sourceMappingURL=item.contoller.js.map