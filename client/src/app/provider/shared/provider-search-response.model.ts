import {Page} from "../../shared/page.model";
import {ProviderProjection} from "./provider-projection.model";
import {Links} from "../../shared/links.model";

export class ProviderSearchResponse {
  _embedded: EmbeddedResources;
  _links: Links;
  page: Page;
}

interface EmbeddedResources {
  providers: ProviderProjection[];
}