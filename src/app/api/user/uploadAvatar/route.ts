import { getSessionUserId } from "@/lib/get-session-user-id";
import cloudinary from "@/lib/cloudinary";
import { apiError, apiSuccess } from "@/shared/api/server";
import { NextRequest } from "next/server";
export const config = {
  api: { bodyParser: { sizeLimit: "5mb" } },
};

export async function POST(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return apiError("Не авторизован", { status: 401, notice: "warning" });
    }

    const body = await req.json();
    const { file, oldPublicId } = body;

    if (!file) {
      return apiError("Файл обязателен", {
        status: 400,
        notice: "warning",
      });
    }

    if (oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId, {
        resource_type: "image", 
      });
    }

    const uploaded = await cloudinary.uploader.upload(file, {
      folder: "avatars",
      transformation: [
        { width: 300, height: 300, crop: "fill" },
      ],
    });

    return apiSuccess("Аватар успешно загружен", {
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
    });
  } catch (error) {
    console.error(error);
    return apiError("Не удалось загрузить аватар", { status: 500 });
  }
}
