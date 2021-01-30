import $ from 'jquery';

let returnThis = [];
 
getValues();
console.log(returnThis);

   function sendPostIt(value, color, x, y, isImage, imageValue){
  if(isImage){
    $.getJSON("http://localhost:5000/postpostit?value=" + value + "&color=" + color + "&x=" + x + "&y=" +y + "&imageValue="+imageValue, data=>{})}

  else{
    $.getJSON("http://localhost:5000/postpostit?value=" + value + "&color=" + color + "&x=" + x + "&y=" +y, data=>{})
  }
  }
  function getValues(){
    
    
    $.getJSON("http://localhost:5000/postit.json", data=>{
      //not hacky code shut up
      let i = 0;
      let index = 0;
      let addThis = {};
      for(key of data){
        
        if(i==0){  
          if(data[key].imageValue==null){
          addThis.value = data[key].value;
        console.log(data[key].value);
      i++; }else{
       if(data[key].imageValue!=0)
       addThis.image = data[key].imageValue;
        returnThis[index] = addThis;
      }
    }else if(i==1){
      addThis.color =data[key].color;            console.log(data[key].color);
      i++;  
    }else if(i==2){
      addThis.x = data[key].x;            console.log(data[key].x);
      i++; 
    }else if(i==3){
      addThis.y =data[key].y;            console.log(data[key].y);
     
      i=0; index++;
    }
      }
    })
  }
