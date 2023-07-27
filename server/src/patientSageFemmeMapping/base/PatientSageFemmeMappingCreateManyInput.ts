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
import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsBoolean, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PatientWhereUniqueInput } from "../../patient/base/PatientWhereUniqueInput";
import { SagesFemmeWhereUniqueInput } from "../../sagesFemme/base/SagesFemmeWhereUniqueInput";
@InputType()
class PatientSageFemmeMappingCreateManyInput {
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  deletedAt?: Date | null;

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  estSagefemmeReference?: boolean | null;

  @ApiProperty({
    required: false,
    type: () => PatientWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PatientWhereUniqueInput)
  @IsOptional()
  @Field(() => PatientWhereUniqueInput, {
    nullable: true,
  })
  patients?: PatientWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => SagesFemmeWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => SagesFemmeWhereUniqueInput)
  @IsOptional()
  @Field(() => SagesFemmeWhereUniqueInput, {
    nullable: true,
  })
  sagesFemmes?: SagesFemmeWhereUniqueInput | null;
}
export { PatientSageFemmeMappingCreateManyInput };