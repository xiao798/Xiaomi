        // $(function () {
        //     var index = 0;
        //     setInterval(function () {
        //         index++;
        //         $(".box-img").css("opacity","0");
        //         $(".box-img").eq(index).css("opacity","1");
        //     },3000)
        // })
        // var number = 1;
        // function  fun(){
        //     number++;
        //     if (number>5){
        //         number=1;
        //     }
        //     var img1 =document.getElementById("img1");
        //     img1.src="img/newlunbo"+number+".jpg";
        // }
        // setInterval(fun,3000);

        function animater(obj,target,callback) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var step = (target - obj.offsetLeft)/10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.offsetLeft == target){
                    clearInterval(obj.timer);
                    // if (callback){
                    //     callback();
                    // }
                    callback && callback();
                }
                obj.style.left = obj.offsetLeft + step +'px';
            },15);

        }




        window.addEventListener('load',function () {
            var box_left = document.querySelector('.box-left');
            var box_right = document.querySelector('.box-right');
            var site_slider = document.querySelector(".site_slider");
            var sitewidth = site_slider.offsetWidth;
            site_slider.addEventListener('mouseenter',function () {
                box_left.style.display = 'block';
                box_right.style.display = 'block';
                clearInterval(timer);
                timer = null;
            })
            site_slider.addEventListener('mouseleave',function () {
                box_left.style.display = 'none';
                box_right.style.display = 'none';
                timer = setInterval(function () {
                    box_right.click();
                },2000);
            })
            var ul = site_slider.querySelector('ul');
            var ol = site_slider.querySelector('ol');
            for (var i = 0; i<ul.children.length; i++){
                var li = document.createElement('li');//????????????
                li.setAttribute('index',i);
                ol.appendChild(li);//????????????
                li.addEventListener('click',function () {
                    for (var i =0;i<ol.children.length; i++){
                        ol.children[i].className = '';
                    }
                    this.className = 'current';
                    var index = this.getAttribute('index');
                    num = index;

                    circle = index;
                    // var sitewidth = site_slider.offsetWidth;
                    console.log(sitewidth);
                    animater(ul,-index *sitewidth );
                })
            }
            ol.children[0].className = 'current';
            //????????????????????????????????????
            var first = ul.children[0].cloneNode(true);
            ul.appendChild(first);

            //????????????????????????
            var num = 0;
            var circle = 0;
            var flag = true;

            box_right.addEventListener('click',function () {
                //???????????????????????????????????????????????????ulleft???????????????
                if (flag){
                    flag = false;
                    if(num == ul.children.length - 1){
                        ul.style.left = 0;
                        num = 0;
                    }
                    num++;
                    animater(ul,-num * sitewidth,function () {
                        flag = true;//???????????????
                    });

                    circle++;
                    if (circle == 5){
                        circle =0;
                    }
                    for (var i = 0; i<ol.children.length;i++){
                        ol.children[i].className = '';
                    }
                    ol.children[circle].className = 'current';
                }

            });


            box_left.addEventListener('click',function () {
                //???????????????????????????????????????????????????ulleft???????????????
                if(flag){
                    flag = false;
                    if(num == 0){
                        num = ul.children.length -1;
                        ul.style.left = -num*sitewidth+'px';

                    }
                    num--;
                    animater(ul,-num * sitewidth,function () {
                        flag = true;
                    });

                    circle--;
                    if (circle <0){
                        circle = ol.children.length - 1;
                    }
                    for (var i = 0; i<ol.children.length;i++){
                        ol.children[i].className = '';
                    }
                    ol.children[circle].className = 'current';

                }

            });

            var timer = setInterval(function () {//????????????????????????
                box_right.click();
            },2000);
        })