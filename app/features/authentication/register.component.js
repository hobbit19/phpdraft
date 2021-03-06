class RegisterController {
  constructor($q, ENV, messageService, workingModalService,
    authenticationService, vcRecaptchaService, errorService) {
    this.$q = $q;
    this.ENV = ENV;
    this.messageService = messageService;
    this.workingModalService = workingModalService;
    this.authenticationService = authenticationService;
    this.vcRecaptchaService = vcRecaptchaService;
    this.errorService = errorService;
  }

  $onInit() {
    this.showPassword = false;
    this.registerInProgress = false;
    this.showRegistrationForm = true;

    if (this.authenticationService.isAuthenticated()) {
      this.authenticationService.sendAuthenticatedUserToPreviousPath();
      return;
    }

    this.recaptchaPublicKey = this.ENV.recaptchaPublicKey;

    this.setRecaptchaResponse = response => {
      this.form._recaptcha = response;
    };
  }

  passwordInputType() {
    return this.showPassword
      ? 'text'
      : 'password';
  }

  submitClicked() {
    if (this.form.$valid) {
      this.register();
    }
  }

  registerFormIsInvalid() {
    return this.registerInProgress || !this.form.$valid || ((this.form._recaptcha === null ? null : this.form._recaptcha.length) === 0);
  }

  register() {
    this.workingModalService.openModal();

    const registerModel = {
      _email: this.form.email.$viewValue,
      _name: this.form.name.$viewValue,
      _password: this.form.password.$viewValue,
      _confirmPassword: this.form.confirmedPassword.$viewValue,
      _recaptcha: this.form._recaptcha,
    };

    this.registerInProgress = true;

    const registerResult = this.authenticationService.register(registerModel);

    this.messageService.closeToasts();

    const registerSuccessHandler = () => {
      this.registerInProgress = false;
      this.workingModalService.closeModal();

      this.newUserName = this.form.name.$viewValue;
      this.newUserEmail = this.form.email.$viewValue;

      this.form.$setPristine();
      this.showRegistrationForm = false;

      this.messageService.showInfo('Verification email sent');
    };

    const registerFailureHandler = response => {
      this.registerInProgress = false;
      this.workingModalService.closeModal();

      const registerError = this.errorService.parseValidationErrorsFromResponse(response);

      this.messageService.showError(`${registerError}`, 'Unable to register');
    };

    registerResult.promise.then(registerSuccessHandler, registerFailureHandler);
  }
}

RegisterController.$inject = [
  '$q',
  'ENV',
  'messageService',
  'workingModalService',
  'authenticationService',
  'vcRecaptchaService',
  'errorService',
];

angular.module('phpdraft.authentication').component('phpdRegister', {
  controller: RegisterController,
  templateUrl: 'app/features/authentication/register.component.html',
});
