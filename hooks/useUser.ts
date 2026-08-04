'use client'

import { useContext } from "react"
import { AuthContext } from "@/providers/AuthProvider"

export function useUser(){

    const context = useContext(AuthContext)

    if(!context){

        throw new Error("useUser must be used inside AuthProvider")

    }

    return context

}