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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var express = require("express");
var post_1 = __importDefault(require("./models/post"));
require("mongoose");
//TYPESCRIPT TEST FILE
var PORT = process.env.PORT || 3001;
var app = express();
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../my-app/build")));
app.use(express.json());
// Handle GET requests to /api route
app.get("/onepost", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pedido;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, post_1.default.findOne({ titulo: req.query.titulo })];
            case 1:
                pedido = _a.sent();
                res.json(pedido);
                return [2 /*return*/];
        }
    });
}); });
//Create a new post endpoint
app.post("/post", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                post = new post_1.default(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, post.save()];
            case 2:
                _a.sent();
                res.status(201).send(post);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                res.status(400).send(e_1.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.patch("/update-posts", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dataToUpdateDatabase, i, _a, _id, titulo, conteudo, tituloFormatado, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                dataToUpdateDatabase = req.body;
                i = 0;
                _b.label = 1;
            case 1:
                if (!(i < dataToUpdateDatabase.length)) return [3 /*break*/, 6];
                _a = dataToUpdateDatabase[i], _id = _a._id, titulo = _a.titulo, conteudo = _a.conteudo;
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                tituloFormatado = titulo.replaceAll(" ", "-");
                return [4 /*yield*/, post_1.default.findByIdAndUpdate({ _id: _id }, {
                        titulo: tituloFormatado,
                        conteudo: conteudo,
                    })];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                e_2 = _b.sent();
                res.status(400).send(e_2.message);
                return [3 /*break*/, 5];
            case 5:
                i++;
                return [3 /*break*/, 1];
            case 6:
                res.send("deu certo men");
                return [2 /*return*/];
        }
    });
}); });
app.delete("/post/:_id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postBeingDeleted, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postBeingDeleted = req.params._id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, post_1.default.findByIdAndDelete(postBeingDeleted)];
            case 2:
                _a.sent();
                res.send("Apagado com sucesso");
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                res.send(e_3.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get("/post", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, post_1.default.find({})];
            case 1:
                post = _a.sent();
                res.send(post);
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                res.status(500).send(e_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// All other GET requests not handled before will return our React app
app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "../my-app/build", "index.html"));
});
app.listen(PORT, function () {
    console.log("Back-end server listening on " + PORT);
});
