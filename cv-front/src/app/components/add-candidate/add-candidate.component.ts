import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CandidateService } from 'src/app/services/candidate.service';
@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss']
})
export class AddCandidateComponent implements OnInit {

  candidateForm:FormGroup;
  disabled: boolean = false;
  multiple: boolean = false;
  accept: string;
  color:string = 'primary'
  cvfile:File = null;
  public errors = []
  constructor(private candidateService:CandidateService) { }

  ngOnInit(): void {
    this.accept = ".pdf,.doc,.docx"
    this.candidateForm = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      cv_file: new FormControl('')
    })
  }

  handleFileInput(files: FileList) {
    this.cvfile = files.item(0);
  }
  onSubmit(){
    if(this.candidateForm.invalid){
      return
    }
    let data = new FormData()
    data.append('first_name',this.candidateForm.get('first_name').value)
    data.append('last_name',this.candidateForm.get('last_name').value)
    data.append('phone',this.candidateForm.get('phone').value)
    data.append('email',this.candidateForm.get('email').value)
    if(this.cvfile)
    data.append('cv_file',this.cvfile)
    this.errors = []
    console.log()
    this.candidateService.addCandidate(data).subscribe(
      res=>{
        console.log(res)
        this.candidateForm.reset()
      },error=>{
        console.log()
        for (const [key, value] of Object.entries(error['error']['errors'])) {
          this.errors.push(value)
        }

      }
    )
  }

  onReset(){
    this.candidateForm.reset()
  }
}
