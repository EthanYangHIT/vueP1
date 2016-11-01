import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const now = Date.now();
const store = new Vuex.Store({
    state: {
        user: {
            name: 'coffce',
            img: 'dist/images/1.jpg'
        },
        sessions: [
            {
                id: 1,
                user: {
                    name: '实例介绍',
                    img: 'dist/images/2.png'
                },
                messages: [
                    {
                        content: 'Hello,这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
                        date: now
                    }, {
                        content: '项目地址：https://github.com/EthanYangHIT/vueP1.git',
                        date: now
                    }
                ]
            }, {
                id: 2,
                user: {
                    name: 'webpack',
                    img: 'dist/images/3.jpg'
                },
                message: []
            }
        ],
        currentSessionId: 1,
        filterKey: ''
    },
    mutations: {
        INIT_DATA(state){
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.session = JSON.parse(data);
            }
        },
        SEND_MESSAGE({sessions,currentSessionId}, content){
            let session = sessions.find(item=> item.id === currentSessionId);
            session.messages.push({
                content: content,
                date: Date.now(),
                self: true
            });
        },
        SELECT_SESSION(state, id){
            state.currentSessionId = id;
        },
        SET_FILTER_KEY(state, value){
            state.filterKey = value;
        }
    }
});

store.watch(
    (state)=> state.sessions,
    (val)=> {
        console.log('CHANGE', val);
        localStorage.setItem('vue-chat-session', JSON.stringify(val));
    },
    {
        deep: true
    }
);

export default store;
export const actions = {
    initData: ({dispatch})=>dispatch('INIT_DATA'),
    sendMessage: ({dispatch}, content)=>dispatch('SEND_MESSAGE', content),
    selectSession: ({dispatch}, id)=>dispatch('SELECT_SESSION', id),
    search: ({dispatch}, value)=>dispatch('SET_FILTER_KEY', value)
};