import Vue from '../../node_modules/vue/dist/vue.esm';

window.containerID = "wext-container";
window.wextContainer = document.querySelector('#' + window.containerID);
if (!window.wextContainer) {
    // If element does not exist, create it.
    window.wextContainer = document.createElement('div');
    window.wextContainer.id = window.containerID;
    window.wextContainer.innerHTML = '{{ message }}';
    window.wextContainer.classList.add('wext-container');
    document.body.appendChild(window.wextContainer);
    console.log('created');
    window.testApp = new Vue({
        el: '#' + window.containerID,
        data: {
            counter: 1
        },
        computed: {
            // a computed getter
            message: function () {
                // `this` points to the vm instance
                return 'This is a test message from Vue!';
            }
        }
    });
}
else {
    // Container exists, show it
    console.log('showing');
    //console.log(window.testApp.data.counter);
    window.wextContainer.classList.remove('hidden');
}