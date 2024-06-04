export class AppUrlConfigurator {
  private static appUrlConfiguratorInstance: AppUrlConfigurator;
  base_href: string;
  tenantCode: string;
  authUrl: string;

  static get instance() {
    if (this.appUrlConfiguratorInstance) {
      return this.appUrlConfiguratorInstance;
    } else {
      this.appUrlConfiguratorInstance = new AppUrlConfigurator();
      return this.appUrlConfiguratorInstance;
    }
  }

  constructor() {
    this.base_href = '/';
    this.tenantCode = '';
    this.authUrl = '';
  }

  public setBaseHrefAndTenantCode(): void {
    const pathName = window.location.pathname;
    const pathSplit = pathName.split('/');
    const anchorPrefix: string = pathSplit[2];
    if (anchorPrefix === import.meta.env.VITE_APP_ANCHOR_PREFIX) {
      const localTenantCode: string = pathSplit[1];
      this.base_href = `/${localTenantCode}/${import.meta.env.VITE_APP_ANCHOR_PREFIX}/`;
      this.tenantCode = localTenantCode;
      this.authUrl = `${import.meta.env.VITE_BASE_URL}/${this.tenantCode}/auth/${
        import.meta.env.VITE_APP_ANCHOR_PREFIX
      }`;
    }
    console.log('Call set base url- ', this.base_href, this.tenantCode, this.authUrl);
  }

  public getBaseHref(): string {
    return this.base_href;
  }

  public getTenantCode(): string {
    return this.tenantCode;
  }

  public getAuthUrl(): string {
    return this.authUrl;
  }
}

export default AppUrlConfigurator.instance;
