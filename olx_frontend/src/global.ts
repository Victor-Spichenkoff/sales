export const isProd = process.env.NODE_ENV == "production"

export const apiUrl = isProd ? 'https://sales-backend-nu.vercel.app' : "http://localhost:2006"

export const token_key = "__vss_olx_token"