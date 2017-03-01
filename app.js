var list = [
    // {
    // 	title:'吃饭睡觉',
    // 	ischecked:false
    // },
    //  {
    //  	title:'打豆豆',
    //  	ischecked:false
    //  }
];
new Vue({
    el:".main",
    data:{
    	list:list,
    	todo:"",
    	edtorTodos:""
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
    	}
    }
});