//get data from scheme tube

async function getDataTube(root, url, token)
{
    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer',
        body: JSON.stringify({'csrfmiddlewaretoken': token})});
    let data = await response.json();
    return data;
}



getDataTube(root, url, token)
    .then((root, data) => drawDataTube(root, data));

function drawDataTube(root, data)
{
   $("#md_so2_txt", root).text(data.v_m);
   $("#md_so2_txt", root).text(data.n_m);
   $("#ng_so2_txt", root).text(data.v_n);
   $("#ng_so2_txt", root).text(data.n_n);
   $("#ugms_so2_txt", root).text(data.v_ug);
   $("#ugms_so2_txt", root).text(data.n_ug);
   drawText(root, data.v_m, data.m_q, "#md_so2");
   drawText(root, data.v_n, data.n_q, "#ng_so2");
   drawText(root, data.v_ug, data.ug_q, "#ugms_so2");
   drawText(root, data.n_m, data.m_n_q, "#md_so2_p");
   drawText(root, data.n_n, data.n_n_q, "#ng_so2_p");
   drawText(root, data.n_ug, data.ug_n_q, "#ugms_so2_p");
   drawAlarm(root, data.a_m, 'md');
   drawAlarm(root, data.a_n, 'ng');
   drawAlarm(root, data.a_u, 'ugms');
   drawAlarmPredict(root, data.a_m_p, 'md');
   drawAlarmPredict(root, data.a_n_p, 'ng');
   drawAlarmPredict(root, data.a_u_p, 'ugms');
}

function drawAlarm(root, val, prefix)
{
    if(val > 0)
   {
       if(val > 1)
       {
           $("#" + prefix + "_so2", root).css('fill', '#ff0042e3');
           $("#" + prefix + "_cloud", root).css('fill', '#ff0042e3');
           $("#" + prefix + "_tube", root).css('fill', 'url(#linearGradient3865)');
       }
       else
       {
           $("#" + prefix + "_so2", root).css('fill', '#ffc200e3');
           $("#" + prefix + "_cloud", root).css('fill', '#ffc200e3');
           $("#" + prefix + "_tube", root).css('fill', 'url(#linearGradient3873)');
       }
   }
   else
   {
      $("#" + prefix + "_so2", root).css('fill', '#20ff003d');
      $("#" + prefix + "_cloud", root).css('fill', '#20ff003d');
      $("#" + prefix + "_tube", root).css('fill', 'url(#linearGradient3288)');
   }
}
function drawAlarmPredict(root, val, prefix)
{
    if(val > 0)
   {
       if(val > 1)
       {
           $("#" + prefix + "_so2_p", root).css('fill', '#ff0042e3');
       }
       else
       {
           $("#" + prefix + "_so2_p", root).css('fill', '#ffc200e3');
       }
   }
   else
   {
      $("#" + prefix + "_so2_p", root).css('fill', '#20ff003d');
   }
}
function drawText(root, val, quality, prefix)
{
    if(quality > 192)
    {
       $("#" + prefix + "_txt", root).text(val);
    }
    else
    {
        $("#" + prefix + "_txt", root).text("?.????");
    }
}