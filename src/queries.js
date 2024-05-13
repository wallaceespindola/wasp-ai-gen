import { HttpError } from 'wasp/server'

export const getUserAIData = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.AIData.findMany({
    where: { userId: context.user.id }
  });
}

export const getAIData = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) }
  const data = await context.entities.AIData.findUnique({
    where: { id, userId: context.user.id },
    select: { content: true }
  });
  if (!data) { throw new HttpError(404, 'AIData entry not found') }
  return data;
}