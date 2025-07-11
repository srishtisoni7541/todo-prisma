"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTodoDto = exports.Visibility = exports.Status = void 0;
const class_validator_1 = require("class-validator");
var Status;
(function (Status) {
    Status["PENDING"] = "PENDING";
    Status["IN_PROGRESS"] = "IN_PROGRESS";
    Status["COMPLETED"] = "COMPLETED";
})(Status || (exports.Status = Status = {}));
var Visibility;
(function (Visibility) {
    Visibility["PUBLIC"] = "PUBLIC";
    Visibility["PRIVATE"] = "PRIVATE";
})(Visibility || (exports.Visibility = Visibility = {}));
class CreateTodoDto {
    title;
    description;
    status;
    visibility;
}
exports.CreateTodoDto = CreateTodoDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Status, { message: 'Invalid status' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Visibility, { message: 'Invalid visibility' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "visibility", void 0);
//# sourceMappingURL=todo.dto.js.map