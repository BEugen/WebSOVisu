
function drawChart(obj, url, bind) {
    $.ajax(
        {
            url: url,
            data: {
                id: obj
            },
            timeout: 600000,
            type: 'POST',
            beforeSend: function () {
            },
            success: function (data) {
                var w = $("#cc_" + data.id).innerWidth() - 15;
                var h = $("#cc_" + data.id).innerHeight() - 5;
                $("#cht_" + data.id).width(w).height(h);
                $.plot("#cht_" + data.id, data.FlotData, data.FlotOpt);
                $(".legend>table").css({ top: 16 });
                if (!bind) {
                    $("#cht_" + data.id).bind("plothover", function (event, pos, item) {
                        if (item) {
                            var x = item.datapoint[0],
                                y = item.datapoint[1].toFixed(1);

                            $("#tooltip").html(item.series.label + ":" + formatTime(x) + " = " + y)
                                .css({ top: item.pageY + 5, left: item.pageX - 150 })
                                .fadeIn(200);
                        } else {
                            $("#tooltip").hide();
                        }
                    });
                    bind = true;
                }
                window.setTimeout(function () {
                    drawChart(obj, url, bind);
                }, 600000);
            },
            error: function() {
                window.setTimeout(function () {
                    drawChart(obj, url, bind);
                }, 600000);
            }
        });
}

function drawtriangle(data) {
    var cnv = $("#triangle");
    var w = $("#dv_triangle").innerWidth();
    var h = $("#dv_triangle").innerHeight();
    if (h > w) {
        h = w;
    } else {
        w = h;
    }
    var x = w *.5;
    var y = h *.5;
    var l = x*0.9
    $("#dv_triangle").width(w).height(h)
    cnv.width(w).height(h);
    cnv.attr('width', w).attr('height', h);
    var context = cnv.get(0).getContext('2d');
    var angle1 = 270 * (Math.PI / 180);
    var angle2 = 150 * (Math.PI / 180);
    var angle3 = 30 * (Math.PI / 180);

    var k = 0.3;
    var ks1 = 2.3;
    var ks2 = 1.6;
    context.beginPath();
    context.moveTo(3*k*l*Math.cos(angle1) + x, 3*k*l*Math.sin(angle1) + y);
    context.lineTo(3*k*l*Math.cos(angle2) + x, 3*k*l*Math.sin(angle2) + y);
    context.lineTo(3*k*l*Math.cos(angle3) + x, 3*k*l*Math.sin(angle3) + y);
    context.fillStyle = 'rgba(255, 17, 31, 0.15)';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'rgba(255, 17, 31, 0.15)';
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(ks1*k*l*Math.cos(angle1) + x, ks1*k*l*Math.sin(angle1) + y);
    context.lineTo(ks1*k*l*Math.cos(angle2) + x, ks1*k*l*Math.sin(angle2) + y);
    context.lineTo(ks1*k*l*Math.cos(angle3) + x, ks1*k*l*Math.sin(angle3) + y);
    context.fillStyle = 'rgba(255, 255, 255, 1.0)';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'rgba(255, 255, 255, 1.0)';
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(ks1*k*l*Math.cos(angle1) + x, ks1*k*l*Math.sin(angle1) + y);
    context.lineTo(ks1*k*l*Math.cos(angle2) + x, ks1*k*l*Math.sin(angle2) + y);
    context.lineTo(ks1*k*l*Math.cos(angle3) + x, ks1*k*l*Math.sin(angle3) + y);
    context.fillStyle='#ffffff'
    context.fillStyle = 'rgba(255, 110, 0, 0.1)';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'rgba(255, 110, 0, 0.1)';
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(ks2*k*l*Math.cos(angle1) + x, ks2*k*l*Math.sin(angle1) + y);
    context.lineTo(ks2*k*l*Math.cos(angle2) + x, ks2*k*l*Math.sin(angle2) + y);
    context.lineTo(ks2*k*l*Math.cos(angle3) + x, ks2*k*l*Math.sin(angle3) + y);
    context.fillStyle = 'rgba(255, 255, 255, 1.0)';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'rgba(255, 255, 255, 1.0)';
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(ks2*k*l*Math.cos(angle1) + x, ks2*k*l*Math.sin(angle1) + y);
    context.lineTo(ks2*k*l*Math.cos(angle2) + x, ks2*k*l*Math.sin(angle2) + y);
    context.lineTo(ks2*k*l*Math.cos(angle3) + x, ks2*k*l*Math.sin(angle3) + y);
    context.fillStyle = 'rgba(26, 255, 7, 0.1)';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'rgba(26, 255, 7, 0.1)';
    context.stroke();
    context.closePath();


    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(l*Math.cos(angle1) + x, l*Math.sin(angle1) + y)
    context.lineWidth = 3;
    context.fillStyle = '#525457';
    context.strokeStyle = '#525457';
    context.stroke();
    context.closePath();
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(l*Math.cos(angle2) + x, l*Math.sin(angle2) + y)
    context.lineWidth = 3;
    context.fillStyle = '#525457';
    context.strokeStyle = '#525457';
    context.stroke();
    context.closePath();
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(l*Math.cos(angle3) + x, l*Math.sin(angle3) + y)
    context.lineWidth = 3;
    context.fillStyle = '#525457';
    context.strokeStyle = '#525457';
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(drawgazoanalizators(data.ug, k, ks1, ks2, l)*Math.cos(angle1) + x,
        drawgazoanalizators(data.ug, k, ks1, ks2, l)*Math.sin(angle1) + y);
    context.lineTo(drawgazoanalizators(data.n, k, ks1, ks2, l)*Math.cos(angle2) + x,
        drawgazoanalizators(data.n, k, ks1, ks2, l)*Math.sin(angle2) + y);
    context.lineTo(drawgazoanalizators(data.m, k, ks1, ks2, l)*Math.cos(angle3) + x,
        drawgazoanalizators(data.m, k, ks1, ks2, l)*Math.sin(angle3) + y);
     context.lineTo(drawgazoanalizators(data.ug, k, ks1, ks2, l)*Math.cos(angle1) + x,
        drawgazoanalizators(data.ug, k, ks1, ks2, l)*Math.sin(angle1) + y);
    context.lineWidth = 3;
    context.strokeStyle = '#4d4fff';
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(drawgazoanalizators_n(data.n_ug, data.v_ug, k, ks1, ks2, l)*Math.cos(angle1) + x,
        drawgazoanalizators_n(data.n_ug, data.v_ug, k, ks1, ks2, l)*Math.sin(angle1) + y);
    context.lineTo(drawgazoanalizators_n(data.n_n, data.v_n, k, ks1, ks2, l)*Math.cos(angle2) + x,
        drawgazoanalizators_n(data.n_n, data.v_n, k, ks1, ks2, l)*Math.sin(angle2) + y);
    context.lineTo(drawgazoanalizators_n(data.n_m, data.v_m, k, ks1, ks2, l)*Math.cos(angle3) + x,
        drawgazoanalizators_n(data.n_m, data.v_m, k, ks1, ks2, l)*Math.sin(angle3) + y);
     context.lineTo(drawgazoanalizators_n(data.n_ug, data.v_ug, k, ks1, ks2, l)*Math.cos(angle1) + x,
        drawgazoanalizators_n(data.n_ug, data.v_ug, k, ks1, ks2, l)*Math.sin(angle1) + y);
    context.lineWidth = 3;
    context.strokeStyle = '#ff0110';
    context.stroke();
    context.closePath();
    cnv.show()

}

