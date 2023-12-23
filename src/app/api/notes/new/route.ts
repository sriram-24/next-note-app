import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { Note } from "@/lib/mongo/Note"

export async function POST(
    req : NextRequest,
    res : NextResponse
){

    const MONGOURI = process.env.MONGODB_URI;
    let client;
    let data;

    // request validations
    try {
        data = await req.json()
        const {id, title, content, _createdDate} = data;
       
        if(!title || !content){
            return NextResponse.json({message: "Invalid request : title or content is empty"},{
                status:400
            })
        }

    } catch (error) {
        const msg = `There was an error with request : ${error}`;
        let errorResponse =  {
            message : msg
        
        }
        return NextResponse.json(errorResponse,{
            status:500
        })
    }
    

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
    
    const noteData = {
        title:data.title,
        content : data.content,
        _createdDate : data._createdDate
    }

    try {
        await Note.create(noteData)
        
        console.log("note added");
        return NextResponse.json({message:"note added"},{
            status:201
        })
        
    } catch (error) {
        const msg = `There was an while sending data : ${error}`;
        let errorResponse =  {
            message : msg
        
        }
        return NextResponse.json(errorResponse,{
            status:500
        })
    }
}