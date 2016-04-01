"use strict";

// hide local variables scope
(function()
{
	// jQuery-style notation
	var $ = function (a) { return document.getElementById(a);}
	
    var myitems = [];
 
	var calculatePrice = function()
    {
         var price = 0;
         var atLeastOneIsSelected = false;
         for(var i in myitems)
         {
             var checkid = "itemcheck_"+i;
             if ($(checkid).checked) { price += myitems[i].price; atLeastOneIsSelected = true; }
         }
         return [price, atLeastOneIsSelected];
    }
 
    var selection_change_f = function()
    {
        var price = calculatePrice();// [price, is_selected]
        $("totalprice").innerHTML = "Total price =" + price[0].toFixed(2) + " грн.";
        $("buybutton").disabled = !price[1];
    }
	
	
 
    var updateContentF = function()
    {
         var itemcontainer = $("itemcontainer");
    itemcontainer.appendChild(document.createElement('hr'));

    for(var i in myitems)
    {
        var item = myitems[i];
        item.price = Number.parseFloat(item.price); // make sure it is a number

        var nameid = "itemname_"+i;
        var textid = "itemtext_"+i;
        var checkid = "itemcheck_"+i;
 
        var div = document.createElement('div');
        div.className = "container";
        div.innerHTML = '<div class="container">' +
                        '<img src="' + item.icon + '"></img>' +
                        '<h5 id="'+nameid+'"></h5>' +
                        '<p id="'+textid+'"></p>' +
                        '<h5><input id="' + checkid + '" type="checkbox"></input>&nbsp;'+item.price+' грн.</h5></div>';
 
        itemcontainer.appendChild(div);
        
        $(nameid).appendChild(document.createTextNode(item.name));
        $(textid).appendChild(document.createTextNode(item.desc));
        $("itemcheck_"+i).onchange = selection_change_f;
        }

        selectionChangeF();
    }
 
    // send loanding request
    var xmlhttp = new XMLHttpRequest();
    var url = "index3.php";
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4)
        {
            if (xmlhttp.status == 200)
            {
                myitems = JSON.parse(xmlhttp.responseText);
                updateContentF();
            }
            else
            {
                alert("Error loading shop content. Default content is used!!!");
                myitems = [ {name:"Слон",icon:"animals.svg", desc:"Звичайний слон з південно-західної Африки", price:87300},
					{name:"Ведмідь",icon:"animals-1.svg", desc:"Сибірський ведмідь невизначеного коляру", price:54000},
					{name:"Жираф",icon:"animals-2.svg", desc:"Жираф з києвського зоопарку, у хорошому стані ", price:48000},
					 {name:"Змія",icon:"animals-3.svg", desc:"Змія карпатська, вуж або гадюка, ми не знаємо", price:14000}];
                updateContentF();
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send(); 
})();