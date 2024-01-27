import { Note } from "@/lib/mongo/Note";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

import { NextRequest, NextResponse } from "next/server";


export async function GET(
    req : Request,
    { params }: { params: { id: string } }
) {
    const MONGOURI = process.env.MONGODB_URI;
    const noteId = params.id
  
  
    
    let client;
    let data;
 

    // mongodb connection check
    try {
        if(MONGOURI){
            client = await mongoose.connect(MONGOURI)
           
        }
        else{
            throw new Error("MONGODB_URI not set.")
        }
    } catch (error) {
        const msg = `There was an error with connection to mongo db : ${error}`;
        let errorResponse =  {
            message : msg
        
        }
        return NextResponse.json(errorResponse,{
            status:500
        })
        
    }
    
    if(!ObjectId.isValid(noteId)){
        return NextResponse.json({})
    }

    const notes = await Note.findById(noteId)
    if(notes){
        return Response.json(notes) 
    }
    else{
        return Response.json({})  
    }
    
  }


// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//     const { pid } = req.query
//     res.end(`Post: ${pid}`)
//   }