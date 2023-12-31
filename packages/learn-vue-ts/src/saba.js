
//方法名严格遵循驼峰方式
export default {
    /************************************浏览器信息相关********************************/
    isWeiXinBrowser() {
        let search = this.getBrowser().match(/MicroMessenger/i);
        if (!search) {
            return false;
        }

        return (search[0] === 'micromessenger');
    },
    getBrowser() {
        return window.navigator.userAgent.toLowerCase();
    },
    isAndroid: function () {
        return this.getBrowser.indexOf('Android') > -1 || this.u.indexOf('Adr') > -1; //android终端
    },
    isiOS: function () {
        return !!this.getBrowser.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    },
    /***************************************log相关******************8****************/
    _logStyle (color = 'green', weight = 600) {
        return `color:${color};font-weight:${weight}`;
    },
    logTime() {
        let date = new Date(),
            h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds(),
            ms = date.getMilliseconds();

        function addZero (i) {
            return (i < 10) ? "0" + i : i;
        }

        m = addZero(m);
        s = addZero(s);
        ms = ms < 100 ? '0' + ms : ms;

        return h + ":" + m + ":" + s + ":" + ms;
    },
    //对象形式
    log(name, tip, data) {
        let style = this._logStyle();
        if (data) {
            console.log("%c" + this.logTime() + " " + name, style, tip, data);
        } else if (tip) {
            console.log("%c" + this.logTime() + " " + name, style, tip);
        } else {
            console.log("%c" + this.logTime(), style, name);
        }
    },
    //字符串形式
    jsonLog(name, tip, data) {
        let style = this._logStyle();
        if (data) {
            console.log("%c" + this.logTime() + " " + JSON.stringify(name), style, JSON.stringify(tip), JSON.stringify(data));
        } else if (tip) {
            console.log("%c" + this.logTime() + " " + JSON.stringify(name), style, JSON.stringify(tip));
        } else {
            console.log("%c" + this.logTime(), style, JSON.stringify(name));
        }
    },
    errLog(msg) {
        console.log("%c" + this.logTime(), this._logStyle('red'), msg);
    },
    /************************************对象篇*********************************/
    isDigital(val){
        return /^\d$/.test(val);
    },
    isDefined(val) {
        return !this.isUndefined(val);
    },
    isUndefined(val) {
        return typeof val === "undefined";
    },
    isObject(val) {
        return ! this.isArray(val) && (typeof val === "object");
    },
    isFunction(val) {
        return typeof val === "function";
    },
    isArray(val) {
        return Object.prototype.toString.call(val) === '[object Array]';
    },
    isEmptyObject(obj) {
        if (typeof obj === "object" && !this.isArray(obj)) {
            let hasProp = false;
            for (let key in obj) {
                hasProp = true;
                break;
            }
            return !hasProp
        }
    },
    isEmpty(val) {
        let stringify = JSON.stringify(val);
        if (-1 !== ['""', '[]', '{}', 0, false, undefined, null, ''].indexOf(stringify) || stringify.trim() === ""){
            return true;
        }

        return false;
    },
    findObjArrSibling(knownKey, knownValue, arr) {
        // 校验参数合法性
        if (!this.isArray(arr)) {
            throw new Error("第三个参数请传入目标数组");
        }

        let ret = {};
        for (let i = 0, len = arr.length; i < len; i++) {
            let obj = arr[i];
            if (obj[knownKey] === knownValue) {
                ret = obj;
                break;
            }
        }

        return ret;
    },
    isDate(val) {
        return Object.prototype.toString.call(val) === '[object Date]';
    },
    isRegExp(val) {
        return Object.prototype.toString.call(val) === '[object RegExp]';
    },
    isMobile(mobile) {
        return /^1[3-9]\d{9}$/.test(mobile)
    },
    inArray(val, arr){
        if (this.isArray(arr)){
            return arr.indexOf(val) !== -1
        }

        return false;
    },
    //数组去重，数组深拷贝，数组浅拷贝
    uniqueArray(arr) {
        if (!this.isArray(arr)) {
            return false
        }
        return [...new Set(arr)]        //Set去重，解构赋值转数组
    },
    uniqueArray2(arr) {
        if (!this.isArray(arr)) {
            return false
        }
        return Array.from(new Set(arr))     //Set去重，并转化为数组
    },
    uniqueArray3(arr){
        if (!this.isArray(arr)) {
            return false
        }

        let data = [];
        let flag = true;

        arr.forEach(function(item) {
            // 排除 NaN (重要！！！)
            if (item != item) {
                flag && data.indexOf(item) === -1 ? data.push(item) : '';
                flag = false;
            } else {
                data.indexOf(item) === -1 ? data.push(item) : ''
            }

        });

        return data;
    },
    /***********************************日期相关******************************************/



    /*****************************加密***************************************/
    md5(s) {
        var hexcase = 0;
        var chrsz = 8;

        /**
         * Convert an array of little-endian words to a hex string.
         */
        function binl2hex(binarray) {
            var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var str = "";
            for (var i = 0; i < binarray.length * 4; i ++) {
                str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                    hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8  )) & 0xF);
            }
            return str;
        }

        /**
         * Calculate the MD5 of an array of little-endian words, and a bit length
         */
        function core_md5(x, len) {
            /* append padding */
            x[len >> 5] |= 0x80 << ((len) % 32);
            x[(((len + 64) >>> 9) << 4) + 14] = len;

            var a = 1732584193;
            var b = - 271733879;
            var c = - 1732584194;
            var d = 271733878;

            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;

                a = md5_ff(a, b, c, d, x[i + 0], 7, - 680876936);
                d = md5_ff(d, a, b, c, x[i + 1], 12, - 389564586);
                c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = md5_ff(b, c, d, a, x[i + 3], 22, - 1044525330);
                a = md5_ff(a, b, c, d, x[i + 4], 7, - 176418897);
                d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = md5_ff(c, d, a, b, x[i + 6], 17, - 1473231341);
                b = md5_ff(b, c, d, a, x[i + 7], 22, - 45705983);
                a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = md5_ff(d, a, b, c, x[i + 9], 12, - 1958414417);
                c = md5_ff(c, d, a, b, x[i + 10], 17, - 42063);
                b = md5_ff(b, c, d, a, x[i + 11], 22, - 1990404162);
                a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = md5_ff(d, a, b, c, x[i + 13], 12, - 40341101);
                c = md5_ff(c, d, a, b, x[i + 14], 17, - 1502002290);
                b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

                a = md5_gg(a, b, c, d, x[i + 1], 5, - 165796510);
                d = md5_gg(d, a, b, c, x[i + 6], 9, - 1069501632);
                c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = md5_gg(b, c, d, a, x[i + 0], 20, - 373897302);
                a = md5_gg(a, b, c, d, x[i + 5], 5, - 701558691);
                d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = md5_gg(c, d, a, b, x[i + 15], 14, - 660478335);
                b = md5_gg(b, c, d, a, x[i + 4], 20, - 405537848);
                a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = md5_gg(d, a, b, c, x[i + 14], 9, - 1019803690);
                c = md5_gg(c, d, a, b, x[i + 3], 14, - 187363961);
                b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = md5_gg(a, b, c, d, x[i + 13], 5, - 1444681467);
                d = md5_gg(d, a, b, c, x[i + 2], 9, - 51403784);
                c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = md5_gg(b, c, d, a, x[i + 12], 20, - 1926607734);

                a = md5_hh(a, b, c, d, x[i + 5], 4, - 378558);
                d = md5_hh(d, a, b, c, x[i + 8], 11, - 2022574463);
                c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = md5_hh(b, c, d, a, x[i + 14], 23, - 35309556);
                a = md5_hh(a, b, c, d, x[i + 1], 4, - 1530992060);
                d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = md5_hh(c, d, a, b, x[i + 7], 16, - 155497632);
                b = md5_hh(b, c, d, a, x[i + 10], 23, - 1094730640);
                a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = md5_hh(d, a, b, c, x[i + 0], 11, - 358537222);
                c = md5_hh(c, d, a, b, x[i + 3], 16, - 722521979);
                b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = md5_hh(a, b, c, d, x[i + 9], 4, - 640364487);
                d = md5_hh(d, a, b, c, x[i + 12], 11, - 421815835);
                c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = md5_hh(b, c, d, a, x[i + 2], 23, - 995338651);

                a = md5_ii(a, b, c, d, x[i + 0], 6, - 198630844);
                d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = md5_ii(c, d, a, b, x[i + 14], 15, - 1416354905);
                b = md5_ii(b, c, d, a, x[i + 5], 21, - 57434055);
                a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = md5_ii(d, a, b, c, x[i + 3], 10, - 1894986606);
                c = md5_ii(c, d, a, b, x[i + 10], 15, - 1051523);
                b = md5_ii(b, c, d, a, x[i + 1], 21, - 2054922799);
                a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = md5_ii(d, a, b, c, x[i + 15], 10, - 30611744);
                c = md5_ii(c, d, a, b, x[i + 6], 15, - 1560198380);
                b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = md5_ii(a, b, c, d, x[i + 4], 6, - 145523070);
                d = md5_ii(d, a, b, c, x[i + 11], 10, - 1120210379);
                c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = md5_ii(b, c, d, a, x[i + 9], 21, - 343485551);

                a = safe_add(a, olda);
                b = safe_add(b, oldb);
                c = safe_add(c, oldc);
                d = safe_add(d, oldd);
            }
            return Array(a, b, c, d);

        }
        /**
         * These functions implement the four basic operations the algorithm uses.
         */
        function md5_cmn(q, a, b, x, s, t) {
            return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
        }

        function md5_ff(a, b, c, d, x, s, t) {
            return md5_cmn((b & c) | ((~ b) & d), a, b, x, s, t);
        }

        function md5_gg(a, b, c, d, x, s, t) {
            return md5_cmn((b & d) | (c & (~ d)), a, b, x, s, t);
        }

        function md5_hh(a, b, c, d, x, s, t) {
            return md5_cmn(b ^ c ^ d, a, b, x, s, t);
        }

        function md5_ii(a, b, c, d, x, s, t) {
            return md5_cmn(c ^ (b | (~ d)), a, b, x, s, t);
        }

        /**
         * Convert a string to an array of little-endian words
         * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
         */
        function str2binl(str) {
            var bin = Array();
            var mask = (1 << chrsz) - 1;
            for (var i = 0; i < str.length * chrsz; i += chrsz)
                bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
            return bin;
        }

        /**
         * Add integers, wrapping at 2^32. This uses 16-bit operations internally
         * to work around bugs in some JS interpreters.
         */
        function safe_add(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }

        /**
         * Bitwise rotate a 32-bit number to the left.
         */
        function bit_rol(num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        }

        return binl2hex(core_md5(str2binl(s), s.length * chrsz));
    },
    createUuid(prefix) {
        prefix = prefix ? prefix + "_" : "";
        let len = 32;
        /*32长度*/
        let radix = 62;
        /*16进制*/
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        let uuid = [],
            i;
        radix = radix || chars.length;

        if ( len ) {
            for (i = 0; i < len; i ++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            let r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i ++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return prefix + uuid.join('');
    },
    mixMobile(mobile) {
        if (mobile.length == 11){
            return mobile.substr(0, 3) + "****" + mobile.substr(7);
        }

        return mobile;
    },
    /*******************************格式化和过滤********************************/
    filter: {
        mobile(val) {
            val = val.replace(/[^0-9]/g, "");
            if(val.length > 11){
                val.substr(0, 11)
            }
            return val;
        },
        distance(distance) {
            if (distance < 1000){
                return Math.round(Number(distance)) + "米";
            } else {
                return Number(distance/1000).toFixed(2) + "公里";
            }
        },
        fenToyuan(val) {
            return (!this.isUndefined(val) && val) ? Number(val / 100).toFixed(2) : "0.00";
        },
        fen2Comma(val) {
            return this.number2Comma(val/100, 2)
        },
        number2Comma(val, n = 2, pre = "￥"){
            val = Number(val);
            if (isNaN(val)) {
                return "";
            }

            /*如果第三个参数为true，则显示前缀￥*/
            if(n != 0 ){
                n = (n > 0 && n <= 20) ? n : 2;
            }

            let number = parseFloat((val + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
            let sub_val = number.split(".")[0].split("").reverse();
            let sub_xs = number.split(".")[1];

            let show_html = "";
            for (let i = 0, count = sub_val.length; i < count; i++){
                show_html += sub_val[i] + ((i + 1) % 3 == 0 && (i + 1) != sub_val.length ? "," : "");
            }

            if (n == 0 ){
                return pre + show_html.split("").reverse().join("");
            } else {
                return pre + show_html.split("").reverse().join("") + "." + sub_xs;
            }
        }
    },
    /******************************其他题材********************************/
    setDocumentTitle(title) {
        document.title = title;
    },
    /******************************localStorage相关********************************/
    localStorage:{
        save(key, obj) {
            if(this.isObject(obj)){
                obj = JSON.stringify(obj)
            }

            localStorage.setItem(key, obj);
        },
        //查找数据
        get(key) {
            return localStorage.getItem(key);
        }
    },
    /******************************sessionStorage相关********************************/
    sessionStorage: {
        save:function (key, obj) {
            sessionStorage.setItem(key, obj);
        },
        get:function(key){
            return sessionStorage.getItem(key);
        }
    },
    /******************************Cookie相关********************************/
    Cookie: {
        setCookie(cName, cValue, cAge) {
            cAge = cAge || 60 * 60 * 24 * 365;
            cValue = encodeURI(cValue);
            document.cookie = cName + "=" + cValue +
                "; max-age=" + cAge +
                "; path=/";
        },
        getCookie(cName) {
            let cValue = "";
            let allCookie = document.cookie;
            let pos = allCookie.indexOf(cName + "=");
            if (pos !== -1) {
                let start = pos + cName.length + 1;
                let end = allCookie.indexOf(";", start);
                if (end === -1)
                    end = allCookie.length;
                cValue = decodeURI(allCookie.substring(start, end));
            }

            return cValue;
        }
    },
    /************************************验证相关**********************************/
    //验证密码必须是字母数字符号两两组合才行，有时候直接写代码比用正则容易理解
    CombinePasswordVerify(value, min = 8, max = 16) {
        let regNumber = /^[0-9]+$/i;
        let regWord = /^[a-zA-Z]+$/i;
        let regCharacter = /^[^a-zA-Z0-9]+$/i;

        let isPureNum = regNumber.test(value)
        let isPureLetter = regWord.test(value)
        let isCharacter = regCharacter.test(value);

        return !(isPureNum || isPureLetter || isCharacter || value.length < min || value.length > max);
    },
    isValidDate(year, month, day){
        const date = new Date(year, month - 1, day)
        return (
            date.getFullYear() === year
            && date.getMonth() + 1 === month
            && date.getDate() === day
            && date.getTime() < new Date().getTime()
        );
    },
    isChineseIDCardNumber(value) {
        /**
         * 原理：地址码+出生日期码+顺序码+校验码
         *  首位不为 0 的 18 位字符串，由 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, X 字符组成
             前两位地区码在 11, 12, 13, 14, 15, 21, 22, 23, 31, 32, 33, 34, 35, 36, 37, 41, 42, 43, 44, 45, 46, 50, 51, 52, 53, 54, 61, 62, 63, 64, 65, 71, 81, 82 之中
             出生日期有效，且小于当前日期
             对前 17 位数字做校验码计算的结果等于第 18 位上的字符
             另外，还应考虑一些特殊情况：
             是否兼容 15 位的身份证号码
             X 与 x 的大小写兼容
         *
         */
        const len = value.length;

        // 长度错误
        if (len !== 15 && len !== 18) {
            return false;
        }

        // 模式校验
        const testRegExp = /^[1-9]([0-9]{14}|[0-9]{16}[0-9Xx])$/
        if (!testRegExp.test(value)) {
            return false;
        }

        // 地区校验
        const areaMap = [11, 12, 13, 14, 15, 21, 22, 23, 31, 32, 33, 34, 35, 36, 37, 41, 42, 43, 44, 45, 46, 50, 51, 52, 53, 54, 61, 62, 63, 64, 65, 71, 81, 82]
        if (areaMap.indexOf(+value.substr(0, 2)) === -1) {
            return false;
        }

        // 15 位
        if (len === 15) {
            return this.isValidDate(+`19${value.substr(6, 2)}`, +value.substr(8, 2), +value.substr(10, 2));
        }

        // 18 位
        if (!this.isValidDate(+value.substr(6, 4), +value.substr(10, 2), +value.substr(12, 2))) {
            return false;
        }

        // 校验码
        const weightMap = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        const codeMap = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
        const sum = value.split('').slice(0, 17).reduce((s, num, index) => {
            return s + (+num * weightMap[index]);
        }, 0)

        return codeMap[sum % 11] === value[17].toUpperCase();
    },
    /*******************************************************************************/
    on(element, event, handler){
        if(element && event && handler){
            if (document.addEventListener) {
                element.addEventListener(event, handler, false)
            } else {
                element.attachEvent('on' + event, handler)
            }
        }
    },
    off(element, event, handler){
        if (element && event) {
            if (document.removeEventListener) {
                element.removeEventListener(event, handler, false)
            } else {
                //兼容IE
                element.detachEvent('on' + event, handler)
            }
        }
    },
}