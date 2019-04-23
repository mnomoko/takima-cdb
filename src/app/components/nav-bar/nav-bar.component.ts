import {Component} from '@angular/core';
import {Utils} from '../../utils/utils';
import Path = Utils.Path;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  path: Path = new Utils.Path();
}
