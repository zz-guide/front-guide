<template>
    <div>
    </div>

</template>

<script>
    export default {
        name: 'PrototypeIndex',
        components:{},
        data(){
            return {}
        },
        mounted(){
            this.testOne();
        },
        methods:{
            testOne(){
                var name = '许磊', age = 21
                var obj = {
                    name: '李四',
                    objAge: 22,
                    myFun: function (fm, t) {
                        console.log('ss' + fm)
                        console.log("obj.name:", this.name + '年龄' + this.age, '来自' + fm + '去往' + t)
                    }
                }

                console.log(obj.myFun())

                var db = {
                    name: "德玛",
                    age: 99
                }

                obj.myFun.call(db);
                obj.myFun.apply(db);
                obj.myFun.bind(db)();//返回的是一个新的函数


                obj.myFun.call(db,'成都','上海');           //德玛 年龄 99  来自 成都去往上海
                obj.myFun.apply(db,['成都','上海']);        //德玛 年龄 99  来自 成都去往上海
                obj.myFun.bind(db,'成都','上海')();         //德玛 年龄 99  来自 成都去往上海
                obj.myFun.bind(db,['成都','上海'])();       //德玛 年龄 99  来自 成都,上海去往undefined
            },
        }
    }
</script>