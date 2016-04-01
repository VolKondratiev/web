<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


$outp = '[ {"name":"Слон","icon":"animals.svg", "desc":"Звичайний слон з південно-західної Африки", "price":87300},'.
          '{"name":"Ведмідь","icon":"animals-1.svg", "desc":"Сибірський ведмідь невизначеного коляру", "price":54000},'.
          '{"name":"Жираф","icon":"animals-2.svg", "desc":"Жираф з києвського зоопарку, у хорошому стані", "price":48000},'.
          '{"name":"Змія","icon":"animals-3.svg", "desc":"Змія карпатська, вуж або гадюка, ми не знаємо", "price":14000} ]';


echo($outp);
?>