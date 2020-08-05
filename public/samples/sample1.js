var app = new Vue({
    // element, id选择器
    el: '#app',
    // 数据
    data: {
        name: 'Bob',
        message: ' to Vue' 
    }
})

/*
 *  绑定数据对象
 */
data = {
    name: 'Name1',
    message: 'Message1',
    question: '',
    answer: 'I cannot give you an answer until you ask a question!',
    image_url: ''
}
var app2 = new Vue({
    // element, id选择器
    el: '#app2',
    // 数据
    data: data,
    watch: {
        // 如果 `question` 发生改变，这个函数就会运行
        question: function (newQuestion, oldQuestion) {
            this.answer = 'Waiting for you to stop typing...'
            this.debouncedGetAnswer()
        },
        name: function(newVal, oldVal) {
            console.log(newVal, oldVal);
        }
    },
    created: function () {
        // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
        // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
        // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
        // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
        // 请参考：https://lodash.com/docs#debounce
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
    },
    methods: {
        getAnswer: function () {
        if (this.question.indexOf('?') === -1) {
            this.answer = 'Questions usually contain a question mark. ;-)'
            return
        }
        this.answer = 'Thinking...';
        var vm = this;
        axios.get('https://yesno.wtf/api')
            .then(function (response) {
                vm.answer = _.capitalize(response.data.answer);
                vm.image_url = response.data.image

            })
            .catch(function (error) {
                vm.answer = 'Error! Could not reach the API. ' + error
            });
        }
    }
})

/*
 *  变更监听器
 */
app2.$watch('name', function(newVal, oldVal) {
    console.log(newVal, oldVal);
})
data.name = 'New-Name'

/*
 * 生命周期
 */
var app3 = new Vue({
    el: '#app3',
    data: {
        msg: "hi vue",
    },

    // 在实例初始化之后，数据观测(data observer)和event/watcher事件配置之前被调用
    beforeCreate: function() {
        console.log('beforeCreate');
    },

    // 在实例创建完成后被立即调用。在这一步，实例已经完成以下的配置：数据观测(data observer)，属性和方法的运算，event/watcher事件回调。然后挂载阶段还没开始，$el属性不可见。
    created: function() {
        console.log('created');
    },

    // 在挂载开始之前被调用：相关的渲染函数首次被调用
    beforeMount: function() {
        console.log('beforeMount');
    },

    // EL被新创建的 vm.$el 替换，挂载成功
    mounted: function() {
        console.log('mounted');
    },

    // 数据更新时调用
    beforeUpdate: function() {
        console.log('beforeUpdate');
    },

    // 组件DOM已经更新，组件更新完毕
    updated: function() {
        console.log('updated');
    },

    beforeDestroy: function() {
        console.log('beforeDestroy');
    },

    destroyed: function() {
        console.log('destroyed');
    },
});

setTimeout(function() {
    app3.msg = "change ......";
}, 3000);

/*
 * 模板语法-插值，为HTML绑定属性
 */
var app4 = new Vue({
    // element, id选择器
    el: '#app4',
    // 数据
    data: {
        rawHtml: '<span style="color:red">this should be red</span>',
        dynamicId: 123,
        color: 'red',
        number: 10,
        ok: true,
        message: "Vue",
    },
    computed: {
        // 计算属性的 getter
        // 计算属性是基于它们的响应式依赖进行缓存的，只在相关响应式依赖发生改变时它们才会重新求值。
        reversedMessage: function() {
            // `this` 指向 vm 实例
            return this.message.split('').reverse().join('')
        }
    }
})

/*
 * 模板语法-指令
 */
var app5 = new Vue({
    // element, id选择器
    el: '#app5',
    // 数据
    data: {
        seen: true,
        url: "https://cn.vuejs.org/v2/guide/"
    },
    methods: {
        click1: function() {
            console.log('click1 ......');
        },
        click2: function() {
            console.log('click2 ......');
        },
    }
})

/*
 * class与style绑定
 */
var app6 = new Vue({
    // element, id选择器
    el: '#app6',
    // 数据
    data: {
        isActive: true,
        isGreen: true,
        color: '#FF0000',
        size: '50px'
    }
})

/*
 * 条件渲染
 */
var app7 = new Vue({
    // element, id选择器
    el: '#app7',
    // 数据
    data: {
        type: "A",
        ok: true,
        loginType: 'username'
    },
    methods: {
        switchLoginType: function() {
            if(this.loginType == 'username') {
                this.loginType = 'email';
            } else {
                this.loginType = 'username';
            }
        }
    }
})

/*
 * 列表渲染
 */
var app8 = new Vue({
    // element, id选择器
    el: '#app8',
    // 数据
    data: {
        items: [
            { message: 'Foo' },
            { message: 'Bar' }
        ],
        object: {
            title: 'How to do lists in Vue',
            author: 'Jane Doe',
            publishedAt: '2016-01-01'
        }
    }
})

// 变异方法 (mutation method)
// push() pop() shift() unshift() splice() sort() reverse()
// app8.items.push({ message: 'Baz' })
// 替换数组
// app8.items = app8.items.filter(function (item) {
//     return !item.message.match(/Foo/)
// })


Vue.component('todo-item', {
    template: '\
        <li>\
        {{ title }}\
        <button v-on:click="$emit(\'remove\')">Remove</button>\
        </li>\
    ',
    props: ['title']
    })

