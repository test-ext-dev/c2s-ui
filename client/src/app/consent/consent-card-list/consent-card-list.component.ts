import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";

import {ConsentList} from "../shared/consent-list.model";
import {DetailedConsent} from "../shared/detailed-consent.model";
import {DataService} from "../../shared/data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'c2s-consent-card-list',
  templateUrl: './consent-card-list.component.html',
  styleUrls: ['consent-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsentCardListComponent implements OnInit {
  consentList: ConsentList;
  totalItems: number = 0;
  totalPages: number = 0;
  itemsPerPage: number = 0;
  currentPage: number = 1;
  loading: boolean = false;

  title: string = "Consents";

  consents: Observable<DetailedConsent[]>;

  constructor(private dataService: DataService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.consentList = this.route.snapshot.data['consentList'];
    this.getPage(this.currentPage);
  }

  getPage(page: number) {
    this.loading = true;
    this.consents = this.dataService.getConsents(page - 1)
      .do((consentList: ConsentList) => {
        this.totalItems = consentList.totalElements;
        this.totalPages = consentList.totalPages;
        this.itemsPerPage = consentList.size;
        this.currentPage = consentList.number + 1;
      })
      .map(consentList => consentList.content)
      .do(() => this.loading = false);
  }

  onDeleteConsent(consentId: number) {
    this.consents = this.consents.filter(consent => consent['id'] !== consentId)
  }
}
