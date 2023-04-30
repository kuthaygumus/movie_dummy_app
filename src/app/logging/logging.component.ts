import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../services/logging-service/logging.service';

@Component({
  selector: 'logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.scss']
})
export class LoggingComponent implements OnInit{

  constructor(public loggingService: LoggingService) { }


  ngOnInit(): void {
  }

}
