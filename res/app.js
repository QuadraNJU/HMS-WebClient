var app = {
    // Config control
    config: {
        key: 'client_config',
        data: {
            server: 'http://localhost:8081',
            username: '',
            password: '',
        },
        save: function () {
            localStorage.setItem(this.key, JSON.stringify(this.data));
        },
        load: function () {
            var storage_data = localStorage.getItem(this.key);
            if (storage_data != null) {
                this.data = JSON.parse(storage_data);
            }
            this.save();
        },
    },

    // Session control
    session: {
        key: 'session',
        set: function (sess) {
            sessionStorage.setItem(this.key, JSON.stringify(sess));
        },
        get: function () {
            try {
                return JSON.parse(sessionStorage.getItem(this.key));
            } catch (e) {
                return null;
            }
        },
    },

    // Encapsulated GET/POST request
    requests: {
        post: function (url, payload, success, failure) {
            var session = app.session.get();
            $.ajax({
                type: 'POST',
                url: app.config.data.server + '/' + url + '/' + (session != null ? session.id : ''),
                data: JSON.stringify(payload),
                success: function (data) {
                    console.log(data);
                    try {
                        success(JSON.parse(data));
                    } catch (e) {
                        failure();
                    }
                },
                complete: function (xhr, status) {
                    if (status != 'success') {
                        failure();
                    }
                }
            });
        }
    },

    // Views
    view: {
        showError: function (message) {
            var dialog = $('#dialog');
            dialog.find('.modal-title').html('<span class="error"><span class="fa fa-lg fa-times"></span> 错误提示</span>');
            dialog.find('p').html(message);
            dialog.removeClass('shake').modal();
            dialog.on('shown.bs.modal', function () {
                $(this).addClass('shake');
            });
        },
        loadView: function (url) {
            var main = $('#main');
            var load = function () {
                main.html('');
                main.load('views/' + url + '.html?t=' + new Date().getTime());
                main.fadeIn(250);
            };
            if (main.css('display') != 'none') {
                main.fadeOut(250, load);
            } else {
                load();
            }
        },
    },

    // Models
    models: {
        usertype: {
            CUSTOMER: '客户',
            HOTEL_STAFF: '酒店工作人员',
            WEBSITE_MARKETER: '网站营销人员',
            WEBSITE_MASTER: '网站管理人员'
        },
        creditaction: {
            ORIGINAL: '初始信用值',
            ORDER_FINISHED: '完成订单',
            ORDER_CANCELLED: '撤销未执行订单',
            ORDER_DELAYED: '订单逾期未执行',
            ORDER_UNDO: '撤销异常订单返还',
            CREDIT_TOPUP: '信用充值'
        }
    },
};

