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



   