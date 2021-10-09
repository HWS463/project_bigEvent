$(function () {
    $('#links_reg').on('click', function () {
        $('.loginBox').hide()
        $('.regBox').show()
    })
    $('#links_login').on('click', function () {
        $('.regBox').hide()
        $('.loginBox').show()
    })
    //获取layui表单对象
    var form = layui.form
    //获取layui中的layer对象
    var layer = layui.layer
    //通过form.verify自定义校验规则
    form.verify({
        //自定义一个psd校验规则，密码长度要在6-12位
        psd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //自定义一个验证两次输入的密码是否一致
        repsd:function(value){
            //value：表单的值、item：表单的DOM对象
            var psd = $('.regBox [name=password]').val()
            if(psd!==value){
                return '两次密码输入不一致'
                
            }
        }
    })


    //监听注册表单的submit事件
    $('#regForm').on('submit',function(e){
        //阻止表单自动提交
        e.preventDefault()
        $.post('http://api-breakingnews-web.itheima.net/api/reguser',{username:$('.regBox [name=username]').val(),password:$('.regBox [name=password]').val()},function(res){
            if(res.status !== 0){
               return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录')
        //请求成功后，自动跳转到登录页面
        $('#links_login').click()
        })
    })
    //监听登录表单的submit事件
    $('#loginForm').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            //快速获取表单数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                   return layer.mes('登录失败')
                }
                layer.msg('登录成功')
                //将登录成功得到的token字符串保存到localStorage
                localStorage.setItem('token',res.token)
                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})