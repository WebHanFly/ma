var list = [
    {
    	title:'吃饭睡觉',
    	ischecked:false
    },
     {
     	title:'打豆豆',
     	ischecked:true
     }
];
new Vue({
    el:".main",
    data:{
    	list:list,
    	todo:"",
    	edtorTodos:"",
        beforetitle:""
    },
    methods:{
    	addToDo:function(ev){
     
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
            }
        }
    
});