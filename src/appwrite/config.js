import {Client,Databases,Storage,Query,ID} from 'appwrite';
import conf from '../conf/conf';

export class Services{
    client = new Client();
    databases;
    Bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwritePROJECTID)
        this.databases = new Databases(this.client);
        this.Bucket = new Storage(this.client)

    }

    async CreatePost({tittle,slug,content,featuredImage,status,userID}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDATABASEID,
                conf.appwriteCOLLECTIONID,
                slug,
                {
                    tittle,
                    content,
                    featuredImage,
                    status,
                    userID

                }
            )

            
        } catch (error) {
            console.log("Appwrite service :: CreatePost :: error ", error);
        }

        return null;
    }

    async UpdatePost(slug,{title,content,featuredImage,status,userID}){
        try {
            return await this.databases.updateDocument(
            conf.appwriteDATABASEID,
            conf.appwriteCOLLECTIONID,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userID
            }
        )
        } catch (error) {
            console.log("Appwrite service :: UpdatePost :: error ", error);
        }

        return null;
    }

    async DeletePost(slug){
        try {
            return  await this.databases.deleteDocument(
                conf.appwriteDATABASEID,
                conf.appwriteCOLLECTIONID,
                slug
            
        ) 
        } catch (error) {
            console.log("Appwrite service :: DeletePost :: error ", error);
        }

        return null;
    }

    async GetPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDATABASEID,
                conf.appwriteCOLLECTIONID,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: GetPost :: error ", error);
        }
    }

    async GetAllPosts(queries = [Query.equal("status","active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDATABASEID,
                conf.appwriteCOLLECTIONID,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: GetAllPosts :: error ", error);
        }
    }

    // file Upload
    async UploadFile(file){
        try {
            return await this.Bucket.createFile(
            conf.appwriteBUCKET_ID,
            ID.unique(),
            file
        )
        } catch (error) {
            console.log("Appwrite service :: UploadFile :: error ", error);
        }
    }

    async DeleteFile(fileId){
       try {
         return await this.Bucket.deleteFile(
            conf.appwriteBUCKET_ID,
            fileId
        )
       } catch (error) {
           console.log("Appwrite service :: DeleteFile :: error ", error);
       }
    }

     PreviewFile(fileId){
        try {
            return  this.Bucket.getFilePreview(
                conf.appwriteBUCKET_ID,
                fileId
            );
        } catch (error) {
            console.log("Appwrite service :: PreviewFile :: error ", error);
        }
    }

     GetImage(fileId){
        try {
            return  this.Bucket.getFileView(
                conf.appwriteBUCKET_ID,
                fileId
            );
        } catch (error) {
            console.log("Appwrite service :: GetImage :: error ", error);
        }
    }
    

}

const services = new Services();

export default services;