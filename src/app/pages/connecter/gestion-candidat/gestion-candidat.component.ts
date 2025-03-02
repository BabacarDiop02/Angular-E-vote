import {ChangeDetectionStrategy, Component, computed, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {DatePipe, NgIf} from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {Router, RouterLink} from '@angular/router';
import {Candidate} from '../../../models/candidate.model';
import {CandidateService} from '../../../services/candidate/candidate.service';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatDivider} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TemplateService} from '../../../services/template/template.service';

@Component({
  selector: 'app-gestion-candidat',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSort,
    MatSortHeader,
    MatInput,
    MatFormField,
    MatLabel,
    MatIconModule,
    MatTooltipModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './gestion-candidat.component.html',
  standalone: true,
  styleUrl: './gestion-candidat.component.css'
})
export class GestionCandidatComponent implements OnInit {
  public candidates: Candidate[] = [];
  public dataSource = new MatTableDataSource<Candidate>();
  deleteSuccess = computed(() => this.templateService.deleteSuccess());
  public displayedColumns = [
    "id",
    "firstName",
    "lastName",
    "age",
    "occupation",
    "voice",
    "delete",
  ];

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  readonly dialog = inject(MatDialog);

  constructor(private candidateService: CandidateService,
              private router: Router,
              private templateService: TemplateService) {
  }

  ngOnInit(): void {
    this.allCandidate();
  }

  allCandidate() {
    this.candidateService.getAllCandidate().subscribe({
      next: (data) => {
        this.candidates = Array.from(data);
        this.dataSource.data = this.candidates;

        setInterval(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des candidats', error);
      }
    });
  }

  selectRow(row: Candidate) {
    this.candidateService.selectRow({...row});
    this.router.navigateByUrl('/connecter/add-candidate')
  }

  filterCandidate(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  deleteDialogCandidate(enterAnimationDuration: string, exitAnimationDuration: string, id: number): void {
    this.dialog.open(DialogAnimationsDeleteCandidate, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    this.candidateService.getCandidateById(id);
  }
}

@Component({
  selector: 'dialog-animations-delete-candidate',
  templateUrl: 'dialog-animations-delete-candidate.html',
  imports: [MatButtonModule, MatDialogModule, MatDivider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class DialogAnimationsDeleteCandidate {
  constructor(public candidateService: CandidateService) {
  }
}
