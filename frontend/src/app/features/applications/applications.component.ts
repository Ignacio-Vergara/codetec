// ============================================
// VP SOLUTIONS - Component: Applications
// ============================================

import { 
  Component, 
  OnInit, 
  OnDestroy, 
  ChangeDetectionStrategy, 
  ChangeDetectorRef,
  HostListener
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApplicationsService } from '../../core/services/applications.service';
import { Application } from '../../models/application';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  applications: Application[] = [];
  filteredApplications: Application[] = [];
  categories: string[] = [];
  
  selectedCategory: string = 'Todas';
  selectedStatus: string = 'all';
  searchTerm: string = '';
  isLoading: boolean = true;

  showDemoModal: boolean = false;
  selectedApplication: Application | null = null;
  demoUrl: SafeResourceUrl | null = null;
  isLoadingDemo: boolean = false;
  private demoUrlCache: string | null = null;
  private isIframeLoaded: boolean = false;

  statusFilters = [
    { label: 'Todos', value: 'all' },
    { label: 'Demo', value: 'demo' },
    { label: 'Producción', value: 'production' },
    { label: 'Desarrollo', value: 'development' }
  ];

  constructor(
    private applicationsService: ApplicationsService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  ngOnDestroy(): void {
    this.closeDemoModal();
  }

  loadApplications(): void {
    this.isLoading = true;
    this.cdr.detectChanges();
    
    this.applicationsService.getApplications().subscribe(
      applications => {
        this.applications = applications;
        this.filteredApplications = applications;
        this.loadCategories();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error loading applications:', error);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    );
  }

  loadCategories(): void {
    this.applicationsService.getCategories().subscribe(
      categories => {
        this.categories = ['Todas', ...categories];
        this.cdr.detectChanges();
      }
    );
  }

  filterApplications(): void {
    let filtered = [...this.applications];

    if (this.selectedCategory !== 'Todas') {
      filtered = filtered.filter(app => app.category === this.selectedCategory);
    }

    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(app => app.status === this.selectedStatus);
    }

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(app =>
        app.name.toLowerCase().includes(term) ||
        app.description.toLowerCase().includes(term) ||
        app.category.toLowerCase().includes(term) ||
        app.technologies.some(tech => tech.toLowerCase().includes(term))
      );
    }

    this.filteredApplications = filtered;
    this.cdr.detectChanges();
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.filterApplications();
  }

  onStatusChange(status: string): void {
    this.selectedStatus = status;
    this.filterApplications();
  }

  onSearch(): void {
    this.filterApplications();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filterApplications();
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'demo': 'Demo',
      'production': 'Producción',
      'development': 'Desarrollo',
      'all': 'Todos'
    };
    return labels[status] || status;
  }

  onViewApplication(application: Application): void {
    this.openDemoModal(application);
  }

  private openDemoModal(application: Application): void {
    if (this.showDemoModal && this.selectedApplication?.id === application.id) {
      return;
    }

    if (this.showDemoModal) {
      this.closeDemoModal();
    }

    setTimeout(() => {
      this.selectedApplication = application;
      this.isLoadingDemo = true;
      this.showDemoModal = true;
      this.isIframeLoaded = false;
      this.demoUrlCache = application.demoPath;
      this.cdr.detectChanges();
    }, 100);
  }

  closeDemoModal(): void {
    this.showDemoModal = false;
    this.selectedApplication = null;
    this.demoUrl = null;
    this.demoUrlCache = null;
    this.isLoadingDemo = false;
    this.isIframeLoaded = false;
    this.cdr.detectChanges();
  }

  getSafeUrl(path: string): SafeResourceUrl {
    if (this.demoUrlCache === path && this.demoUrl) {
      return this.demoUrl;
    }
    
    this.demoUrlCache = path;
    this.demoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(path);
    this.cdr.detectChanges();
    return this.demoUrl;
  }

  onIframeLoad(): void {
    this.isIframeLoaded = true;
    this.isLoadingDemo = false;
    this.cdr.detectChanges();
  }

  @HostListener('window:message', ['$event'])
  handleIframeMessage(event: any): void {
    if (event.data === 'close-demo') {
      this.closeDemoModal();
    }
  }
}