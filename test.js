let imgDiv = document.getElementsByClassName('image-container')[0]
document.addEventListener('DOMContentLoaded',()=>{
    let input = document.getElementsByClassName('url-input')[0]
    let submit = document.getElementsByClassName('url-submit')
  
    

    document.addEventListener('click', e=>{
        if(e.target.className == 'url-submit'){
            e.preventDefault()
        // if(input>0){
            console.log(imgDiv, input.value)
            let img =document.createElement('img')
            img.src=input.value

            
            getDominantColor(img)
            console.log('clicked!')
        // }else{
        //     window.alert('invalid input!')
        // }
        }
        console.log(e.target)
    })

    
})

const getDominantColor=(img)=>{
    let cs = document.createElement("canvas")
    imgDiv.appendChild(cs)
    let ctx = cs.getContext('2d')
    ctx.drawImage(img, 0, 0)
    console.log(cs.layerX)
    let imgData = ctx.getImageData(0,0,cs.width, cs.height) 
    let pxs = imgData.data
    let colors = {}
    
    console.log(pxs)
    for(let i=0; i<pxs.length; i+=4){
        let rgba =`${pxs[i]},${pxs[i+1]},${pxs[i+2]},${pxs[i+3]/255}`
        if(colors[rgba]){
            colors[rgba]=colors[rgba]+1
        }else{
            colors[rgba]=1
        }
    }
    let max =-1,
    res='0,0,0,0'
    for(let key in colors){
        if(max<colors[key] && key !='0,0,0,0'){
            res=key
            max = colors[key]
        }
    }
    console.log(res,colors[res]);
    document.body.style=`background: rgba(${res})`
}