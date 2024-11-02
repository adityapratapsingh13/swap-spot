// import { connectToDatabase } from "@/helpers/server-helper";
// import { NextResponse } from "next/server";
// import prisma from "../../../../../prisma/prisma";
// import user from "@/app/models/user";
// import { log } from "console";
// export const POST = async(req:Request)=>{
//     try{
//         const {name,email,password}=await req.json();
//         if(!name||!email||!password)  return NextResponse.json({message:"Invalid Data"},{status:422})
//             await connectToDatabase();
//         const newUser = await prisma.user.create({data:{email,name}});
//         return NextResponse.json({user},{status:201})
//     }catch(error){
//         console.log(error);

//        return NextResponse.json({user},{status:201})
//     }finally{
//         await prisma.$disconnect();
//     }
// };
