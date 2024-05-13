import { HttpError } from 'wasp/server'

export const createAIData = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.AIData.create({
    data: { content: args.content, userId: context.user.id }
  });
}

export const updateAIData = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const updatedAIData = await context.entities.AIData.update({
    where: { id: args.id },
    data: { content: args.content }
  });

  return updatedAIData;
}

export const deleteAIData = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const deletedAIData = await context.entities.AIData.delete({ where: { id: args.id } });
  return deletedAIData;
}