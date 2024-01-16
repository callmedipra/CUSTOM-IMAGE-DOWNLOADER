let btn=document.querySelector("#downimg");
btn.addEventListener("click",function(){
    let zip=new JSZip();
    let imagesurl=[
        "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?q=80&w=1614&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1609609830354-8f615d61b9c8?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

    function addimagestozip(urls,zip){
        let promises=urls.map((url,index)=>{
            return fetch(url).then((response)=>{
                return response.blob();
            }).then((blob)=>{
                zip.file("image_"+index+".png",blob);
            });
        });
        return Promise.all(promises);
    };
    addimagestozip(imagesurl,zip).then(()=>{
        zip.generateAsync({type:"blob"}).then((content)=>{
            var zipBlob= new Blob([content]);
            var zipUrl= window.URL.createObjectURL(zipBlob);
            var a=document.createElement("a");
            a.href=zipUrl;
            a.download="images.zip";
            document.body.appendChild(a);

            a.click();
            window.URL.revokeObjectURL(zipUrl);
            document.body.removeChild(a);
        })
    })
})