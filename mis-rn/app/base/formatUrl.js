export default function (url,data){
  for (let key in data) {
    if(url.indexOf("?")>-1){
      url=url+"&"+key+"="+data[key]
    }else{
      url=url+"?"+key+"="+data[key]
    }
  }
  return url
}
