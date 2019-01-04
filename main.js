window.jQuery = function (nodesOrSelector) {
    let nodes = {}
    nodes.addClass = function () { }
    nodes.removeClass = function () { }
    return nodes
}
window.$ = window.jQuery

function f1(responseText){
    console.log(responseText)
}
function f2(responseText){
    console.log(responseText)
}
testBtn.onclick = function () {
    $.ajax(
        {
            url: '/xxx',
            method: 'POST',
            body: 'a=1&b=2',
            successFn: (responseText) => { console.log('我是成功后的回调函数');f1(responseText);f2(responseText);},
            failFn: () => { console.log('我是失败后的回调函数') },
            header: { 'yang': 18, 'Content-Type': 'application/x-www-form-urlencoded' }
        })
}
window.jQuery.ajax = function ({url,method,body,successFn,failFn,header}) {  
    let request = new XMLHttpRequest()
    request.open(method, url)
    for (let key in header) {
        let value = header[key]
        request.setRequestHeader(key, value)
    }
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                console.log('请求成功')
                successFn.call(undefined,request.responseText)
            } else if (request.status >= 400) {
                console.log('请求失败')
                failFn.call(undefined,request.responseText)
            }
        }
    }
    request.send(body)
}