"use server";
import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { classTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  ClassInsert,
  ClassSelect,
  customActionHandler,
  CustomError,
} from "../types";

export const createClassesAction = customActionHandler(
  async ({ name, description }: Pick<ClassInsert, "name" | "description">) => {
    const session = await auth();
    if (!session) throw new CustomError("Bạn chưa đăng nhập");
    return await db
      .insert(classTable)
      .values({
        name: name,
        description: description,
        teacherEmail: session.user?.email as string,
      })
      .returning();
  }
);

export const updateClassesAction = customActionHandler(
  async (id: ClassSelect["id"], data: Partial<Omit<ClassSelect, "id">>) => {
    return await db
      .update(classTable)
      .set(data)
      .where(eq(classTable.id, id))
      .returning();
  }
);

export const deleteClassesAction = customActionHandler(
  async (id: ClassSelect["id"]) => {
    return await db.delete(classTable).where(eq(classTable.id, id)).returning();
  }
);

export const checkClassCodeAction = customActionHandler(
  async (classCode: ClassSelect["classCode"]) => {
    const classroom = await db
      .select()
      .from(classTable)
      .where(eq(classTable.classCode, classCode as string));
    if (classroom.length === 0) throw new CustomError("Mã lớp không tồn tại");
    return classroom[0];
  }
);
