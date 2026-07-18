import { prisma } from "@/lib/prisma";
import { FeedbackInput } from "@/schemas/Feedback";

export async function createFeedback(data: FeedbackInput) {
  await prisma.feedback.create({ data });
}
