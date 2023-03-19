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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_model_1 = require("./users.model");
const sequelize_1 = require("@nestjs/sequelize");
const roles_service_1 = require("../roles/roles.service");
let UsersService = class UsersService {
    constructor(userRepository, rolesService) {
        this.userRepository = userRepository;
        this.rolesService = rolesService;
    }
    async createUser(dto) {
        const user = await this.userRepository.create(dto);
        const role = await this.rolesService.getRoleByValue('user');
        if (role) {
            await user.$set('roles', role.id);
        }
        else {
            throw new common_1.HttpException('Роль пользователя со значением "user" не найдена!', common_1.HttpStatus.NOT_FOUND);
        }
        user.roles = [role];
        return user;
    }
    async getAllUsers() {
        return await this.userRepository.findAll({ include: { all: true } });
    }
    async getUserByEmail(email) {
        return await this.userRepository.findOne({ where: { email }, include: { all: true } });
    }
    async getUserByUsername(username) {
        return await this.userRepository.findOne({ where: { username }, include: { all: true } });
    }
    async addRole(dto) {
        var _a, _b;
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.rolesService.getRoleByValue(dto.value);
        const userHasRole = (_b = (_a = user.roles) === null || _a === void 0 ? void 0 : _a.some(userRoles => userRoles.value === role.value)) !== null && _b !== void 0 ? _b : false;
        if (user && role && !userHasRole) {
            await user.$add('roles', [role.id]);
        }
        else {
            throw new common_1.HttpException('Пользователь или роль не найдены!', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async banUser(dto) {
        const existingUser = await this.userRepository.findByPk(dto.userId);
        if (!existingUser) {
            throw new common_1.HttpException('Пользователь не найден!', common_1.HttpStatus.NOT_FOUND);
        }
        existingUser.banned = true;
        existingUser.banReason = dto.banReason;
        return await existingUser.save();
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object, roles_service_1.RolesService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map