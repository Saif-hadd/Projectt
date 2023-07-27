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
import { PrismaService } from "nestjs-prisma";
import { Inject } from "@nestjs/common";
import { Prisma, Message, Room, User } from "@prisma/client";
import { PaginatedInterface } from "../../util/PaginatedInterface";
import { Logger } from "winston";
import { DbService } from "src/dbService/db.service";

export class MessageServiceBase {
  constructor(
    protected readonly prisma: DbService,
    @Inject("winston")
    protected readonly logger: Logger
  ) {}

  async count<T extends Prisma.MessageFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.MessageFindManyArgs>
  ): Promise<number> {
    return await this.prisma.message.count(args);
  }

  async findMany<T extends Prisma.MessageFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.MessageFindManyArgs>
  ): Promise<PaginatedInterface<Message>> {
    const [data, totalCount] = await Promise.all([
      this.prisma.message.findMany(args),
      this.prisma.message.count({ where: { deletedAt: null } }),
    ]);

    return { paginatedResult: data, totalCount };
  }
  async findOne<T extends Prisma.MessageFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.MessageFindUniqueArgs>
  ): Promise<Message | null> {
    return await this.prisma.message.findUnique(args);
  }
  async create<T extends Prisma.MessageCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.MessageCreateArgs>
  ): Promise<Message> {
    return await this.prisma.message.create<T>(args);
  }
  async createMany<T extends Prisma.MessageCreateManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.MessageCreateManyArgs>
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.message.createMany<T>(args);
  }
  async update<T extends Prisma.MessageUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.MessageUpdateArgs>
  ): Promise<Message> {
    return await this.prisma.message.update<T>(args);
  }
  async delete<T extends Prisma.MessageDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.MessageDeleteArgs>
  ): Promise<Message> {
    return await this.prisma.message.delete(args);
  }

  async updateMany<T extends Prisma.MessageUpdateManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.MessageUpdateManyArgs>
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.message.updateMany(args);
  }

  async getRooms(parentId: string): Promise<Room | null> {
    return this.prisma.message
      .findUnique({
        where: { id: parentId },
      })
      .rooms();
  }

  async getUser(parentId: string): Promise<User | null> {
    return this.prisma.message
      .findUnique({
        where: { id: parentId },
      })
      .user();
  }
}
