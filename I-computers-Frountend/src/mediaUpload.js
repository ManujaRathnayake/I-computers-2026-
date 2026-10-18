import { createClient } from "@supabase/supabase-js/dist/index.cjs";

        let url = import.meta.env.VITE_MEDIA_URL
        let key = import.meta.env.VITE_MEDIA_ANON
        const supabase = createClient(url , key);

        export default function uploadMedia(file){
            return new Promise ((resolve,reject)=>{
                if(file == null){
                    reject("No file Selected")
            }else{
                const timeStamp = new Date().getTime();
                const filename = timeStamp + "_" + file.name;

                supabase.storage
                .from("Images").upload(filename , file , {
                    upsert: false,
                    cacheControl:"3600"
                }).then((res)=>{
                    if(res.error){
                        reject(res.error)
                        return;
                    }

                    const publicUrl = supabase.storage
                    .from("Images")
                    .getPublicUrl(filename).data.publicUrl;

                    resolve(publicUrl)
                })

                .catch((error)=>{
                    reject(error);
                })
            
            }
        })
    }



    // let url = "https://piralnwecllcnlawvwae.supabase.co/rest/v1/"
    //     let key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpcmFsbndlY2xsY25sYXd2d2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIzMTU5ODIsImV4cCI6MjEwNzg5MTk4Mn0.KmT3cqoQj8PZVLfabvrnhF586LT78o2Jqh6RZ0HNtg4"
    //     const supabase = createClient(url , key);
