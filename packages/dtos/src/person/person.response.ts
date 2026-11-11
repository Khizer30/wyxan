import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const PersonSchema = z.object({
  id: z.string(),
  name: z.string()
});

export class PersonDto extends createZodDto(PersonSchema) {}
