$(function () {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()

    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()

    })
    //从layui中获取form对象
    var form = layui.form
    var layer =layui.layer
    //通过form.verify()函数自定义校验规则
    form.verify({
        'pwd':[/^[\S]{6,12}$/,
            '密码必须6到12位，且不能为空格'],
        'repwd':function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !==value){
                return '两次密码不一致'
            }
        }
    })
    //监听注册表单的提交数据
    $('#form_reg').on('submit',function (e) {
        e.preventDefault()
        var data =  {username: $('#form_reg [name=username]').val(),password: $('#form_reg [name=password]').val()}
        $.post('/api/reguser',
            data,
            function (res) {
            if(res.status !==0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功了，请登录！')
            $('#link_login').click()

        })
    })

    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            //快速获取表单中的数据
            data:$(this).serialize(),
            success:function (res) {
                if(res.status !==0){
                    return layer.msg(res.message)
                }
                layer.msg('登录成功了！')
                //将登录成功的token值保存到localStorage
                localStorage.setItem('token',res.token)
                location.href = 'index.html'
            }
        })
    })
})