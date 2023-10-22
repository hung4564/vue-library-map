export class ConfigHelper {
  get default_value(): any {
    return {};
  }
  validate(form: any) {
    if (!form.name) {
      return false;
    }
    return true;
  }
}
