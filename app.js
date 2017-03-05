//存取我们的数据
var store = {
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    },
    fetch(key){
        return JSON.parse(localStorage.getItem(key))||[];
    }
}


/*var list = [
    // {
    // 	title:'吃饭睡觉',
    // 	ischecked:false
    // },
    //  {
    //  	title:'打豆豆',
    //  	ischecked:true
    //  }
];*/
var list = store.fetch('xiaoma');
var filter = {
                    all:function(list){
                        return list;
                    },
                    finished:function(list){
                        return list.filter(function(item){
                            return item.ischecked;
                        });
                    },
                    unfinished:function(list){
                          return list.filter(function(item){
                            return !item.ischecked;
                        });
                    }
                } //filter结束
                
var vm = new Vue({
    el:".main",
    watch:{
        // list:function(){
        //     store.save('xiaoma',this.list); 
        // }
           list:{
            handler:function(){
                store.save('xiaoma',this.list); 
                    },
                deep:true
           }
    },
    data:{
    	list:list,
    	todo:"",
    	edtorTodos:"",
      beforetitle:"",
      visibility:"all"//通过这个属性值的变化对数据进行筛选
    },
    methods:{
    	addToDo:function(){
          this.list.push({
              title:this.todo,
           		ischecked:false,
           	});
         this.todo = '';

    	},
    	deletetodo:function(todo){
    		var index = this.list.indexOf(todo);
    		this.list.splice(index,1);
    	},
    	edtortodo:function(todo){
    		this.edtorTodos = todo;

            //编辑这条任务的时候记录下来，方便在取消编辑是回到原来的值
        this.beforetitle = todo.title;
    	},
        edtortodoed:function(todo){
            this.edtorTodos = '';
        },
        canceltodo:function(todo){
            todo.title = this.beforetitle;
            //div显示出来
            this.edtorTodos = '';
        }
    },
        directives:{
            "focus":{
                update(el,binding){
                    if(binding.value){
                        el.focus();
                    }
                }
            }
        },
        computed:{
            nochecked:function(){
               return this.list.filter(function(item){
                   return !item.ischecked
                    }).length
            },
            filterdList:function(){
                //过滤的时候有三种情况。
                return filter[this.visibility]?filter[this.visibility](list):list;
            } //filterdList
        }//computed
    
});
function watchhashchange(){

    var hash = window.location.hash.slice(1);
    vm.visibility = hash;
};
 watchhashchange();
window.addEventListener('hashchange', watchhashchange);
window.onload = function(){
    var btnLi = document.getElementById("btn1");
    var lia = btnLi.getElementsByTagName('a');
    for (var i = 0;i<lia.length;i++){
        (function(a){
           lia[a].onclick = function(){
            for (var i = 0;i<lia.length;i++){
                 lia[i].setAttribute('class','');
            }
            this.setAttribute('class','active');
            }
        })(i);
          
    }
}