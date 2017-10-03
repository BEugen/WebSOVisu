
function drawChart(id, url, bind, options, token) {
    $.ajax(
        {
            url: url,
            data: {
                id: id, 'csrfmiddlewaretoken': token
            },
            timeout: 300000,
            type: 'POST',
            beforeSend: function () {
            },
            success: function (data) {
                $.plot("#ch_" + id, data, options);
                if (!bind) {
                    $("#ch_" + id).bind("plothover", function (event, pos, item) {
                        if (item) {
                            var x = item.datapoint[0],
                                y = item.datapoint[1].toFixed(2);

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
                    drawChart(id, url, bind, options, token);
                }, 300000);
            },
            error: function() {
                window.setTimeout(function () {
                    drawChart(id, url, bind, options, token);
                }, 300000);
            }
        });
}

function drawtriangle(data) {
    var cnv = $("#triangle");
    var triangle = $("#dv_triangle");
    var w = triangle.innerWidth();
    var h = triangle.innerHeight();
    if (h > w) {
        h = w;
    } else {
        w = h;
    }
    var x = w *.5;
    var y = h *.5;
    var l = x*0.95;
    triangle.width(w).height(h);
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
    context.fillStyle = 'rgba(208, 75, 118, 0.6)';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'rgba(208, 78, 118, 0.6)';
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
    context.fillStyle='#ffffff';
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
    context.fillStyle = 'rgba(26, 255, 7, 0.25)';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'rgba(26, 255, 7, 0.25)';
    context.stroke();
    context.closePath();


    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(l*0.95*Math.cos(angle1) + x, l*0.95*Math.sin(angle1) + y);
    context.lineWidth = 3;
    context.fillStyle = '#525457';
    context.strokeStyle = '#525457';
    context.stroke();
    context.closePath();
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(l*0.95*Math.cos(angle2) + x, l*0.95*Math.sin(angle2) + y);
    context.lineWidth = 3;
    context.fillStyle = '#525457';
    context.strokeStyle = '#525457';
    context.stroke();
    context.closePath();
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(l*0.95*Math.cos(angle3) + x, l*0.95*Math.sin(angle3) + y);
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
    context.strokeStyle = '#218EFF';
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
    context.strokeStyle = '#42A831';
    context.stroke();
    context.closePath();
    drawvalue(context, data, x, y, l, w, h);
    cnv.show()

}

function drawvalue(cont, data, x, y, l, w, h)
{
    var angle1 = 272 * (Math.PI / 180);
    var angle2 = 140 * (Math.PI / 180);
    var angle3 = 40 * (Math.PI / 180);
    cont.fillStyle = getcolor(data.ug);
    var x1 = l*Math.cos(angle1) + x;
    var y1 = l*Math.sin(angle1) + y;
    var w1 = w*0.15;
    var h1 = h*0.05;
    cont.fillRect(x1, y1, w1, h1);
    cont.strokeStyle = '#efeeef';
    cont.lineWidth = 1;
    cont.strokeRect(x1, y1, w1, h1);
    cont.font = w*0.04 + "pt Verdana";
    cont.fillStyle = '#efeeef';
    cont.fillText(data.ug_q >= 192? data.ug : '???', x1 + 3, y1 + h1*0.9);
    cont.fillText('УГМС', x1 - h1*3.5, y1 + h1*0.9);

    ll = l*0.77;
    var x2 = ll*Math.cos(angle2) + x;
    var y2 = ll*Math.sin(angle2) + y;
    var w2 = w*0.15;
    var h2 = h*0.05;
    cont.fillStyle = getcolor(data.n);
    cont.fillRect(x2, y2, w2, h2);
    cont.strokeStyle = '#efeeef';
    cont.lineWidth = 1;
    cont.strokeRect(x2, y2, w2, h2);
    cont.fillStyle = '#efeeef';
    cont.fillText(data.n_q >= 192? data.n : '???', x2 + 3, y2 + h2*0.9);
    cont.fillText('Нагор.', x2 - h2*4, y2 + h2*0.9);

    ll = l*0.78;
    var x3 = ll*Math.cos(angle3) + x;
    var y3 = ll*Math.sin(angle3) + y;
    var w3 = w*0.15;
    var h3 = h*0.05;
    cont.fillStyle = getcolor(data.m);
    cont.fillRect(x3, y3, w3, h3);
    cont.strokeStyle = '#efeeef';
    cont.lineWidth = 1;
    cont.strokeRect(x3, y3, w3, h3);
    cont.fillStyle = '#efeeef';
    cont.fillText(data.m_q >= 192? data.m : '???', x3 + 3, y3 + h3*0.9);
    cont.fillText('Молод.', x3 - h3*4, y3 + h3*0.9);
}
function getcolor(val)
{
    if (val < 0.3)
        return 'rgba(26, 255, 7, 0.3)';
    if(val >=0.3 && val < 0.5)
        return 'rgba(255, 110, 0, 0.3)';
    return 'rgba(255, 17, 31, 0.15)';
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
    if(analiz === 0)
    {
        return ks2*k*l* v;
    }
    if(analiz === 1)
    {
        return (ks1*k*l - ks2*k*l)* v + ks2*k*l;
    }
    if(analiz === 2)
    {
        return (3*k*l - ks1*k*l)* v + ks1*k*l;
    }
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
    return " " + time.getUTCDate() + "." + mon + "." + time.getFullYear() + " " + time.getUTCHours() + ":" + minut;
}