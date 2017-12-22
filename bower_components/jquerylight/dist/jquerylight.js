var $=function(selector){
    //ie9+ http://caniuse.com/#feat=queryselector
    //ie10+ http://caniuse.com/#search=pushState
    if (typeof selector==="function") {
        return selector();
    }else if (typeof selector==="undefined") {
        return {
            //funções sem selector
            ajax:function ajax(url,method,data){
                if(typeof data==="undefined"){
                    data=null;
                }else{
                    var params = "";
                    for (var key in data) {
                        if (params != "") {
                            params += "&";
                        }
                        params += key + "=" + data[key];
                    }
                    data='?'+params;
                }
                if(method=='get'){
                    url=url+data;
                    var request = new XMLHttpRequest();
                    request.open('GET', url, true);
                    request.onload = function() {
                        if (request.status = 200 && request.status < 400) {
                            return request.responseText;
                        }
                    };
                    request.onerror = function() {
                        return false;
                    };
                    request.send();
                }else if(method=='post'){
                    var request = new XMLHttpRequest();
                    request.open('POST', url, true);
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                    request.onload = function() {
                        if (request.status = 200 && request.status < 400) {
                            return request.responseText;
                        }
                    };
                    request.onerror = function() {
                        return false;
                    };
                    request.send(data);
                }
            },
            getJson:function(url,data,callback){
                method='get';
                return JSON.parse(ajax(url,method,data));
            },
            history:function(title,url){
                this.title(title);
                this.url(url);
            },
            isEmail:function(string){
                var input = document.createElement('input');
                input.type='email';
                input.value=document.getElementById('test').value;
                if (input.checkValidity()) {
                    return true;
                } else {
                    return false;
                }
            },
            title:function(title){
                if(typeof title==="undefined"){
                    return $('title').html();
                }else{
                    $('title').html(title);
                }
            },
            url:function(url){
                if(typeof url==="undefined"){
                    return window.location;
                }else{
                    history.pushState({}, null, url);
                }
            },
        }
    }else{
        return {
            //variáveis
            tags:document.querySelectorAll(selector),
            //funções com selector
            attr:function(name,value){
                if(typeof value==="undefined"){
                    if(this.tags.length===1){
                        return this.tags[0].getAttribute(name);
                    }else{
                        var values=new Object();
                        for (var i = 0; i < this.tags.length; i++) {
                            values[i]=this.tags[i].getAttribute(name);
                        }
                        return values;
                    }
                }else{
                    if(this.tags.length===1){
                        this.tags[0].setAttribute(name,value);
                    }else{
                        for (var i = 0; i < this.tags.length; i++) {
                            this.tags[i].setAttribute(name,value);
                        }
                    }
                }
            },
            click:function(callback){
                event.preventDefault();
                return this.on('click',callback);
            },
            focus:function(){
                this.tags[0].focus();
            },
            height:function(height){
                if(typeof height==="undefined"){
                    if(this.tags.length===1){
                        return this.tags[0].offsetHeight+ "px";
                    }else{
                        var values=new Object();
                        for (var i = 0; i < this.tags.length; i++) {
                            values[i]=this.tags[i].offsetHeight+ "px";
                        }
                        return values;
                    }
                }else{
                    this.tags[0].style.height = height+"px";
                }
            },
            hide:function(){
                this.attr('style', 'display: none;');
            },
            html:function(html) {
                if(typeof html==="undefined"){
                    if(this.tags.length===1){
                        return this.tags[0].innerHTML;
                    }else{
                        var html=new Object();
                        for (var i = 0; i < this.tags.length; i++) {
                            html[i]=this.tags[i].innerHTML;
                        }
                        return html;
                    }
                }else{
                    if(this.tags.length===1){
                        this.tags[0].innerHTML=html;
                    }else{
                        for (var i = 0; i < this.tags.length; i++) {
                            this.tags[i].innerHTML=html;
                        }
                    }
                }
            },
            isEmail:function(string){
                var input = this.tags[0];
                if (input.checkValidity()) {
                    return true;
                } else {
                    return false;
                }
            },
            off:function(eventName,callback){
                if(this.tags.length===1){
                    this.tags[0].removeEventListener(eventName, callback);
                }else{
                    for (var i = 0; i < this.tags.length; i++) {
                        this.tags[i].removeEventListener(eventName, callback);
                    }
                }
            },
            on:function(eventName,callback){
                if(this.tags.length===1){
                    this.tags[0].addEventListener(eventName, function(){
                        return callback();
                    });
                }else{
                    for (var i = 0; i < this.tags.length; i++) {
                        this.tags[i].addEventListener(eventName, function(){
                            return callback();
                        });
                    }
                }
            },
            serialize:function(){
                if(typeof html==="undefined"){
                    if(this.tags.length===1){
                        return new FormData(this.tags[0]);
                    }else{
                        var values=new Object();
                        for (var i = 0; i < this.tags.length; i++) {
                            values[i]=new FormData(this.tags[i]);
                        }
                        return values;
                    }
                }else{
                    if(this.tags.length===1){
                        this.tags[0].innerHTML=html;
                    }else{
                        for (var i = 0; i < this.tags.length; i++) {
                            this.tags[i].innerHTML=html;
                        }
                    }
                }
            },
            show:function(){
                this.attr('style', 'display: block;');
            },
            val:function(newvalue){
                if(typeof newValue==="undefined"){
                    if(this.tags.length===1){
                        return this.tags[0].value;
                    }else{
                        var values=new Object();
                        for (var i = 0; i < this.tags.length; i++) {
                            values[i]=this.tags[i].value;
                        }
                        return values;
                    }
                }else{
                    if(this.tags.length===1){
                        this.tags[0].value=newValue;
                    }else{
                        for (var i = 0; i < this.tags.length; i++) {
                            this.tags[i].value=newValue;
                        }
                    }
                }
            },
            width:function(width){
                if(typeof width==="undefined"){
                    if(this.tags.length===1){
                        return this.tags[0].offsetWidth+ "px";
                    }else{
                        var values=new Object();
                        for (var i = 0; i < this.tags.length; i++) {
                            values[i]=this.tags[i].offsetWidth+ "px";
                        }
                        return values;
                    }
                }else{
                    this.tags[0].style.width = width+"px";
                }
            },
        }
    }
}
