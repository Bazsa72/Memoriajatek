let pos = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let find = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
let Count = [0,0,0,0,0,0,0,0];
let s1 = 0;
let s2 = 0;
let rep = 8;

function init(){
    //alert("Work");
    s1 = 0;
    s2 = 0;
    rep = 8;
    for (let index = 0; index < 8; index++) {
        Count[index] = 0;
    }
    for (let i = 0; i < 16; i++) {
        pos[i] = 0;
        find[i] = false;
    }
    //Képek elhelyezése
    for (let i = 0; i < 16; i++) {
        let next = false;
        do {
            let kep = Math.floor(Math.random() * 8) + 1;
            if (Count[kep - 1] != 2) {
                Count[kep - 1]++;
                pos[i] = kep;
                //let file = "Pictures/" + kep + ".png";
                //$("#" + (i + 1)).attr("src",file);
                $("#" + (i + 1)).attr("src","Pictures/q.png");
                $("#" + (i + 1)).removeClass("select");
                $("#" + (i + 1)).removeClass("bad");
                $("#" + (i + 1)).removeClass("good");
                next = true;
            }
        } while (!next);
    }
}

function compare(fir, sec) {
    if(pos[fir - 1] == pos[sec - 1]) {
        if(!find[fir - 1] && !find[sec - 1]) {
        setTimeout(function(){
            $("#" + fir).removeClass("select");
            $("#" + sec).removeClass("select");
            $("#" + fir).addClass("good");
            $("#" + fir).disable('click');
            $("#" + sec).disable('click');
            $("#" + sec).addClass("good");
            find[fir - 1] = true;
            find[sec - 1] = true;
            rep--;
            $("#par").text(rep);
            if (rep == 0){
                //alert("Megtalálta az összes párt!\nSzép munka!");
                var r = confirm("Megtalálta az összes párt!\nSzép munka!\n\nÚj játék kezdéséhez kattintson az \"OK\" gombra!");
            if (r == true) {
                init();
            }
            }
            },500);
        } else {
            $("#" + fir).removeClass("select");
            $("#" + sec).removeClass("select");
        }
    } else {
        setTimeout(function(){
            $("#" + fir).removeClass("select");
            $("#" + sec).removeClass("select");
            $("#" + fir).addClass("bad");
            $("#" + sec).addClass("bad");
            $("#par").text(rep);
        },500);
        setTimeout(function(){
        $("#" + fir).removeClass("bad");
        $("#" + sec).removeClass("bad");
        $("#" + fir).attr("src","Pictures/q.png");
        $("#" + sec).attr("src","Pictures/q.png");
        },100);
    }
    s1 = 0;
    s2 = 0;
}

$(function(){
    $("#uj").click(function(){
        var r = confirm("Új játék kezdéséhez kattintson az \"OK\" gombra!");
        if (r == true) {
            init();
        }
    });
    $("img").click(function(){
        $(this).addClass("select");
        if(s1 == 0) {
            s1 = $(this).attr('id');
            $("#" + $(this).attr('id')).attr("src","Pictures/" + pos[$(this).attr('id') - 1] + ".png");
        } else {
            if($(this).attr('id') == s1) {
                s1 = 0;
                $(this).removeClass("select");
                $("#" + $(this).attr('id')).attr("src","Pictures/q.png");
            } else {
                s2 = $(this).attr('id');
                $("#" + $(this).attr('id')).attr("src","Pictures/" + pos[$(this).attr('id') - 1] + ".png");
                compare(s1,s2);
            }
        }
    });
});
