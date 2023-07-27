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
import {
  Prisma,
  PatientSageFemmeMapping,
  Patient,
  SagesFemme,
} from "@prisma/client";
import { PaginatedInterface } from "../../util/PaginatedInterface";
import { Logger } from "winston";
import { DbService } from "src/dbService/db.service";

export class PatientSageFemmeMappingServiceBase {
  constructor(
    protected readonly prisma: DbService,
    @Inject("winston")
    protected readonly logger: Logger
  ) {}

  async count<T extends Prisma.PatientSageFemmeMappingFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PatientSageFemmeMappingFindManyArgs>
  ): Promise<number> {
    return await this.prisma.patientSageFemmeMapping.count(args);
  }

  async findMany<T extends Prisma.PatientSageFemmeMappingFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PatientSageFemmeMappingFindManyArgs>
  ): Promise<PaginatedInterface<PatientSageFemmeMapping>> {
    const [data, totalCount] = await Promise.all([
      this.prisma.patientSageFemmeMapping.findMany(args),
      this.prisma.patientSageFemmeMapping.count({ where: { deletedAt: null } }),
    ]);

    return { paginatedResult: data, totalCount };
  }
  async findOne<T extends Prisma.PatientSageFemmeMappingFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PatientSageFemmeMappingFindUniqueArgs>
  ): Promise<PatientSageFemmeMapping | null> {
    return await this.prisma.patientSageFemmeMapping.findUnique(args);
  }
  async create<T extends Prisma.PatientSageFemmeMappingCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PatientSageFemmeMappingCreateArgs>
  ): Promise<PatientSageFemmeMapping> {
    return await this.prisma.patientSageFemmeMapping.create<T>(args);
  }
  async createMany<T extends Prisma.PatientSageFemmeMappingCreateManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PatientSageFemmeMappingCreateManyArgs>
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.patientSageFemmeMapping.createMany<T>(args);
  }
  async update<T extends Prisma.PatientSageFemmeMappingUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PatientSageFemmeMappingUpdateArgs>
  ): Promise<PatientSageFemmeMapping> {
    return await this.prisma.patientSageFemmeMapping.update<T>(args);
  }
  async delete<T extends Prisma.PatientSageFemmeMappingDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.PatientSageFemmeMappingDeleteArgs>
  ): Promise<PatientSageFemmeMapping> {
    return await this.prisma.patientSageFemmeMapping.delete(args);
  }

  async updateMany<T extends Prisma.PatientSageFemmeMappingUpdateManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PatientSageFemmeMappingUpdateManyArgs>
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.patientSageFemmeMapping.updateMany(args);
  }

  async getPatients(parentId: string): Promise<Patient | null> {
    return this.prisma.patientSageFemmeMapping
      .findUnique({
        where: { id: parentId },
      })
      .patients();
  }

  async getSagesFemmes(parentId: string): Promise<SagesFemme | null> {
    return this.prisma.patientSageFemmeMapping
      .findUnique({
        where: { id: parentId },
      })
      .sagesFemmes();
  }
}
