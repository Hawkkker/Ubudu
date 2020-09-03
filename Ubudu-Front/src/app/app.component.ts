import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Ubudu';
  connected = false;

  constructor(private connection: ConnectionService) {}

  ngOnInit(): void {
    if (this.connection.user != null) {
      this.connected = true;
    }
  }
}
