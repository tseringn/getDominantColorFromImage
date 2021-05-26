let imgDiv = document.getElementsByClassName('image-container')[0]
document.addEventListener('DOMContentLoaded',()=>{
    let input = document.getElementsByClassName('url-input')[0]
    document.addEventListener('keydown', e=>{
        if(e.key == 'Enter'){
            e.preventDefault()
        if(input.value.length>0){
            let img =document.createElement('img')
            img.src=input.value
            img.className ='img'
            img.crossOrigin = 'anonymous';
            img.onload=()=>{
                imgDiv.innerHTML=''
                imgDiv.appendChild(img)
                getDominantColor(img)
            }  
        }else{
            window.alert('invalid input!')
        }
        }
    })

    
})

const  getDominantColor=async (img)=>{
    let cs = document.createElement("canvas")
    let ctx = cs.getContext('2d')
    ctx.drawImage(img, 0, 0)
    
    let imgData = ctx.getImageData(0,0,cs.width, cs.height) 
    let pxs = imgData.data
    let colors = {}
   
    for(let i=0; i<pxs.length; i+=4){
        let rgba =`${pxs[i]},${pxs[i+1]},${pxs[i+2]}`
        if(colors[rgba]){
            colors[rgba]=colors[rgba]+1
        }else{
            colors[rgba]=1
        }
    }
    let max =-1,
    res='0,0,0'
    for(let key in colors){
        if(max<colors[key] && (key !='0,0,0' || key!='255,255,255')){
            res=key
            max = colors[key]
        }
    }
    console.log(res)
    img.style=`box-shadow: 20px 20px 60px 30px rgba(${res})`
    let gradient = (res.split(",").slice(0,3).join(",")+",.5")
    document.body.style=`background: rgba(${gradient})`
}