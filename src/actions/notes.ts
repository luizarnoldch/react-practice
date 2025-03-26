// app/actions/notes.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type FormState = {
  success: boolean;
  message?: string;
  errors?: {
    title?: string[];
    content?: string[];
  };
};

export async function createNote(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const authorEmail = formData.get("authorEmail") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const revalidateRoute = formData.get("revalidateRoute") as string;

    const errors: FormState["errors"] = {};
    if (!title) errors.title = ["Title is required"];
    if (!content) errors.content = ["Content is required"];
    if (Object.keys(errors).length > 0) return { success: false, errors };

    const author = await prisma.author.findUnique({
      where: { email: authorEmail },
    });

    if (!author) return { success: false, message: "Author not found" };

    await prisma.note.create({
      data: {
        title,
        content,
        authorId: author.id,
      },
    });

    revalidatePath(revalidateRoute || "/");
    return { success: true, message: "Note created!" };
  } catch (error) {
    console.error("Note creation failed:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Database error occurred",
    };
  }
}

export async function updateNote(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const noteId = parseInt(formData.get("noteId") as string);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const revalidateRoute = formData.get("revalidateRoute") as string; // Recibe la ruta dinámica

    const errors: FormState["errors"] = {};
    if (!title) errors.title = ["Title is required"];
    if (!content) errors.content = ["Content is required"];
    if (Object.keys(errors).length > 0) return { success: false, errors };

    await prisma.note.update({
      where: { id: noteId },
      data: { title, content },
    });

    revalidatePath(revalidateRoute || "/"); // Revalida la ruta dinámica
    return { success: true, message: "Note updated!" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update note",
    };
  }
}

export async function getNotes() {
  return await prisma.note.findMany({
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });
}
