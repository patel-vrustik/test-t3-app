import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const employeeRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1), position: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.employee.create({
        data: {
          name: input.name,
          position: input.position,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) =>
    ctx.db.employee.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ),
  getByID: publicProcedure.input(z.number()).query(({ ctx, input }) =>
    ctx.db.employee.findUnique({
      where: { id: input },
    }),
  ),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).optional(),
        position: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const employee = await ctx.db.employee.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name ?? undefined,
          position: input.position ?? undefined,
        },
      });

      return employee;
    }),
  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    await ctx.db.employee.delete({ where: { id: input } });

    return null;
  }),
});
