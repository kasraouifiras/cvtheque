import { Component, OnInit, ViewChild } from '@angular/core';
import { CandidateService } from 'src/app/services/candidate.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss']
})
export class CandidatesListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  candidates = new MatTableDataSource()
  displayedColumns: string[]
  constructor(private candidateService:CandidateService) { }

  ngOnInit(): void {
    this.displayedColumns = ['id', 'first_name', 'last_name', 'phone','email','action'];
    this.candidateService.getCandidates().subscribe(
      res => {
        this.candidates.data = res['data']
        this.candidates.paginator  = this.paginator
        console.log(this.candidates)
      },error=>{
        console.log(error)
      }
    )
  }

  openDialog(name,element){

  }

}
