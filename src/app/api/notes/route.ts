import { Note } from "@/lib/mongo/Note";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req : NextRequest,
    res : NextResponse
) {
    const MONGOURI = process.env.MONGODB_URI;
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
    const searchQuery = req.nextUrl.searchParams.get("search");
    
    if(searchQuery){
       const aggregateQury = [
        {
          $search: {
            index: "NotesSearch",
            text: {
              query: searchQuery,
              path: "title"
            }
          }
        }
      ]
          
        const searchedNotes = await Note.aggregate(aggregateQury)
        return Response.json(searchedNotes)
    }
    else{
        const notes = await Note.find()
        return Response.json(notes)
    }

    
  }