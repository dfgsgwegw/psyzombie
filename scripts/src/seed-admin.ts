import bcrypt from "bcryptjs";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

async function main() {
  const existing = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.discordUsername, ADMIN_USERNAME));

  if (existing.length > 0) {
    console.log(`Admin user "${ADMIN_USERNAME}" already exists.`);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await db.insert(usersTable).values({
    discordUsername: ADMIN_USERNAME,
    passwordHash,
    isAdmin: true,
  });

  console.log(`✅ Admin user created: "${ADMIN_USERNAME}" / "${ADMIN_PASSWORD}"`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