function drawgazoanalizators(analiz, k, ks1, ks2, l)
{
    if(analiz <  0.3)
    {
        return (ks2*k*l / 0.4) * (analiz + 0.1);
    }
    if(analiz >= 0.3 && analiz < 0.5)
    {
        return (analiz - 0.3)*(ks1*k*l - ks2*k*l)/0.2 + ks2*k*l;
    }
    if(analiz > 0.5)
    {
        if(analiz > 1.5)
            analiz = 1.5;
        return (analiz - 0.5)* (3*k*l - ks1*k*l) + ks1*k*l;
    }
}
function drawgazoanalizators_n(analiz, v, k, ks1, ks2, l)
{
    if(analiz == 0)
    {
        return ks2*k*l* v;
    }
    if(analiz == 1)
    {
        return (ks1*k*l - ks2*k*l)* v + ks2*k*l;
    }
    if(analiz == 2)
    {
        return (3*k*l - ks1*k*l)* v + ks1*k*l;
    }
}

function drawArc(max, min, val, obj, typep, eu) {
    var cnv = $("#cnv_" + obj);
    var w = cnv.width();
    var h = cnv.height();
    var wind = w * 0.55;
    var hind = h * 0.20;
    var position = cnv.position();
    var ind = $("#ind_g_" + obj);
    ind.width(wind).height(hind);
    ind.attr('width', wind).attr('height', hind);
    ind.text(typep + " = ???" + eu);
    ind.css("top", position.top + h - hind);
    ind.css("left", position.left + w * 0.5 - wind * 0.5);
    ind.show();
    cnv = $("#ar_" + obj);
    cnv.width(w).height(h);
    cnv.attr('width', w).attr('height', h);
    cnv.offset({ top: position.top, left: position.left });
    var arcForData = 1.5 * Math.PI / (max - min);
    var offset = 1.75 * Math.PI - arcForData * min;
    var rs = 0;
    if (w > h) {
        rs = h / 2;
    } else {
        rs = w / 2;
    }
    rs -= 6;
    rs = rs - rs * 0.1;
    var offsetArc = rs * 0.2;
    var context = cnv.get(0).getContext('2d');
    context.clearRect(0, 0, w, h);
    context.translate(w / 2, h / 2);
    context.rotate(val * arcForData + offset);
    context.beginPath();
    context.moveTo(-rs, 0);
    context.lineTo(offsetArc, h * 0.045);
    context.lineTo(0, 0);
    context.lineTo(offsetArc, -h * 0.045);
    context.lineTo(-rs, 0);
    context.fillStyle = '#F2F2F2';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#d2691e';
    context.stroke();
    context.closePath();
    cnv.show();
}



function gettriangle(url, token) {
    $.ajax(
        {
            url: url,
            data: {
                id: 0, 'csrfmiddlewaretoken': token
            },
            dataType: 'json',
            timeout: 10000,
            type: 'POST',
            beforeSend: function () {
            },
            success: function (data) {
                drawtriangle(data);
                window.setTimeout(function () {
                    gettriangle(url, token);
                }, 5000);
            },
            error: function () {
                window.setTimeout(function () {
                    gettriangle(url, token);
                }, 5000);
            }
        });
}

function formatTime(mseconds) {
    var time = new Date(mseconds);
    var mon = time.getMonth() + 1;
    var minut = time.getMinutes();
    var second = time.getSeconds();
    if (mon <= 9) {
        mon = "0" + mon;
    }
    if (minut <= 9)
        minut = "0" + minut;
    if (second <= 9)
        second = "0" + second;
    var clockf = " " + time.getUTCDate() + "." + mon + "." + time.getFullYear() + " " + time.getUTCHours() + ":" + minut;
    return clockf;
}