// SHA-256 encryptor
(function(I){"object"==typeof process&&process.versions&&process.versions.node&&(I=global);var a="0123456789abcdef".split(""),Q=[-2147483648,8388608,32768,128],C=[24,16,8,0],L=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,
    113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],c=[],J=function(a){return A(a,!0)},A=function(D,A){var K="string"!=typeof D;K&&D.constructor==I.ArrayBuffer&&(D=new Uint8Array(D));var m,
    n,p,q,r,t,u,v,e,J=!0,O=!1,b,B=0,M=0,P=0,N=D.length,h,d,E,F,G,H;A?(m=3238371032,n=914150663,p=812702999,q=4144912697,r=4290775857,t=1750603025,u=1694076839,v=3204075428):(m=1779033703,n=3144134277,p=1013904242,q=2773480762,r=1359893119,t=2600822924,u=528734635,v=1541459225);e=0;do{c[0]=e;c[16]=c[1]=c[2]=c[3]=c[4]=c[5]=c[6]=c[7]=c[8]=c[9]=c[10]=c[11]=c[12]=c[13]=c[14]=c[15]=0;if(K)for(b=M;B<N&&64>b;++B)c[b>>2]|=D[B]<<C[b++&3];else for(b=M;B<N&&64>b;++B)e=D.charCodeAt(B),128>e?c[b>>2]|=e<<C[b++&3]:(2048>
    e?c[b>>2]|=(192|e>>6)<<C[b++&3]:(55296>e||57344<=e?c[b>>2]|=(224|e>>12)<<C[b++&3]:(e=65536+((e&1023)<<10|D.charCodeAt(++B)&1023),c[b>>2]|=(240|e>>18)<<C[b++&3],c[b>>2]|=(128|e>>12&63)<<C[b++&3]),c[b>>2]|=(128|e>>6&63)<<C[b++&3]),c[b>>2]|=(128|e&63)<<C[b++&3]);P+=b-M;M=b-64;B==N&&(c[b>>2]|=Q[b&3],++B);e=c[16];B>N&&56>b&&(c[15]=P<<3,O=!0);var w=m,k=n,l=p,f=q,x=r,y=t,z=u,g=v;for(b=16;64>b;++b)d=c[b-15],h=(d>>>7|d<<25)^(d>>>18|d<<14)^d>>>3,d=c[b-2],d=(d>>>17|d<<15)^(d>>>19|d<<13)^d>>>10,c[b]=c[b-16]+
    h+c[b-7]+d<<0;H=k&l;for(b=0;64>b;b+=4)J?(A?(G=300032,d=c[0]-1413257819,g=d-150054599<<0,f=d+24177077<<0):(G=704751109,d=c[0]-210244248,g=d-1521486534<<0,f=d+143694565<<0),J=!1):(h=(w>>>2|w<<30)^(w>>>13|w<<19)^(w>>>22|w<<10),d=(x>>>6|x<<26)^(x>>>11|x<<21)^(x>>>25|x<<7),G=w&k,E=G^w&l^H,F=x&y^~x&z,d=g+d+F+L[b]+c[b],h+=E,g=f+d<<0,f=d+h<<0),h=(f>>>2|f<<30)^(f>>>13|f<<19)^(f>>>22|f<<10),d=(g>>>6|g<<26)^(g>>>11|g<<21)^(g>>>25|g<<7),H=f&w,E=H^f&k^G,F=g&x^~g&y,d=z+d+F+L[b+1]+c[b+1],h+=E,z=l+d<<0,l=d+h<<0,
    h=(l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10),d=(z>>>6|z<<26)^(z>>>11|z<<21)^(z>>>25|z<<7),G=l&f,E=G^l&w^H,F=z&g^~z&x,d=y+d+F+L[b+2]+c[b+2],h+=E,y=k+d<<0,k=d+h<<0,h=(k>>>2|k<<30)^(k>>>13|k<<19)^(k>>>22|k<<10),d=(y>>>6|y<<26)^(y>>>11|y<<21)^(y>>>25|y<<7),H=k&l,E=H^k&f^G,F=y&z^~y&g,d=x+d+F+L[b+3]+c[b+3],h+=E,x=w+d<<0,w=d+h<<0;m=m+w<<0;n=n+k<<0;p=p+l<<0;q=q+f<<0;r=r+x<<0;t=t+y<<0;u=u+z<<0;v=v+g<<0}while(!O);K=a[m>>28&15]+a[m>>24&15]+a[m>>20&15]+a[m>>16&15]+a[m>>12&15]+a[m>>8&15]+a[m>>4&15]+a[m&15]+a[n>>
    28&15]+a[n>>24&15]+a[n>>20&15]+a[n>>16&15]+a[n>>12&15]+a[n>>8&15]+a[n>>4&15]+a[n&15]+a[p>>28&15]+a[p>>24&15]+a[p>>20&15]+a[p>>16&15]+a[p>>12&15]+a[p>>8&15]+a[p>>4&15]+a[p&15]+a[q>>28&15]+a[q>>24&15]+a[q>>20&15]+a[q>>16&15]+a[q>>12&15]+a[q>>8&15]+a[q>>4&15]+a[q&15]+a[r>>28&15]+a[r>>24&15]+a[r>>20&15]+a[r>>16&15]+a[r>>12&15]+a[r>>8&15]+a[r>>4&15]+a[r&15]+a[t>>28&15]+a[t>>24&15]+a[t>>20&15]+a[t>>16&15]+a[t>>12&15]+a[t>>8&15]+a[t>>4&15]+a[t&15]+a[u>>28&15]+a[u>>24&15]+a[u>>20&15]+a[u>>16&15]+a[u>>12&
    15]+a[u>>8&15]+a[u>>4&15]+a[u&15];A||(K+=a[v>>28&15]+a[v>>24&15]+a[v>>20&15]+a[v>>16&15]+a[v>>12&15]+a[v>>8&15]+a[v>>4&15]+a[v&15]);return K};!I.JS_SHA256_TEST&&"object"==typeof module&&module.exports?(A.sha256=A,A.sha224=J,module.exports=A):I&&(I.sha256=A,I.sha224=J)})(this);

// app init
app.config.load();