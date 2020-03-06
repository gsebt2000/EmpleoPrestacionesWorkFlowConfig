
import { Component, AfterViewInit } from '@angular/core';
import * as jQuery from 'jquery';


declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})





export class NavbarComponent {

constructor(){

  $(function() {
    console.log('inicio');
    
      $("#menu-toggle").click(function(e) {
          e.preventDefault();
            $("#wrapper").toggleClass("toggled");
            console.log('click toggle');
            
          });
  
        });
}
}

