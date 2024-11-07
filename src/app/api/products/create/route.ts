import { NextResponse } from "next/server";
import { PrismaClient, Category } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();

//     const name = formData.get("name")?.toString() || "";
//     const description = formData.get("description")?.toString() || "";
//     const category = formData.get("category") as Category;
//     const price = parseFloat(formData.get("price")?.toString() || "0");
//     const stock = parseInt(formData.get("stock")?.toString() || "0", 10);
//     const seller = formData.get("seller")?.toString() || "";
//     const imageFile = formData.get("image") as File;

//     let imagePath = "";
//     if (imageFile) {
//       const buffer = Buffer.from(await imageFile.arrayBuffer());
//       const fileName = `${Date.now()}-${imageFile.name}`;
//       imagePath = path.join(UPLOAD_DIR, fileName);
//       fs.writeFileSync(imagePath, buffer);
//       imagePath = `/uploads/${fileName}`;
//     }

//     const product = await prisma.product.create({
//       data: {
//         name,
//         description,
//         category,
//         price,
//         stock,
//         seller,
//         images: [imagePath],
//       },
//     });

//     return NextResponse.json(product);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: `Failed to create product: ${error}` },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const category = formData.get("category") as Category;
    const price = parseFloat(formData.get("price")?.toString() || "0");
    const stock = parseInt(formData.get("stock")?.toString() || "0", 10);
    const seller = formData.get("seller")?.toString() || "";
    const imageUrl = formData.get("url")?.toString() || "";

    let imagePath = "";
    if (imageUrl) {
      imagePath = imageUrl;
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        category,
        price,
        stock,
        seller,
        images: [imagePath],
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `Failed to create product: ${error}` },
      { status: 500 }
    );
  }
}
