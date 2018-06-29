var client = new XMLHttpRequest();
client.open('get', 'http://fezz.ceshi.che300.com/dream/cp/static/css/loan_platform/loan_platform_list.css');
client.onreadystatechange = function(){
  if (client.readyState === 4 && client.status === 200) {
    console.log(client.responseText);
  }
}
client.send();