import {ChangeDetectionStrategy, Component, computed, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {Elector} from '../../../models/elector.model';
import {ElectorService} from '../../../services/elector/elector.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {DatePipe, NgIf} from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {Router, RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-gestion-electeur',
  imports: [
    MatTableModule,
    DatePipe,
    MatPaginatorModule,
    MatSort,
    MatSortHeader,
    MatInput,
    MatFormField,
    MatLabel,
    MatIconModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './gestion-electeur.component.html',
  standalone: true,
  styleUrl: './gestion-electeur.component.css'
})
export class GestionElecteurComponent implements OnInit {
  public electors: Elector[] = [];
  public dataSource = new MatTableDataSource<Elector>();
  public displayedColumns = [
    "id",
    "nationalIdentificationNumber",
    "firstName",
    "lastName",
    "dateOfBirth",
    "placeOfBirth",
    "voterNumber",
    "region",
    "department",
    "borough",
    "town",
    "votingPlace",
    "pollingStation",
    "delete",
  ];
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('file') file!: ElementRef;

  selectedFile: File | null = null;
  message: string = '';
  messageClass: string = '';
  isUploading: boolean = false;
  readonly dialog = inject(MatDialog);


  constructor(private electorService: ElectorService,
              private router: Router) {}

  ngOnInit(): void {
    this.allElectors();
  }

  allElectors() {
    this.electorService.getAllElectors().subscribe({
      next: (data) => {
        this.electors = Array.from(data);
        this.dataSource.data = this.electors;

        setInterval(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des électeurs', error);
      }
    })
  }

  filterElector(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  // Méthode pour récupérer le fichier sélectionné
  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
    this.message = '';
  }

  importerFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.isUploading = true; // Activer la barre de chargement

      this.electorService.importElectors(formData).subscribe({
        next: (data) => {
          this.isUploading = false;

          console.log('Fichier importé avec succès !', data);
          this.message = 'Fichier importé avec succès ! ✅';
          this.messageClass = 'alert alert-success';
          this.file.nativeElement.value = '';
          this.allElectors();

          // Effacer le message après 5 secondes
          setTimeout(() => {
            this.message = '';
          }, 5000);
        },
        error: (err) => {
          this.isUploading = false;

          console.error('Erreur lors de l\'importation du fichier', err);
          this.message = 'Erreur lors de l\'importation du fichier ❌';
          this.messageClass = 'alert alert-danger';

          setTimeout(() => {
            this.message = '';
          }, 5000);
        }
      });
    } else {
      this.message = '⚠️ Veuillez sélectionner un fichier.';
      this.messageClass = 'alert alert-warning';

      setTimeout(() => {
        this.message = '';
      }, 5000);
    }
  }

  selectRow(row: Elector) {
    this.electorService.selectRow({...row});
    this.router.navigateByUrl('/connecter/add-electeur')
  }

  deleteDialogElector(enterAnimationDuration: string, exitAnimationDuration: string, id: number): void {
    this.dialog.open(DialogAnimationsDeleteElector, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    this.electorService.getElector(id);
  }
}

@Component({
  selector: 'dialog-animations-delete-elector',
  templateUrl: 'dialog-animations-delete-elector.html',
  imports: [MatButtonModule, MatDialogModule, MatDivider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class DialogAnimationsDeleteElector {
  constructor(public electorService: ElectorService) {
  }
}
