/* eslint-disable no-constant-condition */
// #taken from here https://github.com/simplesmiler/vue-clickaway
import Vue from 'vue/dist/vue'

let HANDLER = '_vue_clickaway_handler'

function checkPassiveSupport () {
  let supportsPassive = false
  try {
    let opts = Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true
      }
    })
    window.addEventListener('testPassive', null, opts)
    window.removeEventListener('testPassive', null, opts)
  } catch (e) {}

  return supportsPassive
}

function bind (el, binding, vnode) {
  unbind(el)

  let vm = vnode.context

  let callback = binding.value
  if (typeof callback !== 'function') {
    if ('development' !== 'production') {
      Vue.util.warn(
        'v-' + binding.name + '="' +
        binding.expression + '" expects a function value, ' +
        'got ' + callback
      )
    }
    return
  }

  // @NOTE: Vue binds directives in microtasks, while UI events are dispatched
  //        in macrotasks. This causes the listener to be set up before
  //        the "origin" click event (the event that lead to the binding of
  //        the directive) arrives at the document root. To work around that,
  //        we ignore events until the end of the "initial" macrotask.
  // @REFERENCE: https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
  // @REFERENCE: https://github.com/simplesmiler/vue-clickaway/issues/8
  let initialMacrotaskEnded = false
  setTimeout(function () {
    initialMacrotaskEnded = true
  }, 0)

  el[HANDLER] = function (ev) {
    // @NOTE: this test used to be just `el.contains`, but working with path is better,
    //        because it tests whether the element was there at the time of
    //        the click, not whether it is there now, that the event has arrived
    //        to the top.
    // @NOTE: `.path` is non-standard, the standard way is `.composedPath()`
    let panel = document.getElementById('alpheios-panel-inner') ? document.getElementById('alpheios-panel-inner') : null
    let popup = document.getElementById('alpheios-popup-inner') ? document.getElementById('alpheios-popup-inner') : null

    let visible = function (elem) {
      return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length)
    }

    // if neither the popup nor the panel are visible, stop the check
    if (panel && !visible(panel) && popup && !visible(popup)) {
      return
    }

    let path = ev.path || (ev.composedPath ? ev.composedPath() : undefined)

    // checkStep1 checks if a click was not inside the component with v-on-clickaway event
    let checkStep1 = initialMacrotaskEnded && (path ? path.indexOf(el) < 0 : !el.contains(ev.target))

    // checkStep2 checks if a click was not inside the inner panel
    let checkStep2 = path ? path.indexOf(panel) < 0 : true

    // checkStep3 checks if a click was not inside the inner popup
    let checkStep3 = path ? path.indexOf(popup) < 0 : true

    if (checkStep1 && checkStep2 && checkStep3) {
      return callback.call(vm, ev)
    }
  }

  document.documentElement.addEventListener('click', el[HANDLER], checkPassiveSupport() ? { passive: true } : false)
  // document.documentElement.addEventListener('click', el[HANDLER], false)
}

function unbind (el) {
  document.documentElement.removeEventListener('click', el[HANDLER], false)
  delete el[HANDLER]
}

export let directive = {
  bind: bind,
  update: function (el, binding) {
    if (binding.value === binding.oldValue) return
    bind(el, binding)
  },
  unbind: unbind
}
