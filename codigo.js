!function(e,n,t,r){
    function o(){try{var e;if((e="string"==typeof this.response?JSON.parse(this.response):this.response).url){var t=n.getElementsByTagName("script")[0],r=n.createElement("script");r.async=!0,r.src=e.url,t.parentNode.insertBefore(r,t)}}catch(e){}}var s,p,a,i=[],c=[];e[t]={init:function(){s=arguments;var e={then:function(n){return c.push({type:"t",next:n}),e},catch:function(n){return c.push({type:"c",next:n}),e}};return e},on:function(){i.push(arguments)},render:function(){p=arguments},destroy:function(){a=arguments}},        e.__onWebMessengerHostReady__=function(n){if(delete e.__onWebMessengerHostReady__,e[t]=n,s)for(var r=n.init.apply(n,s),o=0;o<c.length;o++){var u=c[o];r="t"===u.type?r.then(u.next):r.catch(u.next)}p&&n.render.apply(n,p),a&&n.destroy.apply(n,a);for(o=0;o<i.length;o++)n.on.apply(n,i[o])};var u=new XMLHttpRequest;u.addEventListener("load",o),u.open("GET","https://WebChannelOAuth-gse00016029.uscom-central-1.oraclecloud.com/dist/loader.json",!0),u.responseType="json",u.send()}(window,document,"Bots");
  var appid = '';
  var images_URI = '';
    appid = document.getElementById("settings").getAttribute("appid");
    images_URI = document.getElementById("settings").getAttribute("images_hostname");
    console.log('appid : '+appid);
    console.log('images_URI : '+images_URI);
   var access_token=null;
  var user_id=null;
  var Servlet_uri = "https://"+window.location.host+"/fscmRestApi/tokenrelay";
  var diff;
  var botuser;
  var hiflag;
  var bot = {};
  if(/fa-ext/.test(Servlet_uri)){
      getJWT();
  }else
  {
          console.log("NOT FA EMBEDDED")
      }
      
  function set_localstorage(){	
  var fap = window.location.host.split('-')[1];
  
  var retrievedObject = localStorage.getItem('bot');
  if(retrievedObject===null){
   var startDate = new Date();
       
        bot['botuser']=user_id;
          bot['time']=startDate;
          bot['hiflag']=false;
          //Put the object into storage
          localStorage.setItem('bot', JSON.stringify(bot));
          retrievedObject = localStorage.getItem('bot');
  }
  
  var retreivedbotvalues = JSON.parse(retrievedObject);
  console.log('retrievedObject: ', JSON.parse(retrievedObject));
  botuser = retreivedbotvalues["botuser"];
  var lastDate = new Date(retreivedbotvalues["time"]);
  hiflag = retreivedbotvalues["hiflag"];
  
  var startDate = new Date();
  diff =(startDate.getTime() - lastDate.getTime()) / 1000;
    diff /= 60;
  //clear the local storage if the logged-in user is different or time exceeds 2 hrs
  console.log(diff);
  if(diff > 120 || botuser!=user_id){
      
      var keys = Object.keys(localStorage);
       for(var i = 0; i < keys.length; i++){
        localStorage.removeItem(keys[i]);
       }
       Bots.destroy();
       var startDate = new Date();
       
       
         bot['botuser']=user_id;
          bot['time']=startDate;
          bot['hiflag']=false;
          //Put the object into storage
          localStorage.setItem('bot', JSON.stringify(bot));
      }
      
      
      Bots.on('ready', function(){
      console.log('the init has completed!');
      console.log(Bots.getUser());
      //var userdetails = Bots.getUser();
      //var user = userdetails["givenName"];
      retrievedObject = localStorage.getItem('bot');
      bot=JSON.parse(retrievedObject);
      hiflag = bot['hiflag'];
      if(diff >= 120 || botuser!=user_id || hiflag==false){
      Bots.sendMessage("Hi");
      bot['hiflag']=true;
      localStorage.setItem('bot', JSON.stringify(bot));
      }
      
  }); 
  
    Bots.init({ appId: appid,
          businessName: 'Asistente Virtual',
          introductionText: 'Estoy aqui para que me preguntes lo que necesites',
         businessIconUrl: 'https://portalacindar-gse00014621.uscom-east-1.oraclecloud.com/static/avatar.png',
          buttonIconUrl: 'https://portalacindar-gse00014621.uscom-east-1.oraclecloud.com/static/avatar.png',
          backgroundImageUrl: images_URI+'/Images/WebWidget/bg.png',
          customColors: {
              brandColor: '286090',
          },
          customText: {
              headerText: 'Hola! Como puedo ayudarte?'
          }
    }).then(function(){
      Bots.updateUser({
      "givenName": access_token,
      "surname": user_id + "-webchannel"
  })
  });
  }
      
      
      
              // Get JWT token using token relay FA Servlet
              function getJWT() {
                  var xhttp = new XMLHttpRequest();
                  xhttp.open("GET",Servlet_uri, true);
                  xhttp.setRequestHeader("Content-type", "application/json");
                  xhttp.onreadystatechange = function () {
                  if(xhttp.readyState === 4 && xhttp.status === 200) {
                      
                      access_token=JSON.parse(xhttp.responseText).access_token;
                      user_id=JSON.parse(xhttp.responseText).principal;
                      set_localstorage();
                  }
                  };
                  xhttp.send();
                  
              }
  
   
    
    