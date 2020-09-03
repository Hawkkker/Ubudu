import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ConnectionService } from '../services/connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  username = 'Not Connected';
  participationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private connection: ConnectionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.participationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    if (this.connection.user == undefined) {
      this.router.navigate(['login'])
    }
    if (this.connection.user != null) {
      this.username = this.connection.user.username;
    }
  }

}
