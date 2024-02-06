import { NextResponse, NextRequest } from "next/server"
import { authenticateWithToken } from "./app/api/services/apiFunctions"

export async function middleware(req) {
    if (req.nextUrl.pathname == "/account") {

        const token = req.cookies.get("token")
        if (!token) {
            return NextResponse.redirect(new URL('/', req.url))
        }

        const jwtToken = token.value
        const authenticatedUser = await authenticateWithToken(jwtToken)

        if (authenticatedUser.statusCode == 402) {
            return NextResponse.redirect(new URL('/', req.url))
        }
        
    }
    
}