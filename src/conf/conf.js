const conf = {
    appwriteURL : String(import.meta.env.VITE_APP_APPWRITE_URL),
    appwritePROJECTID :String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDATABASEID :String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCOLLECTIONID :String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBUCKET_ID :String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinyMCE_API_KEY : String(import.meta.env.VITE_TINY_API_KEY)

}

export default conf