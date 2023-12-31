/*
//------------------------------------------------------------------------------ 
// This code was generated by Amplication. 
// 
// Changes to this file will be lost if the code is regenerated. 
//
// There are other ways to to customize your code, see this doc to learn more
// https://docs.amplication.com/docs/how-to/custom-code
//
//------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { BatchPayload } from "../../BatchPayload";
import { Logger } from "winston";
import { fileDto } from "../../file.dto";
import * as XLSX from "xlsx";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { PaginatedInterface } from "../../util/PaginatedInterface";
import { RoomService } from "../room.service";
import { RoomCreateInput } from "./RoomCreateInput";
import { RoomCreateManyInput } from "./RoomCreateManyInput";
import { RoomWhereInput } from "./RoomWhereInput";
import { RoomWhereUniqueInput } from "./RoomWhereUniqueInput";
import { RoomFindManyArgs } from "./RoomFindManyArgs";
import { RoomupdateManyArgs } from "./RoomupdateManyArgs";
import { RoomUpdateInput } from "./RoomUpdateInput";
import { Room } from "./Room";
import { PatientWhereInput } from "../../patient/base/PatientWhereInput";
import { Patient } from "../../patient/base/Patient";
import { SagesFemmeWhereInput } from "../../sagesFemme/base/SagesFemmeWhereInput";
import { SagesFemme } from "../../sagesFemme/base/SagesFemme";
import { MessageWhereInput } from "../../message/base/MessageWhereInput";
import { Message } from "../../message/base/Message";
import { getListRoomDto } from "./getListRoom.dto";
@swagger.ApiBearerAuth()
export class RoomControllerBase {
  constructor(
    protected readonly service: RoomService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder,
    protected readonly logger: Logger
  ) {}

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Room })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: RoomCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Room> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Room",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      this.logger.log({
        level: "error",
        message: `providing the properties: ${properties} on ${"Room"} creation is forbidden for roles: ${roles}`,
      });

      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Room"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: data,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post("/createMany")
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Room })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async createMany(
    @common.Body() data: Array<RoomCreateManyInput>,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<BatchPayload | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Room",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      this.logger.log({
        level: "error",
        message: `providing the properties: ${properties} on ${"Room"} creation is forbidden for roles: ${roles}`,
      });

      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Room"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.createMany({
      data: data,
      skipDuplicates: false,
    });
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: getListRoomDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => RoomFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<PaginatedInterface<Room>> {
    const args = plainToClass(RoomFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Room",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
    const result = results.paginatedResult.map((result: Room) =>
      permission.filter(result)
    );
    return { paginatedResult: result, totalCount: results.totalCount };
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/fileExcel")
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: fileDto })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findDataForExcel(
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<fileDto> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Room",
    });
    const results = await this.service.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
    const result = results.paginatedResult.map((result: Room) =>
      permission.filter(result)
    );
    var excelFile = XLSX.utils.json_to_sheet(result);

    var Workbook = XLSX.utils.book_new();
    await XLSX.utils.book_append_sheet(Workbook, excelFile, "test");
    const file = await XLSX.write(Workbook, {
      bookType: "xlsx",
      bookSST: true,
      type: "base64",
    });
    return { file: file };
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Room })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: RoomWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Room | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Room",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
    if (result === null) {
      this.logger.log({
        level: "error",
        message: `No resource was found for ${JSON.stringify(params)}`,
      });
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Room })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: RoomWhereUniqueInput,
    @common.Body()
    data: RoomUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Room | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Room",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      this.logger.log({
        level: "error",
        message: `No resource was found for ${JSON.stringify(params)}`,
      });
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Room"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: data,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      });
    } catch (error: any) {
      if (isRecordNotFoundError(error)) {
        this.logger.log({
          level: "error",
          message: `No resource was found for ${JSON.stringify(params)}`,
        });
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Room })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: RoomWhereUniqueInput
  ): Promise<Room | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      });
    } catch (error: any) {
      if (isRecordNotFoundError(error)) {
        this.logger.log({
          level: "error",
          message: `No resource was found for ${JSON.stringify(params)}`,
        });
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id/patients")
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => PatientWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyPatients(
    @common.Req() request: Request,
    @common.Param() params: RoomWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Patient[] | null> {
    const query: PatientWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Patient",
    });
    const results = await this.service.findPatients(params.id, {
      where: query,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        dateNaissance: true,
        adresse: true,
        medecinTraitant: true,

        room: {
          select: {
            id: true,
          },
        },

        sagesFemmes: {
          select: {
            id: true,
          },
        },
      },
    });
    return results && results.map((result) => permission.filter(result));
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post("/:id/patients")
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "update",
    possession: "any",
  })
  async createPatients(
    @common.Param() params: RoomWhereUniqueInput,
    @common.Body() body: RoomWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      patients: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Room",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Room"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id/patients")
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "update",
    possession: "any",
  })
  async updatePatients(
    @common.Param() params: RoomWhereUniqueInput,
    @common.Body() body: RoomWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      patients: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Room",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Room"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id/patients")
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "update",
    possession: "any",
  })
  async deletePatients(
    @common.Param() params: RoomWhereUniqueInput,
    @common.Body() body: RoomWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      patients: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Room",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Room"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id/sagesFemmes")
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => SagesFemmeWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManySagesFemmes(
    @common.Req() request: Request,
    @common.Param() params: RoomWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<SagesFemme[] | null> {
    const query: SagesFemmeWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "SagesFemme",
    });
    const results = await this.service.findSagesFemmes(params.id, {
      where: query,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        geolocalisation: true,
        diplomes: true,
        description: true,

        room: {
          select: {
            id: true,
          },
        },

        users: {
          select: {
            id: true,
          },
        },
      },
    });
    return results && results.map((result) => permission.filter(result));
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post("/:id/sagesFemmes")
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "update",
    possession: "any",
  })
  async createSagesFemmes(
    @common.Param() params: RoomWhereUniqueInput,
    @common.Body() body: RoomWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      sagesFemmes: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Room",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Room"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id/sagesFemmes")
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "update",
    possession: "any",
  })
  async updateSagesFemmes(
    @common.Param() params: RoomWhereUniqueInput,
    @common.Body() body: RoomWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      sagesFemmes: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Room",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Room"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id/sagesFemmes")
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "update",
    possession: "any",
  })
  async deleteSagesFemmes(
    @common.Param() params: RoomWhereUniqueInput,
    @common.Body() body: RoomWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      sagesFemmes: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Room",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Room"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id/message")
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => MessageWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyMessage(
    @common.Req() request: Request,
    @common.Param() params: RoomWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Message[] | null> {
    const query: MessageWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Message",
    });
    const results = await this.service.findMessage(params.id, {
      where: query,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        contenu: true,
        dateReception: true,

        rooms: {
          select: {
            id: true,
          },
        },

        user: {
          select: {
            id: true,
          },
        },
      },
    });
    return results && results.map((result) => permission.filter(result));
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post("/:id/message")
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "update",
    possession: "any",
  })
  async createMessage(
    @common.Param() params: RoomWhereUniqueInput,
    @common.Body() body: RoomWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      message: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Room",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Room"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id/message")
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "update",
    possession: "any",
  })
  async updateMessage(
    @common.Param() params: RoomWhereUniqueInput,
    @common.Body() body: RoomWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      message: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Room",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Room"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id/message")
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "update",
    possession: "any",
  })
  async deleteMessage(
    @common.Param() params: RoomWhereUniqueInput,
    @common.Body() body: RoomWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      message: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Room",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Room"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
