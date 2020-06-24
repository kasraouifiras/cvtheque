import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-show-candidate',
  templateUrl: './show-candidate.component.html',
  styleUrls: ['./show-candidate.component.scss']
})
export class ShowCandidateComponent implements OnInit {
  id: number;
  private sub: any;
  candidate
  constructor(public activatedRoute: ActivatedRoute,public router:Router,private candidateService:CandidateService) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(this.id)
      this.candidateService.getCandidate(this.id).subscribe(
        res => {
          this.candidate = res['data']
          console.log(this.candidate)
        },error => {
          console.log(error)
          this.router.navigate(['/candidates_list'])
        }
      )
      // In a real app: dispatch action to load the details here.
   });
  }


}