var app8_1 = new Vue({
    el: '#todo-list-example',
    data: {
        newTodoText: '',
        todos: [
        {
            id: 1,
            title: 'Do the dishes',
        },
        {
            id: 2,
            title: 'Take out the trash',
        },
        {
            id: 3,
            title: 'Mow the lawn'
        }
        ],
        nextTodoId: 4
    },
    methods: {
        addNewTodo: function () {
        this.todos.push({
            id: this.nextTodoId++,
            title: this.newTodoText
        })
        this.newTodoText = ''
        }
    }
})

/*
 * 事件绑定
 */
var app9 = new Vue({
    // element, id选择器
    el: '#app9',
    // 数据
    data: {
        counter: 0,
        name: "Vue"
    },
    methods: {
        func_great: function(str, event) {
            alert(this.name);
            alert(str);
            console.log(event)
        },
        great: function(event) {
            // event 是原生 DOM 事件
            if (event) {
                alert(event.target.tagName);
            }
        },
        doThis: function(event) {
            alert('doThis');
        },
        doThat: function(event) {
            alert('doThat');
        },
        submit: function(event) {
            alert('submit');
        }
    }
})

/*
 * 表单输入绑定
 */
var app10 = new Vue({
    // element, id选择器
    el: '#app10',
    // 数据
    data: {
        message: "",
        message2: "",
        checkedNames: ['Mike'],
        picked: '',
        selected: 'A',
        select_options: [
			{ text: 'One', value: 'A' },
			{ text: 'Two', value: 'B' },
			{ text: 'Three', value: 'C' }
        ],
        msg: " hello ",
        age: 12
    },
    methods: {
        submit: function() {
            console.log(this.message);
            var postObj = {
                msg1: this.message,
                msg2: this.message2,
                names: this.checkedNames
            }
            console.log(postObj);
        }
    }
})

/*
 * 组件基础
 */
Vue.component('button-counter', {
    props: [
        'title'
    ],
//     props: {
//         // 每个 prop 都有指定的值类型
//         title: String,
//         likes: Number,
//         isPublished: Boolean,
//         commentIds: Array,
//         author: Object,
//         callback: Function
//     },
    data: function() {
        return {
            counter: 0
        }
    },
    template: '\
        <div> \
            <h1>Hi Vue</h1> \
            <button v-on:click="clickfun">{{title}} You clicked me {{counter}} times.</button> \
            <button v-on:click="counter++">{{title}} You clicked me {{counter}} times.</button> \
            <slot></slot> \
        </div>',
    methods: {
        clickfun: function() {
            this.counter++;
            // 触发事件
            this.$emit('clicknow', this.counter);
        }
    }
})
var app11 = new Vue({
    // element, id选择器
    el: '#app11',
    // 数据
    data: {

    },
    methods: {
        clicknow: function(e) {
            console.log(e);
        }
    }
})

Vue.component('blog-post', {
	props: ['post'],
	template: ' \
	<div class="blog-post"> \
		<h3> {{ post.title }} </h3> \
		<input v-bind:value="post.content" v-on:input="$emit(\'input\', $event.target.value)"> \
		<button v-on:click="$emit(\'enlarge-text\')">Enlarge text</button> \
		<button v-on:click="$emit(\'enlarge-text2\', 0.1)">Enlarge text 2</button> \
		<div v-html="post.content"></div> \
		<slot></slot> \
	</div>'
})
var appBlog = new Vue({
	el: '#blog-post-demo',
	data: {
		posts: [
			{ id: 1, title: 'My journey with Vue', content: 'content1' },
			{ id: 2, title: 'Blogging with Vue', content: 'content2' },
			{ id: 3, title: 'Why Vue is so fun', content: 'content3' }
		],
		postFontSize: 1
	},
	methods: {
		onEnlargeText: function(enlargeAmount) {
			this.postFontSize += enlargeAmount;
		}
	}
})

/*
 * 组件注册
 */
Vue.component('button-counter2', {
    props: [
        'title'
    ],
    data: function() {
        return {}
    },
    template: '\
        <div> \
            <h1>{{title}} Hi Vue ...</h1> \
        </div>',
    methods: {
    }
})
var app12 = new Vue({
    // element, id选择器
    el: '#app12',
    // 数据
    data: {

    },
    methods: {
        clicknow: function(e) {
            console.log(e);
        }
    },
    components: {
        test: {
            template: "<h2>h2 ....</h2>"
        }
    }
})

/*
 * Prop
 */
 Vue.component('blog-post2', {
	props: {
        // 每个 prop 都有指定的值类型
        title: String,
        content: String,
        likes: Number,
        isPublished: Boolean,
        commentIds: Array,
        author: Object,
        callback: Function
	},
	template: ' \
	<div class="blog-post2"> \
		<h3> {{ title }} {{ author }} </h3> \
		<h4> likes={{ likes }} isPublished={{ isPublished }}</h4> \
		<input v-bind:value="content"> \
		<div v-html="content"></div> \
		<h4> commentIds={{ commentIds }} </h4> \
		<slot></slot> \
	</div>'
})

var app13 = new Vue({
    // element, id选择器
    el: '#app13',
    // 数据
    data: {
		post: {
			title: 'MyTitle1',
			content: 'MyContent1',
			author: {					// 传入一个对象
				name: 'Veronica',
				company: 'Veridian Dynamics'
			},
			likes: 42,					// 传入一个数字
			isPublished: true,			// 传入一个布尔值
			commentIds: [234, 266, 273]	// 传入一个数组
		}
    },
    methods: {

    }
})