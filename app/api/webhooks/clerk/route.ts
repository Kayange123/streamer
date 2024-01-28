import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET as string;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add webhook from clerk dashboard");
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp") as string;
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_signature || !svix_signature) {
    return new Response("Error occured --> no svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let event: WebhookEvent;

  try {
    event = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    return new Response("Error verifying webhook", { status: 400 });
  }

  const { id } = event.data;
  const eventType = event.type;
  if (eventType === "user.created") {
    await db.user.create({
      data: {
        externalUserId: payload.data.id,
        username: payload.data.username,
        imageUrl: payload.data.image_url,
        fullName: `${payload.data.first_name} ${payload.data.last_name}`,
      },
    });
  }

  if (eventType === "user.updated") {
    const existingUser = await db.user.findUnique({
      where: { externalUserId: payload.data.id },
    });
    if (!existingUser) {
      return new Response("User Not Found", { status: 404 });
    }
    await db.user.update({
      where: { externalUserId: payload.data.id },
      data: {
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      },
    });
  }

  if (eventType === "user.deleted") {
    await db.user.delete({
      where: { externalUserId: payload.data.id },
    });
  }
  return new Response("", { status: 200 });
}
