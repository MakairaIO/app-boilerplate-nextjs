import { NextResponse } from 'next/server'
import { NextApiRequest } from 'next'

export async function middleware(request: NextApiRequest) {
  return NextResponse.next()
}
