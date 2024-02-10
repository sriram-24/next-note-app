import { Note } from "@/lib/mongo/Note";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

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
       
        if(!title || !content || !id){
            return NextResponse.json({message: "Invalid request : title or content or id is empty"},{
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

    try {
        const noteData = {
            title:data.title,
            content : data.content,
            _createdDate : data._createdDate
        }

        if(!ObjectId.isValid(data.id)){
            return NextResponse.json({
                msg:`Bad request : ${data.id} is not a valid mogodb object Id.`
            },
            {
                status:400
            }
            )
        }
        const responseData = await Note.findByIdAndUpdate(data.id,noteData,{new: true})
        
        
        if(!responseData){
            return NextResponse.json({})
        }
        
        return NextResponse.json(responseData)
        
        
    } catch (error) {
        const msg = `There was an error updating data to mongo db : ${error}`;
        let errorResponse =  {
            message : msg
        
        }
        return NextResponse.json(errorResponse,{
            status:500
        })
    }

}